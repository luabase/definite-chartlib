import { color } from "./constants";
import { dataset, determine, frame } from "./utils";
import { ChartConfig, BlockResults, echarts as ec, ChartType } from "./types";

const useSelectedDimensionsOnly = (conf: ChartConfig, dataset: ec.DataSet) => {
  const xIndex = conf.xAxis[0].columns[0].index;
  const yIndex = conf.yAxis[0].columns[0].index;
  dataset.dimensions = [dataset.dimensions[xIndex], dataset.dimensions[yIndex]];
  dataset.source = frame.select(dataset.source, [xIndex, yIndex]);
  conf.xAxis[0].columns[0].index = 0;
  conf.yAxis[0].columns[0].index = 1;
};

export const ecOptionFromDataset = (
  conf: ChartConfig,
  dataset: ec.DataSet
): ec.ECOption => {
  if (conf.type === ChartType.CALENDAR) {
    // NOTE: encoding does not work for calendar coordinate system
    useSelectedDimensionsOnly(conf, dataset);
  }
  dataset.source = frame.formatValues(dataset.source);
  if (conf.transform) {
    dataset.source = frame.runTfPipeline(dataset.source, conf.transform);
  }
  return {
    animation: determine.animation(conf),
    backgroundColor: color.ZINC_900,
    dataset: dataset,
    grid: determine.grid(conf, dataset),
    legend: determine.legend(conf),
    series: determine.series(conf, dataset),
    title: determine.title(conf),
    toolbox: determine.toolbox(conf),
    tooltip: determine.tooltip(conf),
    xAxis: determine.axis(conf, dataset, "x"),
    yAxis: determine.axis(conf, dataset, "y"),
    visualMap: determine.visualMap(conf, dataset),
    calendar: determine.calendar(conf, dataset),
  };
};

export const ecOptionFromBlockResult = (
  conf: ChartConfig,
  res: BlockResults
): ec.ECOption => {
  return ecOptionFromDataset(conf, dataset.fromBlockResult(res));
};
