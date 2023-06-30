import { categoryFormatter, valueFormatter } from "../formatters";
import { ChartConfigOptions, ChartType, StyleOptions, echarts } from "../types";
import { color } from "../constants";
import { DataFrame } from "../dataframe";

export function xAxis<T extends ChartType>(
  opts: ChartConfigOptions<T>,
  df: DataFrame
): echarts.Axis[] {
  switch (opts.chartType) {
    case "bar":
      switch ((<StyleOptions<"bar">>{ ...opts.style }).orientation) {
        case "vertical": {
          const dim = opts.dimensions[0];
          return [
            {
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
            },
          ];
        }
        case "horizontal": {
          // FIXME: handle multiple axes
          const metric = opts.metrics[0];
          return [
            {
              type: "value",
              show: true,
              name: df.columns.get(metric.index) ?? "",
              nameLocation: "center",
              nameGap: df.shape.height > 6 ? 55 : 30,
              nameTextStyle: {
                fontSize: 14,
              },
              axisLabel: {
                formatter: valueFormatter,
              },
            },
          ];
        }
      }
      break;
    case "scatter": {
      const metric = opts.metrics[0];
      return [
        {
          type: "value",
          show: true,
          name: df.columns.get(metric.index) ?? "",
          nameLocation: "center",
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
          },
          splitLine: {
            lineStyle: {
              color: color.ZINC_800,
              type: "dashed",
              width: 1,
            },
            show: true,
          },
          axisLabel: {
            formatter: valueFormatter,
          },
        },
      ];
    }
    default: {
      const dim = opts.dimensions[0];
      return [
        {
          type: "category",
          show: !["pie", "calendar"].includes(opts.chartType),
          name: df.columns.get(dim.index) ?? "",
          nameLocation: "center",
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
          },
        },
      ];
    }
  }
}
