import { ChartConfig } from "../types";

export const swap = (conf: ChartConfig): ChartConfig => {
  const tmpAxis = conf.xAxis;
  conf.xAxis = conf.yAxis;
  conf.yAxis = tmpAxis;
  return conf;
};
