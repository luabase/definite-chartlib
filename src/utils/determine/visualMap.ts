import * as ec from "../../types/echarts";
import * as frame from "../frame";
import { color } from "../../constants";
import { ChartConfig, ChartType } from "../../types";

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
  if (!Array.isArray(conf.zAxis[0].columns[0].color)) {
    conf.zAxis[0].columns[0].color = color.LIME_PALETTE;
  }
  return {
    inRange: {
      color: conf.zAxis[0].columns[0].color,
    },
    left: "right",
    top: "center",
    type: conf.features.piecewise ?? false ? "piecewise" : "continuous",
    orient: "vertical",
    min,
    max,
    calculable: true,
  };
};
