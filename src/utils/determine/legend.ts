import * as ec from "../../types/echarts";
import { ChartConfig, ChartType } from "../../types";

export const legend = (conf: ChartConfig): ec.Legend => {
  return {
    show: (conf.features.legend ?? false) && conf.type !== ChartType.HEATMAP,
    type: "scroll",
    left: "center",
    top: conf.renderer === "svg" ? 10 : "2%",
  };
};
