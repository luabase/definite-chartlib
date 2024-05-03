import { Chart } from "../chart";
import { ChartType, echarts } from "../types";
import {
  tooltipFormatter,
  calendarTooltipFormatter,
  longFormValueFormatter,
} from "../formatters";
import { color } from "../constants";

const legendFormatter = (params) => {
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
      longFormValueFormatter(item.value[1]) +
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
    backgroundColor: theme === "light" ? color.ZINC_100 : color.ZINC_900,
    borderColor: theme === "light" ? color.ZINC_300 : color.ZINC_500,
    textStyle: {
      color: theme === "light" ? color.ZINC_900 : color.ZINC_300,
    },
    show: true,
    trigger: !isBarOrLine ? "item" : "axis",
    axisPointer: {
      label: {
        backgroundColor: color.ZINC_500,
      },
    },
    formatter: legendFormatter,
  };
  if (isBarOrLine) {
    item.axisPointer = {
      type: "cross",
      label: {
        backgroundColor: color.ZINC_500,
      },
      crossStyle: { color: "#999999" },
    };
  } else if (chart.getChartType() === "calendar") {
    item.formatter = calendarTooltipFormatter;
  }
  return item;
}
