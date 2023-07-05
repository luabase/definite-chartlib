import { Chart } from "../manager";
import { ChartType, echarts } from "../types";
import * as utils from "../utils";

export function grid<T extends ChartType>(
  chart: Chart<T>,
  datasets: echarts.DataSet[]
): echarts.Grid {
  const isLarge = utils.datasets.containsLargeData(datasets);
  let grid: echarts.Grid = {
    show: false,
    containLabel: false,
    left: "12%",
    bottom: "12%",
    right: "9%",
  };
  if (chart.getChartType() === "bar") {
    if (chart.getStyleOrientation() === "vertical") {
      grid.bottom = isLarge ? "18%" : "12%";
    } else {
      grid.bottom = isLarge ? "15%" : "18%";
    }
  } else if (chart.getChartType() === "heatmap") {
    grid.right = chart.getStyleColorGrouping() === "piecewise" ? "15%" : "11%";
  }
  return grid;
}
