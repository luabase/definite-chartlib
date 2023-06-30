import {
  ChartType,
  DataType,
  AggregationType,
  AxisType,
  OrientationType,
  BarStyleType,
  LineStyleType,
  ColorGroupingType,
} from "./literals";

interface Indexable {
  index: number;
}

type ChartSpecificDimension<T extends ChartType> = T extends "line"
  ? { dataType: "datetime" }
  : T extends "calendar"
  ? { dataType: "datetime" }
  : { dataType: Exclude<DataType, "value"> };

export type Dimension<T extends ChartType> = Indexable &
  ChartSpecificDimension<T>;

type ChartSpecificMetric<T extends ChartType> = T extends "bar"
  ? { chartType?: "bar" | "line"; axis?: AxisType }
  : T extends "line"
  ? { chartType?: "line" | "bar"; axis?: AxisType }
  : { chartType?: T };

export type Metric<T extends ChartType> = Indexable &
  ChartSpecificMetric<T> & {
    dataType: "value";
    color: string | string[];
    aggregation: AggregationType;
  };

interface BaseStyleOptions {
  showTitle: boolean;
  showToolbox: boolean;
}

type ExtraStyleOptions<T extends ChartType> = T extends "bar"
  ? {
      showLegend: boolean;
      barStyle: BarStyleType;
      orientation: OrientationType;
    }
  : T extends "line"
  ? { showLegend: boolean; lineStyle: LineStyleType; showArea: boolean }
  : T extends "calendar"
  ? { colorGrouping: ColorGroupingType }
  : T extends "heatmap"
  ? { colorGrouping: ColorGroupingType }
  : {};

export type StyleOptions<T extends ChartType> = BaseStyleOptions &
  ExtraStyleOptions<T>;

export interface ChartConfigOptions<T extends ChartType> {
  chartType: T;
  style: StyleOptions<T>;
  dimensions: Dimension<T>[];
  metrics: Metric<T>[];
}
