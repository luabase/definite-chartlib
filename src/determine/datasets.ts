import { Chart } from "../chart";
import { DataFrame } from "../dataframe";
import { ChartType, echarts } from "../types";
import * as utils from "../utils";

// NOTE: dataset ID will be of this format:
// <metric index>::<chart type>::<dataset index>::<dataset name>::<metric id>

export function datasets<T extends ChartType>(
  chart: Chart<T>,
  df: DataFrame
): echarts.DataSet[] {
  const datasets: echarts.DataSet[] = [df.asDataSet()];
  const datasets1: echarts.DataSet[] = [df.asDataSet()];
  const groupBy = chart.getGroupByDimension();
  if (chart.getChartType() === "kpi") {
    const dataset = df.asDataSet();
    const metric = chart.getMetrics()[0];
    const lastIndex = dataset.source.length - 1;
    const selectedMetricDataset = {
      dimensions: [dataset.dimensions[metric.index]],
      source: [
        [
          dataset.source[lastIndex][metric.index],
          dataset.source[lastIndex - 1]?.[metric.index],
        ],
      ],
    };

    const name = df.columns.get(metric.index);
    const type = chart.getChartType();
    selectedMetricDataset.id = `${metric.index}::${type}::${datasets.length}::${name}::${metric.id}`;
    datasets.push(selectedMetricDataset);
    return datasets;
  }

  if (!groupBy) {
    return datasets;
  }

  const isPercentageStyle = chart.getStyleValueStyle() === "percentage";
  if (isPercentageStyle) {
    const categoryTotals: Record<string, number> = {};

    // Calculate totals for each category
    df.data.forEach((row) => {
      const category = row[groupBy.index]; // Category value (e.g., "Thursday")
      const total = chart.getMetrics().reduce((sum, metric) => {
        const metricValue = row[metric.index]; // Value for the metric
        return sum + (typeof metricValue === "number" ? metricValue : 0);
      }, 0);
      categoryTotals[category] = total;
    });

    // Normalize all rows for the first dataset
    const normalizedRows = df.data.map((row) => {
      const category = row[groupBy.index];
      const total = categoryTotals[category];
      return row.map((value, index) => {
        // Normalize only metric values, leave non-metric columns unchanged
        const metric = chart.getMetrics().find((m) => m.index === index);
        if (metric) {
          return total > 0 ? value / total : 0; // Convert to percentage
        }
        return value; // Non-metric values (e.g., category) remain unchanged
      });
    });

    // Create a normalized DataFrame for datasets1[0]
    const normalizedDataFrame = new DataFrame(
      normalizedRows,
      Array.from(df.columns.values())
    ); // Convert columns map to array

    const normalizedDataset = normalizedDataFrame.asDataSet();

    // Ensure dimensions contain proper names
    normalizedDataset.dimensions = Array.from(df.columns.values());

    // Replace the original dataset with normalized data
    datasets1[0] = normalizedDataset;

    // Create separate datasets for each metric (datasets1[1], datasets1[2], ...)
    chart.getMetrics().forEach((metric, metricIndex) => {
      const metricName =
        df.columns.get(metric.index) ?? `Metric ${metricIndex}`;
      const groupByName = df.columns.get(groupBy.index) ?? "Category";

      const normalizedRowsForMetric = df.data.map((row) => {
        const category = row[groupBy.index];
        const total = categoryTotals[category];
        const value = row[metric.index];
        const percentage = total > 0 ? value / total : 0;
        return [category, percentage]; // Include only the category and percentage for this metric
      });

      const normalizedMetricDataFrame = new DataFrame(normalizedRowsForMetric, [
        groupByName, // Use the actual name of the groupBy dimension
        metricName, // Use the actual name of the metric
      ]);

      const dataset = normalizedMetricDataFrame.asDataSet();

      // Ensure dimensions contain proper names
      dataset.dimensions = [groupByName, metricName];

      // Add a unique ID for the dataset
      dataset.id = `${metric.index}::${chart.getChartType()}::${
        datasets1.length
      }::${metricName}::${metric.id}`;
      datasets1.push(dataset);
    });

    console.log("FIND ME ", datasets1);

    return datasets1;
  }

  const splitBy = chart.getBreakdownDimension();
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
      dataset.id = `${metric.index}::${type}::${datasets.length}::${name}::${metric.id}`;
      datasets.push(dataset);
    } else {
      if (!!splitBy) {
        const metric = chart.getMetrics()[0];

        const name = df.columns.get(1);
        const type = chart.getChartType();
        dataset.id = `${metric.index}::${type}::${datasets.length}::${name}::${metric.id}`;
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
          dataset.id = `${metric.index}::${type}::${datasets.length}::${name}::${metric.id}`;
          datasets.push(dataset);
        });
      }
    }
  });

  console.log("FIND ME 2", datasets);
  return datasets;
}
