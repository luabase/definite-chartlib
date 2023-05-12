import { color } from "./constants";
import { dataset, determine, frame } from "./utils";
import { ChartConfig, BlockResults, echarts as ec } from "./types";

export const ecOptionFromDataset = (
  conf: ChartConfig,
  dataset: ec.DataSet
): ec.ECOption => {
  dataset.source = frame.formatValues(dataset.source);
  return {
    animation: determine.animation(conf),
    backgroundColor: color.ZINC_900,
    dataset: dataset,
    grid: determine.grid(conf),
    legend: determine.legend(conf),
    series: determine.series(conf, dataset),
    title: determine.title(conf),
    toolbox: determine.toolbox(conf),
    tooltip: determine.tooltip(conf),
    xAxis: determine.axis(conf, dataset, "horizontal"),
    yAxis: determine.axis(conf, dataset, "vertical"),
  };
};

export const ecOptionFromBlockResult = (
  conf: ChartConfig,
  res: BlockResults
): ec.ECOption => {
  return ecOptionFromDataset(conf, dataset.fromBlockResult(res));
};
