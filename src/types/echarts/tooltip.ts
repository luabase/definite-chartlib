import { IShowable } from "./abstract";

interface CrossStyle {
  color: string;
}

interface AxisPointer {
  type: "line" | "cross" | "none";
  crossStyle: CrossStyle;
}

export default interface ToolTip extends IShowable {
  trigger?: "item" | "axis" | "none";
  axisPointer?: AxisPointer;
  formatter?: string | ((params: any) => string);
}
