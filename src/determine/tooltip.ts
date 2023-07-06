import { Chart } from "../manager";
import { ChartType, echarts } from "../types";

export function tooltip<T extends ChartType>(chart: Chart<T>): echarts.ToolTip {
  const item: echarts.ToolTip = {
    show: true,
    trigger: !["line", "bar"].includes(chart.getChartType()) ? "item" : "axis",
  };
  if (!["pie", "calendar", "scatter"].includes(chart.getChartType())) {
    item.axisPointer = { type: "cross", crossStyle: { color: "#999999" } };
  }
  return item;
}
