import { Chart } from "../manager";
import { ChartType, Metric, echarts } from "../types";
import { DataFrame } from "../dataframe";
import { categoryFormatter, valueFormatter } from "../formatters";
import { color } from "../constants";
import * as utils from "../utils";

export function axis<T extends ChartType>(
  chart: Chart<T>,
  df: DataFrame,
  kind: "x" | "y"
): echarts.Axis[] {
  let dim = kind === "x";
  dim = chart.getChartType() === "scatter" ? false : dim;
  dim = chart.getStyleOrientation() === "horizontal" ? !dim : dim;
  dim = chart.getChartType() === "heatmap" ? true : dim;
  const axes: echarts.Axis[] = [];
  if (dim) {
    const ix = chart.getChartType() === "heatmap" && kind === "y" ? 1 : 0;
    const name = df.columns.get(chart.getDimensions()[ix].index) ?? "";
    const item: echarts.Axis = {
      show: chart.isCartesian(),
      type: "category",
      name: utils.string.truncate(name, 42),
      nameGap: kind === "y" ? 72 : 30,
    };
    if (chart.getChartType() === "bar") {
      item.nameGap = df.shape.height > 6 ? item.nameGap + 25 : item.nameGap;
      item.axisLabel = {
        interval: Math.floor((df.shape.height - 1) / 10),
        rotate: df.shape.height > 6 ? 30 : 0,
        formatter: categoryFormatter,
      };
    }
    axes.push(addCommonFeatures(item, kind));
  } else {
    const map = getMapOfValueAxes(chart);
    Array.from(map.keys())
      .sort() // ensures order is "left", "right"
      .forEach((k) => {
        let v = <Metric<T>[]>map.get(k);
        if (chart.getChartType() === "scatter") {
          v = kind === "x" ? [v[0]] : [v[1]];
        }
        const name = v.map((v) => df.columns.get(v.index)).join(", ");
        const item: echarts.Axis = {
          show: chart.isCartesian(),
          type: "value",
          name: utils.string.truncate(name, 42),
          nameGap: kind === "x" ? 30 : 50,
          axisLabel: { formatter: valueFormatter },
        };
        axes.push(addCommonFeatures(item, kind));
      });
  }
  return axes;
}

function addCommonFeatures(item: echarts.Axis, kind: "x" | "y") {
  item.nameLocation = "center";
  item.nameTextStyle = { fontSize: 14 };
  if (kind === "y") {
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
