import { Chart } from "../chart";
import { ChartType, echarts } from "../types";
import { calendarTooltipFormatter } from "../formatters";

export function tooltip<T extends ChartType>(chart: Chart<T>): echarts.ToolTip {
  const isBarOrLine = ["bar", "line"].includes(chart.getChartType());
  const item: echarts.ToolTip = {
    confine: true,
    backgroundColor: "rgb(24 24 27)",
    borderColor: "rgb(212 212 216)",
    textStyle: {
      color: "rgb(212 212 216)",
    },
    show: true,
    trigger: !isBarOrLine ? "item" : "axis",
  };
  if (isBarOrLine) {
    item.axisPointer = { type: "cross", crossStyle: { color: "#999999" } };
  } else if (chart.getChartType() === "calendar") {
    item.formatter = calendarTooltipFormatter;
  }
  return item;
}
