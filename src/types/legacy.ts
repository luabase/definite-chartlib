import { ChartType, MetaType, OrientationType } from "./literals";

interface Column {
  index: number;
  type: ChartType | null;
  color: string | string[] | null;
  meta: MetaType;
}

interface Axis {
  columns: Column[];
}

export interface LegacyOptions<T extends ChartType> {
  renderer?: "canvas" | "svg";
  name: string;
  type: T;
  features: {
    title?: boolean;
    legend?: boolean;
    toolbox?: boolean;
    labels?: boolean;
    smooth?: boolean;
    area?: boolean;
    stack?: boolean;
    orientation?: OrientationType;
    piecewise?: boolean;
  };
  xAxis: Axis[];
  yAxis: Axis[];
  zAxis?: Axis[];
}
