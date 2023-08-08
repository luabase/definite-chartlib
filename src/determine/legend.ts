import { Chart } from "../chart";
import { ChartType, echarts } from "../types";

export function legend<T extends ChartType>(chart: Chart<T>): echarts.Legend {
  return {
    show: chart.getStyleShowLegend(),
    left: "center",
    top: "2%",
  };
}
