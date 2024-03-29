import { Chart } from "../chart";
import { ChartType, echarts } from "../types";
import * as utils from "../utils";

export function title<T extends ChartType>(
  chart: Chart<T>,
  s: string
): echarts.Title {
  let left = "center";
  if (chart.getChartType() === "calendar") {
    left = "auto";
  } else if (chart.getChartType() === "kpi") {
    left = "left";
  }
  return {
    show: chart.getStyleShowTitle(),
    text: utils.string.truncate(s, 42),
    top: "2%",
    left
  };
}
