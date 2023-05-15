import { IShowable } from "./abstract";
import { TextStyle } from "./elements";

interface LineStyle {
  width?: number;
  type?: string;
  color?: string;
}

interface SplitLine extends IShowable {
  lineStyle?: LineStyle;
}

interface AxisLabel {
  interval: number;
  rotate: number;
  overflow?: string;
}

export default interface Axis extends IShowable {
  type: "value" | "category";
  name: string;
  nameLocation?: "start" | "center" | "end";
  nameTextStyle?: TextStyle;
  nameGap?: number;
  splitLine?: SplitLine;
  axisLabel?: AxisLabel;
}
