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

const legendFormatter = (params, chart) => {
  const isPercentage = chart.getStyleValueStyle() === "percentage";
  const formatter = isPercentage
    ? percentFormatter
    : determineFormatter(chart, "left");

  var result =
    '<div style="font-weight: bold">' +
    tooltipFormatter(params[0].axisValueLabel) +
    "</div>"; // Category label

  params.forEach(function (item) {
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
  theme: string
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
  }

  return item;
}
