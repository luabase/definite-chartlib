import * as ec from "../../types/echarts";
import { ChartConfig, ChartType } from "../../types";

export const tooltip = (conf: ChartConfig): ec.ToolTip => {
  switch (conf.type) {
    case ChartType.CALENDAR:
    case ChartType.PIE:
      return {
        show: true,
        trigger: "item",
      };
    case ChartType.HEATMAP:
      return {
        show: true,
        trigger: "item",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999999",
          },
        },
      };
    default:
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
  }
};
