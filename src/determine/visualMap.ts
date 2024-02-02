import { DataFrame } from "../dataframe";
import { Chart } from "../chart";
import { ChartType, echarts } from "../types";
import * as utils from "../utils";
import { findMinMax } from "./helpers";
import { color } from "../constants";

export function visualMap<T extends ChartType>(
  chart: Chart<T>,
  datasets: echarts.DataSet[]
): echarts.VisualMap | null {
  if (!["heatmap", "calendar", "map"].includes(chart.getChartType()))
    return null;
  if (chart.getChartType() == "map") {
    const dataset = datasets[1];
    const { min, max } = findMinMax(dataset.source);
    return {
      left: "right",
      min: min,
      max: max,
      inRange: {
        color: color.COLOR_PALETTE,
      },
      text: ["High", "Low"],
      calculable: true,
    };
  }
  const dataset = datasets[1];
  if (!dataset) throw new Error("dataset not found");
  const df = DataFrame.fromDataSet(dataset);
  const metric = chart.getMetrics()[0];
  const ix = chart.getChartType() === "heatmap" ? metric.index : 1;
  const arr = df.col(ix).map((v) => Number(v));
  const isHeatmap = chart.getChartType() === "heatmap";
  return {
    inRange: {
      color: utils.color.asArray(metric.color),
    },
    left: isHeatmap ? "right" : "center",
    top: isHeatmap ? "center" : 3,
    type: chart.getStyleColorGrouping() ?? "continuous",
    orient: isHeatmap ? "vertical" : "horizontal",
    min: Math.min(...arr),
    max: Math.max(...arr),
    calculable: true,
  };
}
