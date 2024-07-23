import { Chart } from "../chart";
import { ChartType, echarts } from "../types";
import {
  tooltipFormatter,
  calendarTooltipFormatter,
  longFormValueFormatter,
  determineFormatter,
} from "../formatters";
import {
  DS_SURFACE_PLATFORM_COLORS,
  DS_BORDER_COLORS,
  DS_TEXT_COLORS,
} from "../constants/color";

const legendFormatter = (params, chart) => {
  const formatter = determineFormatter(chart, "left");
  var result =
    '<div style="font-weight: bold">' +
    tooltipFormatter(params[0].axisValueLabel) +
    "</div>"; // Category label
  params.forEach(function (item) {
    result +=
      "<div>" + // No color style here
      '<span style="color: ' +
      item.color +
      '">' +
      item.marker +
      "</span>" + // Color only applied to the marker
      " " +
      tooltipFormatter(item.seriesName) +
      ": " +
      '<span style="font-weight: bold">' +
      formatter(item.value[1]) +
      "</span></div>"; // Bold the value, text in default color
  });
  return result;
};

export function tooltip<T extends ChartType>(
  chart: Chart<T>,
  theme: string
): echarts.ToolTip {
  const isBarOrLine = ["bar", "line"].includes(chart.getChartType());
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
    trigger: !isBarOrLine ? "item" : "axis",
    axisPointer: {
      label: {
        backgroundColor:
          theme === "light"
            ? DS_SURFACE_PLATFORM_COLORS.light.nested
            : DS_SURFACE_PLATFORM_COLORS.dark.nested,
      },
    },
  };
  if (isBarOrLine) {
    item.axisPointer = {
      type: "cross",
      label: {
        backgroundColor:
          theme === "light"
            ? DS_SURFACE_PLATFORM_COLORS.light.nested
            : DS_SURFACE_PLATFORM_COLORS.dark.nested,
      },
      crossStyle: { color: "#999999" }, // This can be adjusted if needed
    };
    item.formatter = (params) => legendFormatter(params, chart);
  } else if (chart.getChartType() === "calendar") {
    item.formatter = calendarTooltipFormatter;
  }
  return item;
}
