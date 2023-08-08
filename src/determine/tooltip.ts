import { Chart } from "../chart";
import { ChartType, echarts } from "../types";
import { calendarTooltipFormatter } from "../formatters";

export function tooltip<T extends ChartType>(chart: Chart<T>): echarts.ToolTip {
  const item: echarts.ToolTip = {
    show: true,
    trigger: !["line", "bar"].includes(chart.getChartType()) ? "item" : "axis",
  };
  if (["bar", "line"].includes(chart.getChartType())) {
    item.axisPointer = { type: "cross", crossStyle: { color: "#999999" } };
  } else if (chart.getChartType() === "calendar") {
    item.formatter = calendarTooltipFormatter;
  }
  return item;
}
