import { Chart } from "../chart";
import { ChartType, echarts } from "../types";
import * as utils from "../utils";

export function grid<T extends ChartType>(
  chart: Chart<T>,
  datasets: echarts.DataSet[]
): echarts.Grid {
  const needsLegendLabel = chart.getDoesNeedLegendLabel();
  const showLegend = chart.getStyleShowLegend();

  let grid: echarts.Grid = {
    show: false,
    containLabel: true,
    left: 40,
    bottom: 30,
    right: 40,
    top: 20,
  };

  if (needsLegendLabel && showLegend) {
    grid.top = 80;
  } else if (showLegend) {
    grid.top = 50;
  }

  return grid;
}
