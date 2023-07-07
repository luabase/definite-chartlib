import {
  BarStyleType,
  ChartOptions,
  ChartType,
  ColorGroupingType,
  Dimension,
  LineStyleType,
  Metric,
  OrientationType,
  Predicate,
  RowOriented,
  StyleOptions,
  echarts,
} from "./types";
import { LegacyOptions } from "./types/legacy";
import { DataFrame } from "./dataframe";
import { color } from "./constants";
import * as determine from "./determine";

export default class Chart<T extends ChartType> {
  private chartType: T;
  private style: StyleOptions<T>;
  private dimensions: Dimension<T>[];
  private metrics: Metric<T>[];

  constructor(chartType: T) {
    this.chartType = chartType;
    this.style = <StyleOptions<T>>Chart.defaultStyleOptions(this.chartType);
    this.dimensions = [];
    this.metrics = [];
  }

  static load<T extends ChartType>(opts: ChartOptions<T>): Chart<T> {
    const manager = new Chart(opts.chartType);
    manager.style = { ...manager.style, ...opts.style };
    opts.dimensions.forEach((d) => manager.addDimension(d));
    opts.metrics.forEach((m) => manager.addMetric(m));
    return manager;
  }

  static fromLegacy<T extends ChartType>(opts: LegacyOptions<T>) {
    switch (opts.type) {
      case "bar": {
        const chart = new Chart("bar");
        const orientation = opts.features.orientation ?? "vertical";
        const dims =
          orientation === "vertical"
            ? opts.xAxis[0].columns
            : opts.yAxis[0].columns;
        const metrics =
          orientation === "vertical"
            ? opts.yAxis[0].columns
            : opts.xAxis[0].columns;
        dims.forEach((col) =>
          chart.addDimension({ index: col.index, dataType: "category" })
        );
        metrics.forEach((col) =>
          chart.addMetric({
            index: col.index,
            color: col.color ?? color.LIME_200,
            chartType: col.type === "line" ? "line" : "bar",
            aggregation: "sum",
          })
        );
        chart.setStyleOption("showTitle", opts.features.title ?? false);
        chart.setStyleOption("showLegend", opts.features.legend ?? false);
        chart.setStyleOption(
          "barStyle",
          opts.features.stack ?? false ? "stacked" : "grouped"
        );
        chart.setStyleOption(
          "orientation",
          orientation === "vertical" ? "vertical" : "horizontal"
        );
        return chart;
      }
      case "line": {
        const chart = new Chart("line");
        opts.xAxis[0].columns.forEach((col) =>
          chart.addDimension({ index: col.index, dataType: "category" })
        );
        opts.yAxis[0].columns.forEach((col) =>
          chart.addMetric({
            index: col.index,
            color: col.color ?? color.LIME_200,
            chartType: col.type === "line" ? "line" : "bar",
            aggregation: "sum",
          })
        );
        chart.setStyleOption("showTitle", opts.features.title ?? false);
        chart.setStyleOption("showLegend", opts.features.legend ?? false);
        chart.setStyleOption(
          "lineStyle",
          opts.features.area ?? false ? "area" : "point"
        );
        return chart;
      }
      default:
        return new Chart(opts.type);
    }
  }

  static defaultStyleOptions(
    chartType: ChartType
  ): StyleOptions<typeof chartType> {
    switch (chartType) {
      case "bar":
        return {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        };
      case "line":
        return {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        };
      case "pie":
      case "scatter":
        return {
          showTitle: true,
          showToolbox: false,
        };
      case "calendar":
      case "heatmap":
        return {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        };
    }
  }

  convert(to: ChartType) {
    const from = this.chartType;
    if (to === from) return this;
    switch (to) {
      case "bar":
        return this.toBarChart();
      case "line":
        return this.toLineChart();
      case "pie":
        return this.toPieChart();
      case "scatter":
        return this.toScatter();
      case "heatmap":
        return this.toHeatmap();
      case "calendar":
        return this.toCalendar();
    }
  }

  private toBarChart(): Chart<"bar"> {
    const chart = new Chart("bar");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    chart.addDimension(this.dimensions[0]);
    this.metrics.forEach((metric) =>
      chart.addMetric({
        index: metric.index,
        color: metric.color,
        aggregation: "sum",
      })
    );
    return chart;
  }

  private toLineChart(): Chart<"line"> {
    const chart = new Chart("line");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    chart.addDimension(this.dimensions[0]);
    this.metrics.forEach((metric) => {
      chart.addMetric({
        index: metric.index,
        color: metric.color,
        aggregation: "sum",
      });
    });
    return chart;
  }

  private toPieChart(): Chart<"pie"> {
    const chart = new Chart("pie");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    chart.addDimension(this.dimensions[0]);
    chart.addMetric({
      index: this.metrics[0].index,
      color: this.metrics[0].color,
      aggregation: "sum",
    });
    return chart;
  }

  private toScatter(): Chart<"scatter"> {
    const chart = new Chart("scatter");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    chart.addDimension(this.dimensions[0]);
    this.metrics.slice(0, 2).forEach((metric) =>
      chart.addMetric({
        index: metric.index,
        color: metric.color,
        aggregation: "none",
      })
    );
    if (chart.getMetrics().length < 2) {
      chart.addMetric(chart.getMetrics()[0]); // re-add same metric
    }
    return chart;
  }

  private toHeatmap(): Chart<"heatmap"> {
    const chart = new Chart("heatmap");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    this.dimensions.slice(0, 2).forEach((dim) => {
      chart.addDimension(dim);
    });
    if (chart.getDimensions().length < 2) {
      chart.addDimension(chart.getDimensions()[0]); // re-add same dimension
    }
    chart.addMetric({
      index: this.metrics[0].index,
      color: this.metrics[0].color,
      aggregation: "none",
    });
    return chart;
  }

  private toCalendar(): Chart<"calendar"> {
    const chart = new Chart("calendar");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    const dim = this.dimensions.find((dim) => dim.dataType === "datetime");
    if (dim) {
      chart.addDimension({
        index: dim.index,
        dataType: "datetime",
      });
    } else {
      chart.addDimension({
        index: this.dimensions[0].index,
        dataType: "datetime",
      });
    }
    chart.addMetric({
      index: this.metrics[0].index,
      color: this.metrics[0].color,
      aggregation: "sum",
    });
    return chart;
  }

  compile(title: string, data: RowOriented): echarts.ECOption {
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
      visualMap: determine.visualMap(this, datasets),
      xAxis: determine.axis(this, df, datasets, "x"),
      yAxis: determine.axis(this, df, datasets, "y"),
    };
  }

  canAddDimension(): boolean {
    return ["bar", "line"].includes(this.chartType)
      ? this.dimensions.length < 2 && this.metrics.length < 2
      : false;
  }

  canAddMetric(): boolean {
    return ["bar", "line"].includes(this.chartType)
      ? this.dimensions.length < 2
      : false;
  }

  canAddAxis(): boolean {
    // FIXME
    throw new Error("Not implemented");
  }

  getGroupByDimension(): Dimension<T> | undefined {
    return this.dimensions[0];
  }

  getBreakdownDimension(): Dimension<T> | undefined {
    if (["bar", "line"].includes(this.chartType)) {
      return this.dimensions[1];
    } else if (this.chartType === "scatter") {
      return this.dimensions[1];
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
    } else if (this.chartType === "scatter" && this.getBreakdownDimension()) {
      return true;
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
