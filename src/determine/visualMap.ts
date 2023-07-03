import { DataFrame } from "../dataframe";
import { Chart } from "../manager";
import { ChartType, echarts } from "../types";
import * as utils from "../utils";

export function visualMap<T extends ChartType>(
  chart: Chart<T>,
  df: DataFrame
): echarts.VisualMap | null {
  if (!["heatmap", "calendar"].includes(chart.getChartType())) return null;
  const metric = chart.getMetrics()[0];
  const arr = df.col(metric.index).map((v) => Number(v));
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
