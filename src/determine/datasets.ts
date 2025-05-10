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
  const normalizedDatasets: echarts.DataSet[] = [df.asDataSet()];
  const groupBy = chart.getGroupByDimension();
  const categoryTotals: Record<string, number> = {};
  const isPercentageStyle = chart.getStyleValueStyle() === "percentage";
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

  if (isPercentageStyle) {
    const dataset = df.asDataSet();
    const metricsToCalculate = chart.getMetrics();
    const dimenstionToCalculate = groupBy;
    const dimensionIndex = dimenstionToCalculate.index;

    metricsToCalculate.forEach((metric) => {
      // Determine the index of the selected dimension
      const metricIndex = metric.index;
      // Validate that the dimension index exists in the dataset
      if (metricIndex >= dataset.dimensions.length) {
        throw new Error("Dimension index out of bounds");
      }

      // Iterate over each row in the source
      dataset.source.forEach((row) => {
        // Get the category value for the selected dimension
        const dimensionCategory = row[dimensionIndex];

        if (!categoryTotals[dimensionCategory]) {
          categoryTotals[dimensionCategory] = 0; // Initialize total for the category
        }

        // Sum all numeric values in the row (excluding the category column itself)
        row.forEach((value, index) => {
          if (index === metricIndex && typeof value === "number") {
            categoryTotals[dimensionCategory] += value;
          }
        });
      });
    });

    const normalizedRows = dataset.source.map((row) => {
      const metricsToCalculate = chart.getMetrics();
      const newRow = [...row];
      metricsToCalculate.forEach((metric) => {
        const metricIndex = metric.index;
        const valueToNormalize = row[metricIndex];
        const groupByCategory = row[groupBy.index];
        const categoryTotal = categoryTotals[groupByCategory];
        const normalizedValue = valueToNormalize / categoryTotal;
        newRow[metricIndex] = normalizedValue;
      });
      return newRow;
    });

    const normalizedDataFrame = new DataFrame(
      normalizedRows,
      Array.from(df.columns.values())
    ); // Convert columns map to array

    const normalizedDataset = normalizedDataFrame.asDataSet();
    normalizedDataset.dimensions = Array.from(df.columns.values());
    normalizedDatasets[0] = normalizedDataset;
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
      
      // Add heatmap debugging
      if (chart.getChartType() === "heatmap") {
        console.warn("==== HEATMAP DATASET DEBUG ====");
        console.warn("Dimensions in chart:", chart.getDimensions().map(d => ({ index: d.index, dataType: d.dataType })));
        console.warn("Metrics in chart:", chart.getMetrics().map(m => ({ index: m.index, aggregation: m.aggregation })));
        console.warn("Dataset columns:", dataset.dimensions);
        console.warn("Dataset id:", dataset.id);
        console.warn("First row sample:", dataset.source[0]);
        
        // Add raw data debugging
        console.warn("Original DataFrame columns:", Array.from(df.columns.entries()));
        console.warn("DataFrame shape:", df.shape);
        console.warn("Original source rows (first 2):", df.data.slice(0, 2));
        console.warn("Dataset source rows (first 2):", dataset.source.slice(0, 2));
        
        console.warn("==== END HEATMAP DATASET DEBUG ====");
      }
      
      datasets.push(dataset);
    } else {
      if (!!splitBy) {
        const metric = chart.getMetrics()[0];
        const dataset = df.asDataSet();
        const name = df.columns.get(1);
        const type = chart.getChartType();
        dataset.id = `${metric.index}::${type}::${datasets.length}::${name}::${metric.id}`;
        if (isPercentageStyle) {
          const normalizedDataset = { ...dataset };
          const normalizedSource = dataset.source.map((source) => {
            const newSource = [...source];
            const category = source[0];
            const total = categoryTotals[category];
            const newTotal = source[1] / total;
            newSource[1] = newTotal || null;
            return newSource;
          });
          normalizedDataset.source = normalizedSource;
          normalizedDatasets.push(normalizedDataset);
        }
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
          if (isPercentageStyle) {
            const normalizedDataset = { ...dataset };
            const normalizedSource = dataset.source.map((source) => {
              const newSource = [...source];
              const category = source[0];
              const total = categoryTotals[category];
              const newTotal = source[1] / total;
              newSource[1] = newTotal || null;
              return newSource;
            });
            normalizedDataset.source = normalizedSource;
            normalizedDatasets.push(normalizedDataset);
          }
          datasets.push(dataset);
        });
      }
    }
  });

  // Add special handling for Sankey charts
  if (chart.getChartType() === "sankey") {
    // For Sankey charts, we need to ensure we have the source, target, and value columns
    const dimensions = chart.getDimensions();
    const metrics = chart.getMetrics();

    if (dimensions.length < 2 || metrics.length < 1) {
      throw new Error(
        "Sankey chart requires at least 2 dimensions and 1 metric"
      );
    }

    // We can use the dataset as is, since the sankeyChart function will extract the right columns
    return datasets;
  }

  if (isPercentageStyle) {
    return normalizedDatasets;
  }
  return datasets;
}
