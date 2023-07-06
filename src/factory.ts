import { ChartType, StyleOptions } from "./types";

export function defaultStyleOptions(
  chartType: ChartType
): StyleOptions<typeof chartType> {
  switch (chartType) {
    case "bar":
      return {
        showTitle: true,
        showToolbox: false,
        showLegend: true,
        barStyle: "grouped",
        orientation: "vertical",
      };
    case "line":
      return {
        showTitle: true,
        showToolbox: false,
        showLegend: true,
        lineStyle: "point",
      };
    case "pie":
    case "scatter":
      return {
        showTitle: true,
        showToolbox: false,
      };
    case "calendar":
    case "heatmap":
      return {
        showTitle: true,
        showToolbox: false,
        colorGrouping: "continuous",
      };
  }
}
