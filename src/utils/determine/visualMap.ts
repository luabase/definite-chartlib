import * as ec from "../../types/echarts";
import * as frame from "../frame";
import { color, error } from "../../constants";
import { ChartConfig, ChartType } from "../../types";

export const visualMap = (
  conf: ChartConfig,
  dataset: ec.DataSet
): ec.VisualMap | null => {
  if (![ChartType.HEATMAP, ChartType.CALENDAR].includes(conf.type)) {
    return null;
  }
  const valAxis = conf.type === ChartType.HEATMAP ? conf.zAxis : conf.yAxis;
  if (!valAxis) {
    throw error.Z_AXIS_NOT_FOUND;
  }
  const transposed = frame.transpose(dataset.source);
  const series = transposed[valAxis[0].columns[0].index].map((s) => Number(s));
  const min = Math.min(...series);
  const max = Math.max(...series);
  if (!Array.isArray(valAxis[0].columns[0].color)) {
    valAxis[0].columns[0].color = color.LIME_PALETTE;
  }
  return {
    inRange: {
      color: valAxis[0].columns[0].color,
    },
    left: conf.type === ChartType.HEATMAP ? "right" : "center",
    top: conf.type === ChartType.HEATMAP ? "center" : 3,
    type: conf.features.piecewise ?? false ? "piecewise" : "continuous",
    orient: conf.type === ChartType.HEATMAP ? "vertical" : "horizontal",
    min,
    max,
    calculable: true,
  };
};
