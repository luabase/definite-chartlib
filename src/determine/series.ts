import Chart from "../chart";
import { ChartType, echarts } from "../types";
import { color } from "../constants";
import * as utils from "../utils";
import { DataFrame } from "../dataframe";

export function series<T extends ChartType>(
  chart: Chart<T>,
  datasets: echarts.DataSet[]
): echarts.Series[] {
  const series: echarts.Series[] = [];
  const colors: string[] = [];
  datasets.slice(1).forEach((dataset) => {
    if (!dataset.id) throw new Error("Dataset for series must include ID");
    let [mix, t, dix, name] = dataset.id.split("::");
    const metric = chart.getMetric(
      (m) =>
        m.index === Number(mix) && (m.chartType ?? chart.getChartType()) === t
    );
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
    } else if (chart.getChartType() === "pie") {
      item.encode = {
        itemName: dataset.dimensions[0],
        value: dataset.dimensions[1],
      };
      item.itemStyle = {
        borderColor: color.ZINC_900,
        borderRadius: 10,
        borderWidth: 2,
      };
      item.label = { color: color.ZINC_500, show: true };
      item.yAxisIndex = 0;
      item.textStyle = { color: color.ZINC_500 };
      item.radius = ["40%", "70%"];
    } else if (chart.getChartType() === "scatter") {
      const metrics = chart.getMetrics();
      item.symbolSize = 15;
      item.encode = {
        x: dataset.dimensions[metrics[0].index],
        y: dataset.dimensions[metrics[1].index],
        tooltip: [
          dataset.dimensions[chart.getGroupByDimension()?.index ?? 0],
          dataset.dimensions[metrics[0].index],
          dataset.dimensions[metrics[1].index],
        ],
      };
    } else if (chart.getChartType() === "calendar") {
      const df = DataFrame.fromDataSet(dataset);
      Array.from(
        new Set(
          df
            .col(0)
            .map((v) => new Date(String(v)))
            .map((d) => d.getUTCFullYear())
            .sort()
        )
      ).forEach((_, i) => {
        series.push({
          type: "heatmap",
          coordinateSystem: "calendar",
          name: name,
          datasetIndex: 1,
          calendarIndex: i,
        });
      });
      return;
    } else if (chart.getChartType() === "heatmap") {
      delete item.color;
      item.datasetIndex = 1;
      item.encode = {
        x: dataset.dimensions[0],
        y: dataset.dimensions[1],
        value: dataset.dimensions[2],
      };
      item.name = dataset.dimensions[2];
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
