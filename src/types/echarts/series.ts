import { IShowable, IStylable } from "./abstract";

interface Label extends IShowable {
  position?: "top" | "left" | "bottom" | "right";
  color?: string;
}

interface Encode {
  x?: string;
  y?: string;
  itemName?: string;
  value?: string;
  tooltip?: string[] | string;
}

export default interface Series extends IStylable {
  type: string;
  name?: string;
  encode?: Encode;
  color?: string | string[];
  xAxisIndex?: number;
  yAxisIndex?: number;
  label?: Label;
  stack?: string;
  smooth?: boolean;
  radius?: string[];
  areaStyle?: object;
  itemStyle?: object;
  symbolSize?: number;
  calendarIndex?: number;
  coordinateSystem?: string;
  datasetIndex?: number;
}
