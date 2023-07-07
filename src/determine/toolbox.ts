import Chart from "../chart";
import { ChartType, echarts } from "../types";

export function toolbox<T extends ChartType>(chart: Chart<T>): echarts.ToolBox {
  return {
    show: chart.getStyleShowToolbox(),
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
}
