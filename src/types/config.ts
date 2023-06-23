import { Value } from "./alias";
import { ChartType } from "./enums";

export interface Column {
  index: number;
  type: ChartType | null;
  color: string | string[] | null;
}

export interface Axis {
  columns: Column[];
}

export interface Transforms {
  filters: {
    index: number;
    type: "<" | "<=" | ">" | ">=" | "=" | "!=";
    value: Value;
  }[];
  sorts: {
    index: number;
    order: "asc" | "desc";
    parser?: "time";
  }[];
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
  transforms?: Transforms;
  xAxis: Axis[];
  yAxis: Axis[];
  zAxis?: Axis[];
}
