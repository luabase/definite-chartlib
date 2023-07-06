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
    const item: echarts.Series = {
      type: t,
      color: c,
      datasetIndex: Number(dix),
      name: name,
    };
    if (chart.getStyleOrientation() === "horizontal") {
      item.xAxisIndex = 0;
      item.encode = { x: dataset.dimensions[1], y: dataset.dimensions[0] };
    } else {
      item.yAxisIndex = 0;
      item.encode = { x: dataset.dimensions[0], y: dataset.dimensions[1] };
    }
    if (
      chart.getStyleBarStyle() === "stacked" ||
      chart.getStyleLineStyle() === "area"
    ) {
      item.stack = "total";
      if (chart.getChartType() === "line") {
        item.areaStyle = {};
      }
    }
    series.push(item);
  });
  return series;
}
