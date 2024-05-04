import { Chart } from "../chart";
import { ChartType, Metric, echarts } from "../types";
import { DataFrame } from "../dataframe";
import {
  categoryFormatter,
  valueFormatter,
  percentFormatter,
  currencyFormatter,
  axisFormatter,
  tooltipFormatter,
  determineFormatter,
} from "../formatters";
import { color } from "../constants";
import * as utils from "../utils";

const MAX_INTERVAL = 3;

export function axis<T extends ChartType>(
  chart: Chart<T>,
  datasets: echarts.DataSet[],
  kind: "x" | "y",
  theme: string
): echarts.Axis[] {
  if (chart.getChartType() === "kpi") {
    return [];
  }
  const df = DataFrame.fromDataSet(datasets[0]);
  const isLarge = utils.datasets.containsLargeData(datasets);
  const axes: echarts.Axis[] = [];
  if (isDimensionalAxis(chart, kind)) {
    const ix = chart.getChartType() === "heatmap" && kind === "y" ? 1 : 0;
    const name = df.columns.get(chart.getDimensions()[ix].index) ?? "";
    const item: echarts.Axis = {
      show: chart.isCartesian(),
      type: "category",
      name: utils.string.truncate(name, 42),
      nameGap: kind === "y" ? 85 : isLarge ? 50 : 30,
      nameTextStyle: {
        color: theme === "light" ? color.ZINC_800 : color.ZINC_400,
      },
      axisLabel: {
        color: theme === "light" ? color.ZINC_800 : color.ZINC_400,
        interval: isLarge
          ? Math.min(Math.floor((df.shape.height - 1) / 10), MAX_INTERVAL)
          : 0,
        rotate: isLarge ? 30 : 0,
        formatter: axisFormatter,
      },
      axisLine: {
        lineStyle: {
          color: theme === "light" ? color.ZINC_800 : color.ZINC_400,
        },
      },
      axisPointer: {
        label: {
          formatter: (params) => {
            return tooltipFormatter(params.value);
          },
        },
      },
    };
    if (chart.getChartType() === "bar") {
      item.nameGap = isLarge ? item.nameGap + 25 : item.nameGap;
    }
    axes.push(addCommonFeatures(chart.getChartType(), item, kind, theme));
  } else {
    const map = getMapOfValueAxes(chart);
    const keys = Array.from(map.keys());
    keys
      .sort() // ensures order is "left", "right"
      .forEach((k) => {
        let metrics = <Metric<T>[]>map.get(k);
        if (chart.getChartType() === "scatter") {
          metrics = kind === "x" ? [metrics[0]] : [metrics[1]];
        }
        const name =
          metrics.length > 1 ? "" : df.columns.get(metrics[0].index) ?? "";
        const item: echarts.Axis = {
          show: chart.isCartesian(),
          type: "value",
          name: utils.string.truncate(name, 42),
          nameGap: kind === "x" ? 30 : 50,
          nameTextStyle: {
            color: theme === "light" ? color.ZINC_800 : color.ZINC_400,
          },
          axisLine: {
            color: theme === "light" ? color.ZINC_800 : color.ZINC_400,
          },
          axisLabel: {
            formatter: determineFormatter(chart, k),
            color: theme === "light" ? color.ZINC_800 : color.ZINC_400,
          },
        };
        if (metrics[0].min !== undefined && String(metrics[0].min) !== "") {
          item.min = metrics[0].min;
        }
        if (metrics[0].max !== undefined && String(metrics[0].max) !== "") {
          item.max = metrics[0].max;
        }
        const formatter = determineFormatter(chart, "left");
        axes.push(
          addCommonFeatures(chart.getChartType(), item, kind, theme, formatter)
        );
      });
  }
  return axes;
}

function isDimensionalAxis<T extends ChartType>(
  chart: Chart<T>,
  kind: "x" | "y"
) {
  let dim = kind === "x";
  if (chart.getChartType() === "heatmap") {
    dim = true;
  } else if (chart.getChartType() === "scatter") {
    dim = false;
  } else if (chart.getStyleOrientation() === "horizontal") {
    dim = !dim;
  }
  return dim;
}

function addCommonFeatures(
  chartType: ChartType,
  item: echarts.Axis,
  kind: "x" | "y",
  theme: string,
  formatter?: any
) {
  item.nameLocation = "center";
  item.nameTextStyle = {
    fontSize: 14,
    color: theme === "light" ? color.ZINC_800 : color.ZINC_400,
  };
  if (kind === "y" || chartType === "scatter") {
    item.splitLine = {
      lineStyle: {
        type: "dashed",
        color: theme === "light" ? color.ZINC_200 : color.ZINC_800,
      },
    };
    item.axisPointer = {
      label: {
        formatter: (params) => formatter(params.value),
      },
    };
  }
  return item;
}

function getMapOfValueAxes<T extends ChartType>(chart: Chart<T>) {
  const map = new Map<"left" | "right", Metric<T>[]>();
  if (["bar", "line"].includes(chart.getChartType())) {
    return chart.getMetrics().reduce((acc, m: Metric<T>) => {
      const axis = (<Metric<"bar">>m).axis ?? "left";
      if (acc.has(axis)) {
        acc.get(axis)?.push(m);
      } else {
        acc.set(axis, [m]);
      }
      return acc;
    }, map);
  } else {
    map.set("left", chart.getMetrics());
  }
  return map;
}
