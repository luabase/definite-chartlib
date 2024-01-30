import { IShowable, IStylable, DataValue } from "./abstract";
import { SplitLine } from "./elements";

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

interface Detail extends IShowable {
  fontSize: number;
  formatter?: (value: string | number) => string;
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
  radius?: string[] | string;
  areaStyle?: object;
  itemStyle?: object;
  symbolSize?: number | ((value: Array<number | string>) => number);
  calendarIndex?: number;
  coordinateSystem?: string;
  datasetIndex?: number;
  splitLine?: SplitLine;
  axisTick?: IShowable;
  axisLabel?: IShowable;
  pointer?: IShowable;
  title?: IShowable;
  detail?: Detail;
  data?: DataValue;
}
