import { IAdjustable, IShowable } from "./abstract";

export default interface Grid extends IAdjustable, IShowable {
  containLabel: boolean;
}
