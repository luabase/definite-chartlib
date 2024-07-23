import { DataFrame } from "../dataframe";
import { Chart } from "../chart";
import { ChartType, echarts } from "../types";
import {
  DS_SURFACE_PLATFORM_COLORS,
  DS_BORDER_COLORS,
} from "../constants/color"; // Update this import to the correct path

export function calendar<T extends ChartType>(
  chart: Chart<T>,
  df: DataFrame,
  theme: string
): echarts.Calendar[] | null {
  if (chart.getChartType() !== "calendar") return null;
  const dim = chart.getGroupByDimension();
  if (!dim || dim.dataType === "category") return null;
  const years = Array.from(
    new Set(
      df
        .col(dim.index)
        .map((v) => new Date(String(v)))
        .map((d) => d.getUTCFullYear())
        .sort()
    )
  );
  return years.map((y, i) => {
    return {
      top: i * 130 + 90,
      right: 30,
      cellSize: ["auto", 13],
      range: String(y),
      itemStyle: {
        color:
          theme === "light"
            ? DS_SURFACE_PLATFORM_COLORS.light.card
            : DS_SURFACE_PLATFORM_COLORS.dark.card,
        borderColor:
          theme === "light"
            ? DS_BORDER_COLORS.light.secondary
            : DS_BORDER_COLORS.dark.secondary,
        borderWidth: 0.5,
      },
      orient: "horizontal",
      splitLine: {
        lineStyle: {
          color:
            theme === "light"
              ? DS_BORDER_COLORS.light.secondary
              : DS_BORDER_COLORS.dark.secondary,
          type: "solid",
        },
      },
    };
  });
}
