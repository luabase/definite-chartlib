import { error } from "../constants";
import { DataFrame } from "../dataframe";
import { categoryFormatter } from "../formatters";
import { ChartConfigOptions, ChartType, echarts } from "../types";

function assertHasDimension<T extends ChartType>(opts: ChartConfigOptions<T>) {
  if (opts.dimensions.length === 0) {
    throw error.DIMENSIONS_NOT_SET;
  }
}

export function xAxis<T extends ChartType>(
  opts: ChartConfigOptions<T>,
  df: DataFrame
): echarts.Axis[] {
  const axes: echarts.Axis[] = [];
  switch (opts.chartType) {
    case "bar":
      assertHasDimension(opts);
      const dim = opts.dimensions[0];
      axes.push({
        type: "category",
        show: true,
        name: df.columns.get(dim.index) ?? "",
        nameLocation: "center",
        nameGap: df.shape.height > 6 ? 55 : 30,
        nameTextStyle: {
          fontSize: 14,
        },
        axisLabel: {
          interval: Math.floor((df.shape.height - 1) / 10),
          rotate: df.shape.height > 6 ? 30 : 0,
          formatter: categoryFormatter,
        },
      });
      break;
  }
  return axes;
}
