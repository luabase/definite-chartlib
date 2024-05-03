import { Chart } from "../chart";
import { ChartType, echarts } from "../types";
import { color } from "../constants";
import { tooltipFormatter } from "../formatters";

export function legend<T extends ChartType>(
  chart: Chart<T>,
  theme: string
): echarts.Legend {
  return {
    show: chart.getStyleShowLegend(),
    left: "center",
    top: chart.getStyleShowTitle() ? "8%" : "2%",
    type: "scroll",
    textStyle: {
      color: theme === "light" ? color.ZINC_900 : color.ZINC_300,
    },
    formatter: tooltipFormatter,
  };
}
