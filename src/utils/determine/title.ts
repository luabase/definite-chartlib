import * as ec from "../../types/echarts";
import { ChartConfig } from "../../types";

export const title = (conf: ChartConfig): ec.Title => {
  return {
    show: conf.features.title ?? false,
    text: conf.name,
    top: conf.renderer === "svg" ? 10 : "2%",
    left: conf.renderer === "svg" ? 10 : "auto",
  };
};
