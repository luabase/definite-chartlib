import {
  ChartType,
  DataType,
  AggregationType,
  AxisType,
  OrientationType,
  BarStyleType,
  ValueStyleType,
  LineStyleType,
  ColorGroupingType,
  HeatmapGradientType,
  MetaType,
} from "./literals";

interface Indexable {
  index: number;
}

interface Identifiable {
  id?: number | string;
}

interface Formattable {
  format?: "percent" | "currency" | "number";
}

interface OptionalNumberRange {
  min?: number;
  max?: number;
}

type ChartSpecificDimension<T extends ChartType> = T extends "calendar"
  ? { dataType: Exclude<DataType, "value"> }
  : { dataType: Exclude<DataType, "value"> };

export type Dimension<T extends ChartType> = Identifiable &
  Indexable &
  ChartSpecificDimension<T> &
  Formattable;

type ChartSpecificMetric<T extends ChartType> = T extends "bar"
  ? {
      chartType?: "bar" | "line";
      axis?: AxisType;
      aggregation: Exclude<AggregationType, "none">;
    }
  : T extends "line"
  ? {
      chartType?: "line" | "bar";
      axis?: AxisType;
      aggregation: Exclude<AggregationType, "none">;
    }
  : T extends "pie"
  ? {
      chartType?: "pie";
      aggregation: Exclude<AggregationType, "none" | "min" | "max">;
    }
  : T extends "scatter"
  ? { chartType?: "scatter"; aggregation: "none" }
  : T extends "heatmap"
  ? { chartType?: "heatmap"; aggregation: "none" }
  : T extends "calendar"
  ? { chartType?: "calendar"; aggregation: AggregationType }
  : T extends "kpi"
  ? { chartType?: "kpi"; aggregation: "none" }
  : {};

export type Metric<T extends ChartType> = Identifiable &
  Indexable &
  ChartSpecificMetric<T> & {
    aggregation?: AggregationType;
    color: string | string[];
    dataType?: "value";
    chartType?: string;
    meta?: MetaType;
  } & Formattable &
  OptionalNumberRange;

interface BaseStyleOptions {
  showTitle: boolean;
  showToolbox: boolean;
}

type ExtraStyleOptions<T extends ChartType> = T extends "bar"
  ? {
      showLegend: boolean;
      barStyle: BarStyleType;
      valueStyle: ValueStyleType;
      orientation: OrientationType;
      showAllAxisLabels: boolean;
    }
  : T extends "line"
  ? { showLegend: boolean; lineStyle: LineStyleType }
  : T extends "calendar"
  ? { colorGrouping: ColorGroupingType }
  : T extends "heatmap"
  ? {
      colorGradient: HeatmapGradientType;
      colorGrouping: ColorGroupingType;
      showValueInCell: boolean;
      showAllAxisLabels: boolean;
      inverseGradient: boolean;
    }
  : T extends "kpi"
  ? { showLongNumber: boolean }
  : {};

export type StyleOptions<T extends ChartType> = BaseStyleOptions &
  ExtraStyleOptions<T>;

export interface ChartOptions<T extends ChartType> {
  chartType: T;
  style: StyleOptions<T>;
  dimensions: Dimension<T>[];
  metrics: Metric<T>[];
}
