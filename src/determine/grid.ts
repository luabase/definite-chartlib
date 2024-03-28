import { Chart } from "../chart";
import { ChartType, echarts } from "../types";
import * as utils from "../utils";

export function grid<T extends ChartType>(
  chart: Chart<T>,
  datasets: echarts.DataSet[]
): echarts.Grid {
  const chartType = chart.getChartType();
  const showTitle = chart.getStyleShowTitle();
  const showLegend = chart.getStyleShowLegend();
  const isLarge = utils.datasets.containsLargeData(datasets);
  const orientation = chart.getStyleOrientation();
  let grid: echarts.Grid = {
    show: false,
    containLabel: false,
    left: "12%",
    bottom: isLarge ? "20%" : "12%",
    right: "9%",
    top: "2%",
  };
  if (showTitle && showLegend) {
    grid.top = "14%";
  } else if (utils.boolean.xor(showTitle, showLegend)) {
    grid.top = "10%";
  }
  if (["bar", "line"].includes(chartType)) {
    grid.right = chart.canAddAxis() ? "9%" : "12%";
    if (orientation === "vertical") {
      grid.bottom = isLarge ? "18%" : "12%";
    } else if (orientation === "horizontal") {
      grid.left = isLarge ? "18%" : "15%";
    }
  } else if (chartType === "heatmap") {
    grid.right = chart.getStyleColorGrouping() === "piecewise" ? "15%" : "11%";
  }
  return grid;
}
