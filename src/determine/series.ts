import { Chart } from "../manager";
import { ChartType, echarts } from "../types";
import { color } from "../constants";
import * as utils from "../utils";

export function series<T extends ChartType>(
  chart: Chart<T>,
  datasets: echarts.DataSet[]
): echarts.Series[] {
  const series: echarts.Series[] = [];
  const colors: string[] = [];
  datasets.slice(1).forEach((dataset) => {
    if (!dataset.id) {
      throw new Error("Dataset for series must include ID");
    }
    let [mix, t, dix, name] = dataset.id.split("::");
    const metric = chart.getMetric((m) => m.index === Number(mix));
    if (!metric) throw new Error("Metric not found");
    const colorId = `${mix}-${metric.color}`;
    const c = colors.includes(colorId)
      ? utils.array.unboundedReadItem(color.COLOR_PALETTE, Number(dix) - 1)
      : metric.color;
    colors.push(colorId);
    t = t === "calendar" ? "heatmap" : t;
    series.push({
      type: t,
      color: c,
      datasetIndex: Number(dix),
      encode: { x: dataset.dimensions[0], y: dataset.dimensions[1] },
      name: name,
      yAxisIndex: 0,
    });
  });
  return series;
}
