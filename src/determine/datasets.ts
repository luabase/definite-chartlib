import Chart from "../chart";
import { DataFrame } from "../dataframe";
import { ChartType, echarts } from "../types";
import * as utils from "../utils";

export function datasets<T extends ChartType>(
  chart: Chart<T>,
  df: DataFrame
): echarts.DataSet[] {
  const datasets: echarts.DataSet[] = [df.asDataSet()];
  const groupBy = chart.getGroupByDimension();
  const splitBy = chart.getBreakdownDimension();
  if (!groupBy) throw new Error("Group by dimension not found");
  df = groupBy.dataType === "datetime" ? formatDateDF(df, groupBy.index) : df;
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

function formatDateDF(df: DataFrame, index: number) {
  let fmt = "";
  const values = df.col(index);
  const dates = values.map((v) => utils.datetime.toDateUTC(String(v)));
  if (dates.every((d) => utils.datetime.isStartOrEndOfYear(d))) {
    fmt = "y";
  } else if (dates.every((d) => utils.datetime.isStartOrEndOfQuarter(d))) {
    fmt = "yQq";
  } else if (dates.every((d) => utils.datetime.isStartOrEndOfMonth(d))) {
    fmt = "y-m";
  } else {
    fmt = "y-m-d";
  }
  return df.map(index, (v) => {
    const d = utils.datetime.toDateUTC(String(v));
    return utils.datetime.strftime(d, fmt);
  });
}
