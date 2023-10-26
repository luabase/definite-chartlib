import { IShowable, IStylable } from "./abstract";

interface CrossStyle {
  color: string;
}

interface AxisPointer {
  type: "line" | "cross" | "none";
  crossStyle: CrossStyle;
}

export default interface ToolTip extends IShowable, IStylable {
  backgroundColor?: string;
  borderColor?: string;
  confine?: boolean;
  trigger?: "item" | "axis" | "none";
  axisPointer?: AxisPointer;
  formatter?: string | ((params: any) => string);
}
