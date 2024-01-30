import { DataFrame } from "../dataframe";
import { Chart } from "../chart";
import { ChartType, echarts } from "../types";
import * as utils from "../utils";
import { findMinMax } from "./helpers";

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
        color: [
          "#313695",
          "#4575b4",
          "#74add1",
          "#abd9e9",
          "#e0f3f8",
          "#ffffbf",
          "#fee090",
          "#fdae61",
          "#f46d43",
          "#d73027",
          "#a50026",
        ],
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
