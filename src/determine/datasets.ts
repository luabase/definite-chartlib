import { DataFrame } from "../dataframe";
import Chart from "../chart";
import { ChartType, echarts } from "../types";

export function datasets<T extends ChartType>(
  chart: Chart<T>,
  df: DataFrame
): echarts.DataSet[] {
  const datasets: echarts.DataSet[] = [df.asDataSet()];
  const groupBy = chart.getGroupByDimension();
  const splitBy = chart.getBreakdownDimension();
  if (!groupBy) throw new Error("Group by dimension not found");
  const dfs = !!splitBy ? df.splitBy(splitBy.index) : [df];
  dfs.forEach((df) => {
    if (chart.getChartType() === "scatter") {
      const firstMetric = chart.getMetrics()[0];
      const dataset = df.asDataSet();
      const name = !!splitBy ? df.col(splitBy.index)[0] : "";
      dataset.id = `${firstMetric.index}::scatter::${datasets.length}::${name}`;
      datasets.push(dataset);
    } else if (chart.getChartType() === "heatmap") {
      const firstMetric = chart.getMetrics()[0];
      const dataset = df.asDataSet();
      dataset.id = `${firstMetric.index}::heatmap::${datasets.length}::`;
      datasets.push(dataset);
    } else {
      chart.getMetrics().forEach((metric) => {
        if (metric.aggregation === "none") throw new Error("Cannot be none");
        const dataset = df
          .groupBy(metric.index, groupBy?.index, metric.aggregation)
          .asDataSet();
        let name = !!splitBy
          ? df.col(splitBy.index)[0]
          : df.columns.get(metric.index);
        const uniqueMetrics = new Set(chart.getMetrics().map((m) => m.index));
        const totalMetrics = chart.getMetrics().length;
        name =
          ["count", "distinct"].includes(metric.aggregation) ||
          (uniqueMetrics.size === 1 && totalMetrics > 1)
            ? `${name} (${metric.aggregation})`
            : name;
        const type = metric.chartType ?? chart.getChartType();
        dataset.id = `${metric.index}::${type}::${datasets.length}::${name}`;
        datasets.push(dataset);
      });
    }
  });
  return datasets;
}
