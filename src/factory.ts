import Chart from "./chart";
import { color } from "./constants";
import { AggregationType, ChartType, DataType } from "./types";
import * as utils from "./utils";

type ColumnOptions = { index: number; dataType: string };
type CreateChartMessage = {
  type: string;
  dimensions: ColumnOptions[];
  metrics: ColumnOptions[];
};

export class AutoChartFactory {
  private subsetQ: Array<Array<ColumnOptions>>;
  private createQ: Array<CreateChartMessage>;

  constructor(opts: Array<ColumnOptions>) {
    this.subsetQ = utils.array.getAllSubsets(opts, 2);
    this.createQ = [];
    while (this.subsetQ.length > 0) {
      const subset = this.subsetQ.pop();
      if (subset) {
        this.addAllPossibleCreateChartMessagesToQueue(subset);
      }
    }
    this.createQ = utils.array.removeDuplicates(this.createQ).reverse(); // best first
  }

  private addAllPossibleCreateChartMessagesToQueue(opts: Array<ColumnOptions>) {
    // NOTE: opts.length >= 2
    const dims = opts.filter((opt) =>
      ["category", "datetime"].includes(opt.dataType)
    );
    if (dims.length < 1) {
      return; // not valid combo
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
      if (metrics.length === 1) {
        if (dims[0].dataType === "datetime") {
          this.createQ.push({
            type: "line",
            dimensions: dims,
            metrics: metrics,
          });
        } else {
          ["bar", "heatmap"].forEach((t) =>
            this.createQ.push({ type: t, dimensions: dims, metrics: metrics })
          );
        }
      } else {
        return; // not valid combo
      }
    } else {
      return; // not valid combo
    }
  }

  getPossibleChart(): Chart<ChartType> {
    const msg = this.createQ.pop();
    if (!msg) throw new Error("Create chart queue is empty");
    const chart = new Chart(<ChartType>msg.type);
    msg.dimensions.forEach((opt) =>
      chart.addDimension({
        index: opt.index,
        dataType: <Exclude<DataType, "value">>opt.dataType,
      })
    );
    msg.metrics.forEach((opt, i) => {
      const colorArray = [color.LIME_200, ...color.COLOR_PALETTE];
      const aggregation: AggregationType = ["scatter", "heatmap"].includes(
        msg.type
      )
        ? "none"
        : "sum";
      chart.addMetric({
        index: opt.index,
        color: utils.array.unboundedReadItem(colorArray, i),
        aggregation: aggregation,
      });
    });
    return chart;
  }

  getAllPossibleCharts(): Array<Chart<ChartType>> {
    const charts: Array<Chart<ChartType>> = [];
    while (this.createQ.length > 0) {
      charts.push(this.getPossibleChart());
    }
    return charts;
  }
}
