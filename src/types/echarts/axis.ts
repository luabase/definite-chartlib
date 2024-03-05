import { IShowable } from "./abstract";
import { TextStyle, SplitLine } from "./elements";

interface AxisLabel {
  interval?: number;
  rotate?: number;
  formatter?: (value: string | number) => string;
  color?: string;
}

interface AxisLine {
  lineStyle?: LineStyle;
  color?: string;
}

interface LineStyle {
  color: string;
}

export default interface Axis extends IShowable {
  type: "value" | "category";
  name: string;
  nameGap: number;
  nameLocation?: "start" | "center" | "end";
  nameTextStyle?: TextStyle;
  splitLine?: SplitLine;
  axisLabel?: AxisLabel;
  axisLine?: AxisLine;
  min?: number;
  max?: number;
}
