import * as ec from "../../types/echarts";
import { ChartConfig, ChartType } from "../../types";

export const tooltip = (conf: ChartConfig): ec.ToolTip => {
  if (![ChartType.PIE, ChartType.HEATMAP].includes(conf.type)) {
    return {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999999",
        },
      },
    };
  } else {
    return {
      show: true,
      trigger: "item",
    };
  }
};
