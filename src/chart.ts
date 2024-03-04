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
import * as utils from "./utils";
import { profile } from "./perf";
import { CompileChartError, InvalidChartError } from "./errors";

export class Chart<T extends ChartType> {
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
      case "pie": {
        const chart = new Chart("pie");
        chart.addDimension({
          index: opts.xAxis[0].columns[0].index,
          dataType: "category",
        });
        chart.addMetric({
          index: opts.yAxis[0].columns[0].index,
          color: opts.yAxis[0].columns[0].color ?? color.LIME_PALETTE,
          aggregation: "sum",
        });
        chart.setStyleOption("showTitle", opts.features.title ?? false);
        return chart;
      }
      case "scatter": {
        const chart = new Chart("scatter");
        [...opts.xAxis[0].columns, ...opts.yAxis[0].columns].forEach((col) => {
          chart.addMetric({
            index: col.index,
            color: col.color ?? color.LIME_200,
            aggregation: "none",
          });
        });
        chart.addDimension({ index: 0, dataType: "category" });
        chart.setStyleOption("showTitle", opts.features.title ?? false);
        return chart;
      }
      case "heatmap": {
        if (!opts.zAxis) throw new Error("zAxis not found");
        const chart = new Chart("heatmap");
        chart.addDimension({
          index: opts.xAxis[0].columns[0].index,
          dataType: "category",
        });
        chart.addDimension({
          index: opts.yAxis[0].columns[0].index,
          dataType: "category",
        });
        chart.addMetric({
          index: opts.zAxis[0].columns[0].index,
          color: opts.zAxis[0].columns[0].color ?? color.LIME_PALETTE,
          aggregation: "none",
        });
        chart.setStyleOption("showTitle", opts.features.title ?? false);
        chart.setStyleOption(
          "colorGrouping",
          opts.features.piecewise ?? false ? "piecewise" : "continuous"
        );
        return chart;
      }
      case "calendar": {
        const chart = new Chart("calendar");
        chart.addDimension({
          index: opts.xAxis[0].columns[0].index,
          dataType: "datetime",
        });
        chart.addMetric({
          index: opts.yAxis[0].columns[0].index,
          color: opts.yAxis[0].columns[0].color ?? color.LIME_PALETTE,
          aggregation: "sum",
        });
        chart.setStyleOption("showTitle", opts.features.title ?? false);
        chart.setStyleOption(
          "colorGrouping",
          opts.features.piecewise ?? false ? "piecewise" : "continuous"
        );
        return chart;
      }
      default:
        throw new Error(`Type ${opts.type} is not supported`);
    }
  }

  static defaultStyleOptions(
    chartType: ChartType
  ): StyleOptions<typeof chartType> {
    switch (chartType) {
      case "bar":
        return {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        };
      case "line":
        return {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        };
      case "pie":
      case "scatter":
        return {
          showTitle: false,
          showToolbox: false,
        };
      case "calendar":
      case "heatmap":
        return {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        };
      case "kpi":
        return {
          showTitle: true,
          showToolbox: false,
        };
      case "map":
        return {
          showTitle: true,
          showToolbox: false,
        };
    }
  }

  convertTo(to: ChartType, theme: string) {
    const from = this.chartType;
    if (to === from) return this;
    switch (to) {
      case "bar":
        return this.toBarChart();
      case "line":
        return this.toLineChart();
      case "pie":
        return this.toPieChart(theme);
      case "scatter":
        return this.toScatter();
      case "heatmap":
        return this.toHeatmap(theme);
      case "calendar":
        return this.toCalendar(theme);
      case "map":
        return this.toMap(theme);
      case "kpi":
        return this.toKpi(theme);
    }
  }

  private toBarChart(): Chart<"bar"> {
    const chart = new Chart("bar");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    chart.addDimension(this.dimensions[0]);
    this.metrics.forEach((metric) =>
      chart.addMetric({
        index: metric.index,
        color: utils.color.asSingleton(metric.color),
        aggregation: "sum",
        format: metric.format,
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
        color: utils.color.asSingleton(metric.color),
        aggregation: "sum",
        format: metric.format,
      });
    });
    return chart;
  }

  private toPieChart(theme: string): Chart<"pie"> {
    const chart = new Chart("pie");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    chart.addDimension(this.dimensions[0]);
    chart.addMetric({
      index: this.metrics[0].index,
      color: utils.color.asArray(this.metrics[0].color, theme),
      aggregation: "sum",
      format: this.metrics[0].format,
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
        color: utils.color.asSingleton(metric.color),
        aggregation: "none",
        format: metric.format,
      })
    );
    if (this.metrics.length < 2) {
      chart.addMetric({ ...chart.getMetrics()[0], id: 1 }); // re-add same metric
    }
    return chart;
  }

  private toHeatmap(theme: string): Chart<"heatmap"> {
    const chart = new Chart("heatmap");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    this.dimensions.slice(0, 2).forEach((dim) => {
      chart.addDimension(dim);
    });
    if (chart.canAddDimension()) {
      chart.addDimension({ ...chart.getDimensions()[0], id: 1 }); // re-add same dimension
    }
    chart.addMetric({
      index: this.metrics[0].index,
      color: utils.color.asArray(this.metrics[0].color, theme),
      aggregation: "none",
      format: this.metrics[0].format,
    });
    return chart;
  }

  private toCalendar(theme: string): Chart<"calendar"> {
    const chart = new Chart("calendar");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    const dim = this.dimensions.find((dim) => dim.dataType === "datetime");
    if (dim) {
      chart.addDimension({
        index: dim.index,
        dataType: "datetime",
        format: this.metrics[0].format,
      });
    } else {
      chart.addDimension({
        index: this.dimensions[0].index,
        dataType: "datetime",
        format: this.metrics[0].format,
      });
    }
    chart.addMetric({
      index: this.metrics[0].index,
      color: utils.color.asArray(this.metrics[0].color, theme),
      aggregation: "sum",
      format: this.metrics[0].format,
    });
    return chart;
  }

  private toMap(theme: string): Chart<"map"> {
    const chart = new Chart("map");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    chart.addDimension(this.dimensions[0]);
    chart.addMetric({
      index: this.metrics[0].index,
      color: utils.color.asArray(this.metrics[0].color, theme),
      aggregation: "sum",
      format: this.metrics[0].format,
    });
    return chart;
  }

  private toKpi(theme: string): Chart<"kpi"> {
    const chart = new Chart("kpi");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    chart.addMetric({
      index: this.metrics[0].index,
      color: utils.color.asArray(this.metrics[0].color, theme),
      aggregation: "none",
      format: this.metrics[0].format,
    });
    return chart;
  }

  private assertIsValid(): void {
    if (this.dimensions.length < 1 && this.chartType !== "kpi") {
      throw new InvalidChartError("Chart must have at least one dimension");
    }
    if (this.metrics.length < 1) {
      throw new InvalidChartError("Chart must have at least one metric");
    }
  }

  equals(other: Chart<T>): boolean {
    if (this.chartType !== other.chartType) return false;
    if (this.dimensions.length !== other.dimensions.length) return false;
    if (this.metrics.length !== other.metrics.length) return false;
    const dimsEqual = this.dimensions.every(
      (dim) =>
        !!other.getDimension(
          (otherDim) =>
            otherDim.index === dim.index && otherDim.dataType === dim.dataType
        )
    );
    if (!dimsEqual) return false;
    const metricsEqual = this.metrics.every(
      (metric) =>
        !!other.getMetric(
          (m) =>
            m.index === metric.index && m.aggregation === metric.aggregation
        )
    );
    if (!metricsEqual) return false;
    return true;
  }

  @profile
  compile(title: string, data: RowOriented, theme: string): echarts.ECOption {
    this.assertIsValid();
    if (data.length < 1) {
      throw new CompileChartError("Data must not be empty");
    }
    const df = new DataFrame(data);
    const datasets = determine.datasets(this, df);

    try {
      return {
        animation: true,
        backgroundColor: theme === "light" ? color.ZINC_100 : color.ZINC_900,
        calendar: determine.calendar(this, df, theme),
        dataset: datasets,
        grid: determine.grid(this, datasets),
        legend: determine.legend(this, theme),
        series: determine.series(this, datasets, theme),
        title: determine.title(this, title),
        toolbox: determine.toolbox(this),
        tooltip: determine.tooltip(this, theme),
        visualMap: determine.visualMap(this, datasets, theme),
        xAxis: determine.axis(this, datasets, "x", theme),
        yAxis: determine.axis(this, datasets, "y", theme),
      };
    } catch (e) {
      console.error(e);
      throw new CompileChartError("Failed to compile chart.");
    }
  }

  canAddDimension(): boolean {
    if (this.dimensions.length < 1) {
      return this.chartType !== "kpi";
    } else if (["bar", "line", "heatmap"].includes(this.chartType)) {
      return this.dimensions.length < 2 && this.metrics.length < 2;
    } else if (this.chartType === "scatter") {
      return this.dimensions.length < 2 && this.metrics.length <= 2;
    } else {
      return false;
    }
  }

  canAddMetric(): boolean {
    if (this.metrics.length < 1) {
      return true;
    } else if (["bar", "line"].includes(this.chartType)) {
      return this.dimensions.length < 2;
    } else if (this.chartType === "scatter") {
      return this.metrics.length < 3;
    } else {
      return false;
    }
  }

  canAddAxis(): boolean {
    if (!["bar", "line"].includes(this.chartType)) {
      return false;
    } else {
      return this.getAxisCount() < 2;
    }
  }

  getAxisCount(): number {
    if (!["bar", "line"].includes(this.chartType)) {
      return 1;
    } else {
      const axes = this.metrics.map(
        (m) => (m as Metric<"bar" | "line">).axis ?? "left"
      );
      return utils.array.removeDuplicates(axes).length;
    }
  }

  getGroupByDimension(): Dimension<T> | undefined {
    return this.dimensions[0];
  }

  getBreakdownDimension(): Dimension<T> | undefined {
    return ["bar", "line", "scatter"].includes(this.chartType)
      ? this.dimensions[1]
      : undefined;
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

  isCartesian(): boolean {
    return !["pie", "calendar", "map"].includes(this.chartType);
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
    if (!this.canAddDimension())
      throw new Error("Cannot add another dimension");
    if (dim.id === undefined) {
      dim.id = this.dimensions.length;
    }
    this.dimensions.push(dim);
    return this;
  }

  getDimensions(): Dimension<T>[] {
    return this.dimensions;
  }

  getDimension(where: Predicate<Dimension<T>>): Dimension<T> | undefined {
    return this.dimensions.find((dim) => where(dim));
  }

  setDimension(where: Predicate<Dimension<T>>, v: Dimension<T>): Chart<T> {
    const dim = this.dimensions.find((d) => where(d));
    if (!dim) {
      console.warn("Could not update dimension. Predicate returned 0 results");
      return this;
    }
    const ix = this.dimensions.indexOf(dim);
    this.dimensions[ix] = v;
    return this;
  }

  deleteDimension(where: Predicate<Dimension<T>>): Chart<T> {
    this.dimensions = this.dimensions.filter((d) => !where(d));
    return this;
  }

  addMetric(metric: Metric<T>): Chart<T> {
    if (!this.canAddMetric()) throw new Error("Cannot add another metric");
    if (metric.id === undefined) {
      metric.id = this.metrics.length;
    }
    this.metrics.push(metric);
    return this;
  }

  getMetrics(): Metric<T>[] {
    return this.metrics;
  }

  getMetric(where: Predicate<Metric<T>>): Metric<T> | undefined {
    return this.metrics.find((m) => where(m));
  }

  setMetric(where: Predicate<Metric<T>>, v: Metric<T>): Chart<T> {
    const metric = this.metrics.find((m) => where(m));
    if (!metric) {
      console.warn("Could not update metric. Predicate returned 0 results");
      return this;
    }
    const ix = this.metrics.indexOf(metric);
    this.metrics[ix] = v;
    return this;
  }

  deleteMetric(where: Predicate<Metric<T>>): Chart<T> {
    this.metrics = this.metrics.filter((m) => !where(m));
    return this;
  }
}
