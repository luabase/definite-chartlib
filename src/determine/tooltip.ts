import { Chart } from "../chart";
import { ChartType, echarts } from "../types";
import {
  tooltipFormatter,
  calendarTooltipFormatter,
  longFormValueFormatter,
  determineFormatter,
  percentFormatter,
} from "../formatters";
import {
  DS_SURFACE_PLATFORM_COLORS,
  DS_BORDER_COLORS,
  DS_TEXT_COLORS,
} from "../constants/color";
import { DataFrame } from "../dataframe";
import * as formatters from "../formatters";

const legendFormatter = (params: any[], chart: Chart<any>) => {
  const isPercentage = chart.getStyleValueStyle() === "percentage";
  const formatter = isPercentage
    ? percentFormatter
    : determineFormatter(chart, "left");

  var result =
    '<div style="font-weight: bold">' +
    tooltipFormatter(params[0].axisValueLabel) +
    "</div>"; // Category label

  params.forEach(function (item: any) {
    const value = item.value[1];

    result +=
      "<div>" +
      '<span style="color: ' +
      item.color +
      '">' +
      item.marker +
      "</span>" +
      " " +
      tooltipFormatter(item.seriesName) +
      ": " +
      '<span style="font-weight: bold">' +
      formatter(value) +
      "</span></div>"; // Bold the value, text in default color
  });

  return result;
};

export function tooltip<T extends ChartType>(
  chart: Chart<T>,
  theme: string,
  df: DataFrame
): echarts.ToolTip {
  const isBarOrLine = ["bar", "line"].includes(chart.getChartType());
  const isSankey = chart.getChartType() === "sankey";
  const isPie = chart.getChartType() === "pie";
  const formatter = determineFormatter(chart, "left");

  const item: echarts.ToolTip = {
    confine: true,
    backgroundColor:
      theme === "light"
        ? DS_SURFACE_PLATFORM_COLORS.light.panel
        : DS_SURFACE_PLATFORM_COLORS.dark.panel,
    borderColor:
      theme === "light"
        ? DS_BORDER_COLORS.light.primary
        : DS_BORDER_COLORS.dark.primary,
    textStyle: {
      color:
        theme === "light"
          ? DS_TEXT_COLORS.light.secondary
          : DS_TEXT_COLORS.dark.secondary,
    },
    show: true,
    trigger: !isBarOrLine && !isSankey ? "item" : "axis",
    axisPointer: {
      type: "line",
      label: {
        backgroundColor:
          theme === "light"
            ? DS_SURFACE_PLATFORM_COLORS.light.nested
            : DS_SURFACE_PLATFORM_COLORS.dark.nested,
      },
    },
  };

  if (isPie) {
    // For pie charts, show value and percentage

    item.formatter = function (params) {
      return (
        params.name +
        ": " +
        (typeof params.value === "number"
          ? formatter(params.value)
          : formatter(params.value[1])) +
        " (" +
        percentFormatter(params.percent / 100) +
        ")"
      );
    };
  } else if (isSankey) {
    // For Sankey charts, we want to show the value of the link
    item.trigger = "item";
  } else if (isBarOrLine) {
    // Existing bar/line logic
    item.axisPointer = {
      type: "cross",
      label: {
        backgroundColor:
          theme === "light"
            ? DS_SURFACE_PLATFORM_COLORS.light.nested
            : DS_SURFACE_PLATFORM_COLORS.dark.nested,
      },
      crossStyle: { color: "#999999" },
    };
    item.formatter = (params) => legendFormatter(params, chart);
  } else if (chart.getChartType() === "calendar") {
    item.formatter = calendarTooltipFormatter;
  } else if (chart.getChartType() === "heatmap") {
    item.formatter = function (params) {
      // Get dimensions from the chart
      const dimensions = chart.getDimensions();
      const metrics = chart.getMetrics();

      const isCohortData = chart.getStyleCohortData();
      // Get the metric index
      const metricIndex = metrics[0].index;

      // Extract axis names from the DataFrame columns based on dimension indices
      const xAxisName = df.columns.get(dimensions[0].index) || "X-Axis";
      const yAxisName = df.columns.get(dimensions[1].index) || "Y-Axis";

      // Get the metric name
      const metricName = df.columns.get(metrics[0].index) || "Value";

      // Get axis values from params.data using dimension indices
      const xAxisValue = params.data[dimensions[0].index];
      const yAxisValue = params.data[dimensions[1].index];

      // Get the value from the metric
      const value = df.data[params.dataIndex][metricIndex];

      // Find the maximum value of the metric in the DataFrame
      const metricValues = df.col(metricIndex);
      const maxValue = Math.max(
        ...metricValues.filter((v) => typeof v === "number")
      );

      // Calculate percentage of max value
      const percentOfMax = maxValue > 0 ? (value / maxValue) * 100 : 0;

      // Format the value based on chart formatting settings
      const formattedValue = formatter(value);

      // Calculate percentage if available from params
      const percentageDisplay = isCohortData
        ? ` (${params.data[metricIndex].toFixed(2)}%)`
        : ` (${percentFormatter(percentOfMax / 100)})`;

      // Create a tooltip with proper axis labels and metric name
      return (
        `<div style="font-weight: bold">Cell Data</div>` +
        `<div>${yAxisName}: <span style="font-weight: bold">${tooltipFormatter(
          yAxisValue
        )}</span></div>` +
        `<div>${xAxisName}: <span style="font-weight: bold">${tooltipFormatter(
          xAxisValue
        )}</span></div>` +
        `<div>${metricName}: <span style="font-weight: bold">${formattedValue}</span>${percentageDisplay}</div>`
      );
    };
  }

  return item;
}
