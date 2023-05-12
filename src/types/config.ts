import { ChartType } from "./enums";

export interface Column {
  index: number;
  type: ChartType | null;
  color: string | string[] | null;
}

interface Axis {
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
    stack?: boolean;
    smooth?: boolean;
    area?: boolean;
    orientation?: string;
  };
  xAxis: Axis[];
  yAxis: Axis[];
}
