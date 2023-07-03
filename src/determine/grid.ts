import { DataFrame } from "../dataframe";
import { Chart } from "../manager";
import { ChartType, echarts } from "../types";

export function grid<T extends ChartType>(
  chart: Chart<T>,
  df: DataFrame
): echarts.Grid {
  let grid: echarts.Grid = {
    show: false,
    containLabel: false,
    left: "12%",
    bottom: "12%",
    right: "9%",
  };
  if (chart.getChartType() === "bar") {
    if (chart.getStyleOrientation() === "vertical") {
      grid.bottom = df.shape.height > 6 ? "18%" : "12%";
    } else {
      grid.bottom = df.shape.height > 6 ? "15%" : "18%";
    }
  } else if (chart.getChartType() === "heatmap") {
    grid.right = chart.getStyleColorGrouping() === "piecewise" ? "15%" : "11%";
  }
  return grid;
}
