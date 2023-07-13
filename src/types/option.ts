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

type ChartSpecificDimension<T extends ChartType> = T extends "calendar"
  ? { dataType: Exclude<DataType, "value"> }
  : { dataType: Exclude<DataType, "value"> };

export type Dimension<T extends ChartType> = Indexable &
  ChartSpecificDimension<T>;

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
  : { chartType?: "calendar"; aggregation: AggregationType };

export type Metric<T extends ChartType> = Indexable &
  ChartSpecificMetric<T> & {
    color: string | string[];
    dataType?: "value";
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
  ? { showLegend: boolean; lineStyle: LineStyleType }
  : T extends "calendar"
  ? { colorGrouping: ColorGroupingType }
  : T extends "heatmap"
  ? { colorGrouping: ColorGroupingType }
  : {};

export type StyleOptions<T extends ChartType> = BaseStyleOptions &
  ExtraStyleOptions<T>;

export interface ChartOptions<T extends ChartType> {
  chartType: T;
  style: StyleOptions<T>;
  dimensions: Dimension<T>[];
  metrics: Metric<T>[];
}
