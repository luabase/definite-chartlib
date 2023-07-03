import { Chart } from "../manager";
import { ChartType, Metric, echarts } from "../types";
import { DataFrame } from "../dataframe";
import { categoryFormatter, valueFormatter } from "../formatters";
import { color } from "../constants";
import { utils } from "..";

export function axis<T extends ChartType>(
  chart: Chart<T>,
  df: DataFrame,
  kind: "x" | "y"
): echarts.Axis[] {
  let dim = kind === "x";
  dim =
    chart.getChartType() !== "scatter" &&
    chart.getOrientation() !== "horizontal";
  const axes: echarts.Axis[] = [];
  if (dim) {
    const item: echarts.Axis = {
      show: chart.isCartesian(),
      type: "category",
      name: df.columns.get(chart.getDimensions()[0].index) ?? "",
      nameLocation: "center",
      nameGap: 30,
      nameTextStyle: { fontSize: 14 },
    };
    if (chart.getChartType() === "bar") {
      item.nameGap = df.shape.height > 6 ? 55 : 30;
      item.axisLabel = {
        interval: Math.floor((df.shape.height - 1) / 10),
        rotate: df.shape.height > 6 ? 30 : 0,
        formatter: categoryFormatter,
      };
    }
    axes.push(item);
  } else {
    for (let [k, v] of getMapOfValueAxes(chart).entries()) {
      if (chart.getChartType() === "scatter") {
        v = kind === "x" ? [v[0]] : [v[1]];
      }
      const name = v.map((v) => df.columns.get(v.index)).join(", ");
      axes.push({
        show: chart.isCartesian(),
        type: "value",
        name: utils.string.truncate(name, 42),
        nameLocation: "center",
        nameGap: kind === "x" ? 30 : 50,
        nameTextStyle: { fontSize: 14 },
        splitLine: { lineStyle: { type: "dashed", color: color.ZINC_800 } },
        axisLabel: { formatter: valueFormatter },
      });
    }
  }
  return axes;
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
