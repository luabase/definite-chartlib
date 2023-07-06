import {
  BarStyleType,
  ChartOptions,
  ChartType,
  ColorGroupingType,
  Dimension,
  LineStyleType,
  Metric,
  OrientationType,
  StyleOptions,
  echarts,
} from "./types";
import { DataFrame } from "./dataframe";
import { Option, Predicate } from "./types/utility";
import { color } from "./constants";
import { defaultStyleOptions } from "./factory";
import * as determine from "./determine";

export class Chart<T extends ChartType> {
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

  static load<T extends ChartType>(opts: ChartOptions<T>) {
    const manager = new Chart(opts.chartType);
    manager.style = { ...manager.style, ...opts.style };
    opts.dimensions.forEach((d) => manager.addDimension(d));
    opts.metrics.forEach((m) => manager.addMetric(m));
    return manager;
  }

  compile(
    title: string,
    data: Array<{ [key: string]: Option<number | string> }>
  ): echarts.ECOption {
    const df = new DataFrame(data);
    const datasets = determine.datasets(this, df);
    return {
      animation: true,
      backgroundColor: color.ZINC_900,
      calendar: determine.calendar(this, df),
      dataset: datasets,
      grid: determine.grid(this, datasets),
      legend: determine.legend(this),
      series: determine.series(this, datasets),
      title: determine.title(this, title),
      toolbox: determine.toolbox(this),
      tooltip: determine.tooltip(this),
      visualMap: determine.visualMap(this, df),
      xAxis: determine.axis(this, df, datasets, "x"),
      yAxis: determine.axis(this, df, datasets, "y"),
    };
  }

  assertIsValid(): void {
    return;
  }

  canAddDimension(): boolean {
    // TODO
    return true;
  }

  canAddMetric(): boolean {
    // TODO
    return true;
  }

  canAddAxis(): boolean {
    // TODO
    return true;
  }

  getGroupByDimension(): Dimension<T> | undefined {
    if (["scatter", "heatmap"].includes(this.chartType)) {
      return undefined;
    } else {
      return this.dimensions[0];
    }
  }

  getBreakdownDimension(): Dimension<T> | undefined {
    if (["bar", "line"].includes(this.chartType)) {
      return this.dimensions[1];
    } else if (this.chartType === "scatter") {
      return this.dimensions[0];
    } else {
      return undefined;
    }
  }

  getOptions(): ChartOptions<T> {
    return {
      chartType: this.chartType,
      style: this.style,
      dimensions: this.dimensions,
      metrics: this.metrics,
    };
  }

  getChartType(): ChartType {
    return this.chartType;
  }

  getDimensions(): Dimension<T>[] {
    return this.dimensions;
  }

  isCartesian(): boolean {
    return !["pie", "calendar"].includes(this.chartType);
  }

  getStyleShowTitle(): boolean {
    return this.style.showTitle;
  }

  getStyleShowToolbox(): boolean {
    return this.style.showToolbox;
  }

  getStyleShowLegend(): boolean {
    if (["bar", "line"].includes(this.chartType)) {
      return (<StyleOptions<"bar">>this.style).showLegend;
    }
    return false;
  }

  getStyleOrientation(): OrientationType | undefined {
    if (this.chartType === "bar") {
      return (<StyleOptions<"bar">>{ ...this.style }).orientation;
    }
    return undefined;
  }

  getStyleBarStyle(): BarStyleType | undefined {
    if (this.chartType === "bar") {
      return (<StyleOptions<"bar">>{ ...this.style }).barStyle;
    }
    return undefined;
  }

  getStyleLineStyle(): LineStyleType | undefined {
    if (this.chartType === "line") {
      return (<StyleOptions<"line">>{ ...this.style }).lineStyle;
    }
    return undefined;
  }

  getStyleColorGrouping(): ColorGroupingType | undefined {
    if (["heatmap", "calendar"].includes(this.chartType)) {
      return (<StyleOptions<"heatmap">>this.style).colorGrouping;
    }
    return undefined;
  }

  setStyleOption(
    k: keyof StyleOptions<T>,
    v: StyleOptions<T>[typeof k]
  ): Chart<T> {
    this.style = <StyleOptions<T>>{ ...this.style, ...{ [k]: v } };
    return this;
  }

  addDimension(dim: Dimension<T>): Chart<T> {
    this.dimensions.push(dim);
    return this;
  }

  updateDimension(
    where: Predicate<Dimension<T>>,
    k: keyof Dimension<T>,
    v: Dimension<T>[typeof k]
  ): Chart<T> {
    const dim = this.dimensions.find((d) => where(d));
    if (!dim) {
      return this;
    }
    const ix = this.dimensions.indexOf(dim);
    this.dimensions[ix] = { ...this.dimensions[ix], ...{ [k]: v } };
    return this;
  }

  deleteDimension(where: Predicate<Dimension<T>>): Chart<T> {
    this.dimensions = this.dimensions.filter((d) => !where(d));
    return this;
  }

  addMetric(metric: Metric<T>): Chart<T> {
    this.metrics.push(metric);
    return this;
  }

  getMetrics(): Metric<T>[] {
    return this.metrics;
  }

  getMetric(where: Predicate<Metric<T>>): Metric<T> | undefined {
    return this.metrics.find((m) => where(m));
  }

  updateMetric(
    where: Predicate<Metric<T>>,
    k: keyof Metric<T>,
    v: Metric<T>[typeof k]
  ): Chart<T> {
    const metric = this.metrics.find((m) => where(m));
    if (!metric) {
      return this;
    }
    const ix = this.metrics.indexOf(metric);
    this.metrics[ix] = { ...this.metrics[ix], ...{ [k]: v } };
    return this;
  }

  deleteMetric(where: Predicate<Metric<T>>): Chart<T> {
    this.metrics = this.metrics.filter((m) => !where(m));
    return this;
  }
}
