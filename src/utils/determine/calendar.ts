import * as ec from "../../types/echarts";
import * as frame from "../frame";
import { ChartConfig, ChartType } from "../../types";
import { color } from "../../constants";

export const calendar = (
  conf: ChartConfig,
  dataset: ec.DataSet
): ec.Calendar[] | null => {
  if (conf.type !== ChartType.CALENDAR) {
    return null;
  }
  const transposed = frame.transpose(dataset.source);
  const years = Array.from(
    new Set(
      transposed[0]
        .map((t) => new Date(String(t)))
        .map((d) => d.getUTCFullYear())
        .sort()
    )
  );
  return years.map((year, i) => {
    return {
      top: i * 130 + 90,
      right: 30,
      cellSize: ["auto", 13],
      range: String(year),
      itemStyle: {
        color: color.ZINC_900,
        borderColor: color.ZINC_500,
        borderWidth: 0.5,
      },
      orient: "horizontal",
      splitLine: {
        show: true,
        lineStyle: {
          color: color.ZINC_400,
          width: 1,
          type: "solid",
        },
      },
    };
  });
};
