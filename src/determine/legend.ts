import { Chart } from "../chart";
import { ChartType, echarts } from "../types";

export function legend<T extends ChartType>(chart: Chart<T>): echarts.Legend {
  return {
    show: chart.getStyleShowLegend(),
    left: "center",
    top: chart.getStyleShowTitle() ? "6%" : "2%",
    type: "scroll",
  };
}
