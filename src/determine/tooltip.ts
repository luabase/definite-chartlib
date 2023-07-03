import { Chart } from "../manager";
import { ChartType, echarts } from "../types";

export function tooltip<T extends ChartType>(chart: Chart<T>): echarts.ToolTip {
  const item: echarts.ToolTip = {
    show: true,
    trigger: ["pie", "heatmap", "calendar"].includes(chart.getChartType())
      ? "item"
      : "axis",
  };
  if (!["pie", "calendar"].includes(chart.getChartType())) {
    item.axisPointer = { type: "cross", crossStyle: { color: "#999999" } };
  }
  return item;
}
