import { Chart } from "../chart";
import { ChartType, Metric, echarts } from "../types";
import { DataFrame } from "../dataframe";
import {
  categoryFormatter,
  valueFormatter,
  percentFormatter,
  currencyFormatter,
} from "../formatters";
import { color } from "../constants";
import * as utils from "../utils";

const MAX_INTERVAL = 3;

export function axis<T extends ChartType>(
  chart: Chart<T>,
  datasets: echarts.DataSet[],
  kind: "x" | "y"
): echarts.Axis[] {
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
      nameGap: kind === "y" ? 85 : 30,
    };
    if (chart.getChartType() === "bar") {
      item.nameGap = isLarge ? item.nameGap + 25 : item.nameGap;
      item.axisLabel = {
        interval: isLarge
          ? Math.min(Math.floor((df.shape.height - 1) / 10), MAX_INTERVAL)
          : 0,
        rotate: isLarge ? 30 : 0,
        formatter: categoryFormatter,
      };
    }
    axes.push(addCommonFeatures(chart.getChartType(), item, kind));
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
          axisLabel: { formatter: determineFormatter(chart) },
        };
        axes.push(addCommonFeatures(chart.getChartType(), item, kind));
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
  kind: "x" | "y"
) {
  item.nameLocation = "center";
  item.nameTextStyle = { fontSize: 14 };
  if (kind === "y" || chartType === "scatter") {
    item.splitLine = {
      lineStyle: { type: "dashed", color: color.ZINC_800 },
    };
  }
  return item;
}

function getMapOfValueAxes<T extends ChartType>(chart: Chart<T>) {
  const map = new Map<string, Metric<T>[]>();
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

function determineFormatter<T extends ChartType>(chart: Chart<T>) {
  const metrics = chart.getMetrics();
  const firstMetric = metrics[0];
  if (firstMetric?.format === "percent") {
    return percentFormatter;
  } else if (firstMetric?.format === "currency") {
    return currencyFormatter;
  } else {
    return valueFormatter;
  }
}
