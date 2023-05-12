import { TextStyle } from "./elements";

export interface IShowable {
  show: boolean;
}

export interface IAdjustable {
  left?: string | number;
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
}

export interface IStylable {
  textStyle?: TextStyle;
}
