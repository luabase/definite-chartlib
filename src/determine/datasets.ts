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
  const dfs = !!splitBy ? df.splitBy(splitBy.index) : [df];
  dfs.forEach((df) => {
    chart.getMetrics().forEach((metric) => {
      if (!groupBy) throw new Error("Group by dimension not found");
      if (metric.aggregation === "none") return;
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
  });
  return datasets;
}
