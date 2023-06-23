import { IShowable } from "./abstract";

export interface TextStyle {
  color?: string;
  fontWeight?: "normal" | "bold";
  fontSize?: number;
}

interface LineStyle {
  width?: number;
  type?: string;
  color?: string;
}

export interface SplitLine extends IShowable {
  lineStyle?: LineStyle;
}
