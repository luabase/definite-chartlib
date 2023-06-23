import * as ec from "../../types/echarts";
import { ChartConfig, ChartType } from "../../types";

export const legend = (conf: ChartConfig): ec.Legend => {
  return {
    show:
      (conf.features.legend ?? false) &&
      ![ChartType.HEATMAP, ChartType.CALENDAR].includes(conf.type),
    type: "scroll",
    left: "center",
    top: conf.renderer === "svg" ? 10 : "2%",
  };
};
