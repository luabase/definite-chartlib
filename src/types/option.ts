export enum ChartType {
  BAR = "bar",
  CALENDAR = "calendar",
  HEATMAP = "heatmap",
  LINE = "line",
  PIE = "pie",
  SCATTER = "scatter",
}

export enum DataType {
  CATEGORY = "category",
  DATETIME = "datetime",
  VALUE = "value",
}

export enum AggregationType {
  AVG = "avg",
  COUNT = "count",
  DISTINCT = "distinct",
  SUM = "sum",
  MIN = "min",
  MAX = "max",
  NONE = "none",
}

export enum AxisType {
  LEFT = "left",
  RIGHT = "right",
}

export enum OrientationType {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

interface ColumnChoice {
  index: number;
  dataType: DataType;
}

export type Dimension = ColumnChoice;

export interface Metric extends ColumnChoice {
  color: string | string[];
  aggregation: AggregationType;
  axis?: AxisType;
}

interface BaseStyleOptions {
  showTitle: boolean;
  showToolbox: boolean;
}

export interface BarChartStyleOptions extends BaseStyleOptions {
  showLegend: boolean;
  isStacked: boolean;
  orientation: OrientationType;
}

export interface HeatmapChartStyleOptions extends BaseStyleOptions {
  isPiecewise: boolean;
}

export type CalendarChartStyleOptions = HeatmapChartStyleOptions;

export interface LineChartStyleOptions extends BaseStyleOptions {
  showLegend: boolean;
  isSmooth: boolean;
  showArea: boolean;
}

export interface PieChartStyleOptions extends BaseStyleOptions {
  showLegend: boolean;
}

export type ScatterChartStyleOptions = BaseStyleOptions;

export interface ChartOptions {
  version: string;
  chartType: ChartType;
  dimensions: Dimension[];
  metrics: Metric[];
  style:
    | BarChartStyleOptions
    | CalendarChartStyleOptions
    | HeatmapChartStyleOptions
    | LineChartStyleOptions
    | PieChartStyleOptions
    | ScatterChartStyleOptions;
}
