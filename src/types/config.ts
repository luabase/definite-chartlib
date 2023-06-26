import { Value, FilterType, AggregateType, SortOrder } from "./alias";
import { ChartType } from "./enums";

export interface Column {
  index: number;
  type: ChartType | null;
  color: string | string[] | null;
}

export interface Axis {
  columns: Column[];
}

interface FilterTransform {
  index: number;
  type: FilterType;
  value: Value;
  parser?: "datetime";
}

interface AggregateTransform {
  index: number;
  type: AggregateType;
  groupBy: number;
}

interface SortTransform {
  index: number;
  order: SortOrder;
  parser?: "datetime";
}

export interface TFConfig {
  filter?: FilterTransform[];
  aggregate?: AggregateTransform[];
  sort?: SortTransform[];
}

export interface ChartConfig {
  renderer?: "canvas" | "svg";
  name: string;
  type: ChartType;
  features: {
    title?: boolean;
    legend?: boolean;
    toolbox?: boolean;
    labels?: boolean;
    smooth?: boolean;
    area?: boolean;
    stack?: boolean;
    orientation?: string;
    piecewise?: boolean;
  };
  transform?: TFConfig;
  xAxis: Axis[];
  yAxis: Axis[];
  zAxis?: Axis[];
}
