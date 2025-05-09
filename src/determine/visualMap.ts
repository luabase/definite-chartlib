import { DataFrame } from "../dataframe";
import { Chart } from "../chart";
import { ChartType, echarts, HeatmapGradientType } from "../types";
import * as utils from "../utils";
import { findMinMax } from "./helpers";
import { color, HEATMAP_GRADIENTS } from "../constants";

export function visualMap<T extends ChartType>(
  chart: Chart<T>,
  datasets: echarts.DataSet[],
  theme: string
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
      type: "continuous",
      orient: "vertical",
    } as echarts.VisualMap;
  }

  const dataset = datasets[1];
  if (!dataset) throw new Error("dataset not found");
  const df = DataFrame.fromDataSet(dataset);
  const metric = chart.getMetrics()[0];
  const ix = chart.getChartType() === "heatmap" ? metric.index : 1;
  const arr = df.col(ix).map((v) => Number(v));
  const isHeatmap = chart.getChartType() === "heatmap";

  // Get the gradient type from chart style options or use default
  const gradientType = chart.getStyleColorGradient() || "default";

  // Use the selected gradient
  let gradientColors = HEATMAP_GRADIENTS[gradientType];

  if (chart.getStyleInverseGradient()) {
    gradientColors = [...HEATMAP_GRADIENTS[gradientType]].reverse();
  }

  // Set min and max values based on whether cohort data is enabled
  let min, max;
  if (isHeatmap && chart.getStyleCohortData()) {
    // For cohort data, use fixed range of 0-100 (percentage)
    min = 0;
    max = 100;
  } else {
    // For regular data, use the actual min and max values
    min = Math.min(...arr);
    max = Math.max(...arr);
  }

  return {
    inRange: {
      color: gradientColors,
    },
    left: isHeatmap ? "right" : "center",
    top: isHeatmap ? "center" : 3,
    type: chart.getStyleColorGrouping() ?? "continuous",
    orient: isHeatmap ? "vertical" : "horizontal",
    min: min,
    max: max,
    calculable: true,
    dimension: ix,
  } as echarts.VisualMap;
}
