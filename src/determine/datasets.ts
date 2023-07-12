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
  if (!groupBy) throw new Error("Group by dimension not found");
  const splitBy = chart.getBreakdownDimension();
  if (groupBy.dataType === "datetime") {
    df = formatDateTimeIndexForDF(df, groupBy.index);
  }
  const dfs: DataFrame[] = [];
  if (splitBy) {
    if (chart.getChartType() === "scatter") {
      dfs.push(
        ...utils.array
          .removeDuplicates(df.col(splitBy.index))
          .map((v) => df.filter(splitBy.index, (w) => w === v))
      );
    } else {
      const pivoted = df.pivot(
        groupBy.index,
        splitBy.index,
        chart.getMetrics()[0].index,
        chart.getMetrics()[0].aggregation
      );
      for (const k of pivoted.columns.keys()) {
        if (k !== 0) {
          dfs.push(pivoted.select([0, k]));
        }
      }
    }
  } else {
    dfs.push(df);
  }
  dfs.forEach((df) => {
    if (["scatter", "heatmap"].includes(chart.getChartType())) {
      const metric = chart.getMetrics()[0];
      const dataset = df.asDataSet();
      const name = !!splitBy ? df.col(splitBy.index)[0] : "";
      const type = chart.getChartType();
      dataset.id = `${metric.index}::${type}::${datasets.length}::${name}`;
      datasets.push(dataset);
    } else {
      if (!!splitBy) {
        const metric = chart.getMetrics()[0];
        const dataset = df.asDataSet();
        const name = df.columns.get(1);
        const type = chart.getChartType();
        dataset.id = `${metric.index}::${type}::${datasets.length}::${name}`;
        datasets.push(dataset);
      } else {
        chart.getMetrics().forEach((metric) => {
          if (metric.aggregation === "none") throw new Error("Cannot be none");
          const dataset = df
            .groupBy(metric.index, groupBy?.index, metric.aggregation)
            .asDataSet();
          let name = df.columns.get(metric.index);
          const uniqueMetricIndices = utils.array.removeDuplicates(
            chart.getMetrics().map((m) => m.index)
          ).length;
          const totalMetrics = chart.getMetrics().length;
          name =
            ["count", "distinct"].includes(metric.aggregation) ||
            (uniqueMetricIndices === 1 && totalMetrics > 1)
              ? `${name} (${metric.aggregation})`
              : name;
          const type = metric.chartType ?? chart.getChartType();
          dataset.id = `${metric.index}::${type}::${datasets.length}::${name}`;
          datasets.push(dataset);
        });
      }
    }
  });
  return datasets;
}

function formatDateTimeIndexForDF(df: DataFrame, index: number) {
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
