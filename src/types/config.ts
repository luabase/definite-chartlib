import { ChartType } from "./enums";

export interface Column {
  index: number;
  type: ChartType | null;
  color: string | string[] | null;
}

export interface Axis {
  columns: Column[];
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
  xAxis: Axis[];
  yAxis: Axis[];
  zAxis?: Axis[];
}
