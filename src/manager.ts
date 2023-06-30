import {
  ChartOptions,
  ChartType,
  Dimension,
  Metric,
  StyleOptions,
} from "./types";
import { Predicate } from "./types/utility";
import { defaultStyleOptions } from "./factory";

export class ChartConfigManager<T extends ChartType> {
  private chartType: T;
  private style: StyleOptions<T>;
  private dimensions: Dimension<T>[];
  private metrics: Metric<T>[];

  constructor(chartType: T) {
    this.chartType = chartType;
    this.style = <StyleOptions<T>>defaultStyleOptions(this.chartType);
    this.dimensions = [];
    this.metrics = [];
  }

  getOptions(): ChartOptions<T> {
    return {
      chartType: this.chartType,
      style: this.style,
      dimensions: this.dimensions,
      metrics: this.metrics,
    };
  }

  setStyleOption(
    k: keyof StyleOptions<T>,
    v: StyleOptions<T>[typeof k]
  ): ChartConfigManager<T> {
    this.style = <StyleOptions<T>>{ ...this.style, ...{ [k]: v } };
    return this;
  }

  addDimension(dim: Dimension<T>): ChartConfigManager<T> {
    this.dimensions.push(dim);
    return this;
  }

  updateDimension(
    where: Predicate<Dimension<T>>,
    k: keyof Dimension<T>,
    v: Dimension<T>[typeof k]
  ): ChartConfigManager<T> {
    const dim = this.dimensions.find((d) => where(d));
    if (!dim) {
      return this;
    }
    const ix = this.dimensions.indexOf(dim);
    this.dimensions[ix] = { ...this.dimensions[ix], ...{ [k]: v } };
    return this;
  }

  deleteDimension(where: Predicate<Dimension<T>>): ChartConfigManager<T> {
    this.dimensions = this.dimensions.filter((d) => !where(d));
    return this;
  }

  addMetric(metric: Metric<T>): ChartConfigManager<T> {
    this.metrics.push(metric);
    return this;
  }

  updateMetric(
    where: Predicate<Metric<T>>,
    k: keyof Metric<T>,
    v: Metric<T>[typeof k]
  ): ChartConfigManager<T> {
    const metric = this.metrics.find((m) => where(m));
    if (!metric) {
      return this;
    }
    const ix = this.metrics.indexOf(metric);
    this.metrics[ix] = { ...this.metrics[ix], ...{ [k]: v } };
    return this;
  }

  deleteMetric(where: Predicate<Metric<T>>): ChartConfigManager<T> {
    this.metrics = this.metrics.filter((m) => !where(m));
    return this;
  }
}
