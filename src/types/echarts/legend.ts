import { IShowable, IAdjustable, IStylable } from "./abstract";

export default interface Legend extends IShowable, IAdjustable, IStylable {
  type?: "plain" | "scroll";
}
