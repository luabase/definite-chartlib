import {
  ChartType,
  DataType,
  AggregationType,
  AxisType,
  OrientationType,
  BarStyleType,
  LineStyleType,
  ColorGroupingType,
} from "./enums";

interface Indexable {
  index: number;
}

type ChartSpecificDimension<T extends ChartType> = T extends ChartType.LINE
  ? { dataType: DataType.DATETIME }
  : T extends ChartType.CALENDAR
  ? { dataType: DataType.DATETIME }
  : { dataType: Exclude<DataType, DataType.VALUE> };

export type Dimension<T extends ChartType> = Indexable &
  ChartSpecificDimension<T>;

type ChartSpecificMetric<T extends ChartType> = T extends ChartType.BAR
  ? { chartType?: ChartType.BAR | ChartType.LINE; axis?: AxisType }
  : T extends ChartType.LINE
  ? { chartType?: ChartType.LINE | ChartType.BAR; axis?: AxisType }
  : { chartType?: T };

export type Metric<T extends ChartType> = Indexable &
  ChartSpecificMetric<T> & {
    dataType: DataType.VALUE;
    color: string | string[];
    aggregation: AggregationType;
  };

interface BaseStyleOptions {
  showTitle: boolean;
  showToolbox: boolean;
}

type ExtraStyleOptions<T extends ChartType> = T extends ChartType.BAR
  ? {
      showLegend: boolean;
      barStyle: BarStyleType;
      orientation: OrientationType;
    }
  : T extends ChartType.LINE
  ? { showLegend: boolean; lineStyle: LineStyleType; showArea: boolean }
  : T extends ChartType.CALENDAR
  ? { colorGrouping: ColorGroupingType }
  : T extends ChartType.HEATMAP
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
