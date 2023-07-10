import Chart from "./chart";
import { ChartType, DataType } from "./types";
import { color } from "./constants";
import * as utils from "./utils";

export type ColumnOptions = { index: number; dataType: string };
type CreateChartMessage = {
  type: string;
  dimensions: ColumnOptions[];
  metrics: ColumnOptions[];
};

const COLORS = [color.LIME_200, ...color.COLOR_PALETTE.slice(1)];

export class AutoChartFactory {
  private subsetQ: Array<Array<ColumnOptions>>;
  private createQ: Array<CreateChartMessage>;

  constructor(opts: Array<ColumnOptions>) {
    this.subsetQ = utils.array.getAllSubsets(opts, 2);
    this.createQ = [];
    while (this.subsetQ.length > 0) {
      const subset = this.subsetQ.shift();
      if (subset) {
        this.addAllCreateChartMessagesToQueue(subset);
      }
    }
    this.createQ = utils.array.removeDuplicates(this.createQ);
  }

  private addAllCreateChartMessagesToQueue(opts: Array<ColumnOptions>) {
    // NOTE: opts.length >= 2
    const dims = opts.filter((opt) =>
      ["category", "datetime"].includes(opt.dataType)
    );
    if (dims.length < 1) {
      return; // not supported combo
    }
    const metrics = opts.filter((opt) => opt.dataType === "value");
    if (dims.length === 1) {
      if (metrics.length === 1) {
        if (dims[0].dataType === "category") {
          ["bar", "pie"].forEach((t) =>
            this.createQ.push({ type: t, dimensions: dims, metrics: metrics })
          );
        } else if (dims[0].dataType === "datetime") {
          ["line", "calendar"].forEach((t) =>
            this.createQ.push({ type: t, dimensions: dims, metrics: metrics })
          );
        }
      } else if (metrics.length === 2) {
        if (dims[0].dataType === "category") {
          ["bar", "scatter"].forEach((t) =>
            this.createQ.push({ type: t, dimensions: dims, metrics: metrics })
          );
        } else if (dims[0].dataType === "datetime") {
          ["line", "scatter"].forEach((t) =>
            this.createQ.push({ type: t, dimensions: dims, metrics: metrics })
          );
        }
      } else {
        if (dims[0].dataType === "category") {
          this.createQ.push({
            type: "bar",
            dimensions: dims,
            metrics: metrics,
          });
        } else if (dims[0].dataType === "datetime") {
          this.createQ.push({
            type: "line",
            dimensions: dims,
            metrics: metrics,
          });
        }
      }
    } else if (dims.length === 2) {
      // TODO: if metrics.length === 0, use count and distinct aggregations
      if (metrics.length === 1) {
        if (
          dims[0].dataType === "datetime" &&
          dims[1].dataType === "category"
        ) {
          ["line", "heatmap"].forEach((t) =>
            this.createQ.push({ type: t, dimensions: dims, metrics: metrics })
          );
        } else if (
          dims[0].dataType === "category" &&
          dims[1].dataType === "category"
        ) {
          ["bar", "heatmap"].forEach((t) =>
            this.createQ.push({ type: t, dimensions: dims, metrics: metrics })
          );
        } else if (
          dims[0].dataType === "category" &&
          dims[1].dataType === "datetime"
        ) {
          this.createQ.push({
            type: "heatmap",
            dimensions: dims,
            metrics: metrics,
          });
        } else {
          return; // not supported combo
        }
      } else {
        return; // not supported combo
      }
    } else {
      return; // not supported combo
    }
  }

  private generateSingleChart(): Chart<ChartType> {
    const msg = this.createQ.shift();
    if (!msg) throw new Error("No more charts to generate");
    const chart = new Chart(<ChartType>msg.type);
    msg.dimensions.forEach((opt) =>
      chart.addDimension({
        index: opt.index,
        dataType: <Exclude<DataType, "value">>opt.dataType,
      })
    );
    msg.metrics.forEach((opt, i) => {
      const colorChoice = ["pie", "calendar", "heatmap"].includes(msg.type)
        ? color.LIME_PALETTE
        : utils.array.unboundedReadItem(COLORS, i);
      const aggregation = ["scatter", "heatmap"].includes(msg.type)
        ? "none"
        : "sum";
      chart.addMetric({
        index: opt.index,
        color: colorChoice,
        aggregation: aggregation,
      });
    });
    return chart;
  }

  generateAllCharts(): Array<Chart<ChartType>> {
    const charts: Array<Chart<ChartType>> = [];
    while (this.createQ.length > 0) {
      const chart = this.generateSingleChart();
      charts.push(chart);
    }
    return charts;
  }
}
