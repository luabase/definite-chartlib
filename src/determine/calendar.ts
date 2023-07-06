import { DataFrame } from "../dataframe";
import { Chart } from "../manager";
import { ChartType, echarts } from "../types";
import { color } from "../constants";

export function calendar<T extends ChartType>(
  chart: Chart<T>,
  df: DataFrame
): echarts.Calendar[] | null {
  if (chart.getChartType() !== "calendar") return null;
  const dim = chart.getDimensions().find((d) => d.dataType === "datetime");
  if (!dim) return null;
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
        color: color.ZINC_900,
        borderColor: color.ZINC_500,
        borderWidth: 0.5,
      },
      orient: "horizontal",
      splitLine: { lineStyle: { color: color.ZINC_400, type: "solid" } },
    };
  });
}