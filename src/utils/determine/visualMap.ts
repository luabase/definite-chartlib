import * as ec from "../../types/echarts";
import { ChartConfig, ChartType } from "../../types";
import * as frame from "../frame";

export const visualMap = (
  conf: ChartConfig,
  dataset: ec.DataSet
): ec.VisualMap | null => {
  if (conf.type !== ChartType.HEATMAP || !conf.zAxis) {
    return null;
  }
  const transposed = frame.transpose(dataset.source);
  const series = <number[]>transposed[conf.zAxis[0].columns[0].index];
  const min = Math.min(...series);
  const max = Math.max(...series);
  return {
    inRange: {
      color: <string[]>conf.zAxis[0].columns[0].color,
    },
    left: "right",
    top: "center",
    type: conf.features.piecewise ?? false ? "piecewise" : "continuous",
    min,
    max,
    calculable: (conf.renderer ?? "canvas") === "canvas",
  };
};
