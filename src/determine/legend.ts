import { Chart } from "../chart";
import { ChartType, echarts } from "../types";
import { DS_TEXT_COLORS } from "../constants/color"; // Update this import to the correct path
import { tooltipFormatter } from "../formatters";

export function legend<T extends ChartType>(
  chart: Chart<T>,
  theme: string
): echarts.Legend {
  return {
    show: chart.getStyleShowLegend(),
    left: "center",
    top: chart.getStyleShowTitle() ? 40 : 10,
    type: "scroll",
    textStyle: {
      color:
        theme === "light"
          ? DS_TEXT_COLORS.light.secondary
          : DS_TEXT_COLORS.dark.secondary,
    },
    formatter: tooltipFormatter,
  };
}
