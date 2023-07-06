import { DataFrame } from "../dataframe";
import { Chart } from "../manager";
import { ChartType, echarts } from "../types";

export function datasets<T extends ChartType>(
  chart: Chart<T>,
  df: DataFrame
): echarts.DataSet[] {
  const datasets: echarts.DataSet[] = [df.asDataset()];
  const groupBy = chart.getGroupByDimension();
  const splitBy = chart.getBreakdownDimension();
  if (!groupBy) throw new Error("Group by dimension not found");
  const dfs = !!splitBy ? df.splitBy(splitBy.index) : [df];
  dfs.forEach((df) => {
    if (chart.getChartType() === "scatter") {
      const firstMetric = chart.getMetrics()[0];
      const dataset = df.asDataset();
      const name = !!splitBy ? df.col(splitBy.index)[0] : "";
      dataset.id = `${firstMetric.index}::scatter::${datasets.length}::${name}`;
      datasets.push(dataset);
    } else {
      chart.getMetrics().forEach((metric) => {
        if (metric.aggregation === "none") throw new Error("Cannot be none");
        const dataset = df
          .groupBy(metric.index, groupBy?.index, metric.aggregation)
          .asDataset();
        let name = !!splitBy
          ? df.col(splitBy.index)[0]
          : df.columns.get(metric.index);
        name = ["count", "distinct"].includes(metric.aggregation)
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
