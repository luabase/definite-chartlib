import { Chart } from "../chart";
import { ChartType, echarts } from "../types";
import * as utils from "../utils";
import { DS_TEXT_COLORS } from "../constants/color";

export function title<T extends ChartType>(
  chart: Chart<T>,
  s: string,
  theme: string,
  label: string
): echarts.Title {
  const needsLegendLabel = chart.getDoesNeedLegendLabel();
  const showLegend = chart.getStyleShowLegend();

  let left = "center";
  if (chart.getChartType() === "calendar") {
    left = "auto";
  } else if (chart.getChartType() === "kpi") {
    left = "left";
  }
  return {
    show: needsLegendLabel && showLegend,
    text: label,
    top: 20,
    left,
    textStyle: {
      color:
        theme === "light"
          ? DS_TEXT_COLORS.light.secondary
          : DS_TEXT_COLORS.dark.secondary,
      fontSize: 14,
      fontWeight: "normal",
    },
  };
}
