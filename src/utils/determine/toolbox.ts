import * as ec from "../../types/echarts";
import { ChartConfig } from "../../types";

export const toolbox = (conf: ChartConfig): ec.ToolBox => {
  if (
    (conf.renderer ?? "canvas") === "canvas" &&
    (conf.features.toolbox ?? false)
  ) {
    return {
      show: true,
      feature: {
        saveAsImage: {
          show: true,
          type: "png",
        },
        dataView: {
          show: true,
          readOnly: true,
        },
      },
    };
  } else {
    return {
      show: false,
    };
  }
};
