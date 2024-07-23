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
    containLabel: true,
    left: 40,
    bottom: 30,
    right: 40,
    top: 40,
  };

  if (showTitle && showLegend) {
    grid.top = 70;
  } else if (utils.boolean.xor(showTitle, showLegend)) {
    grid.top = 50;
  }

  return grid;
}
