import { IShowable, IAdjustable, IStylable } from "./abstract";

export default interface Title extends IShowable, IAdjustable, IStylable {
  text: string;
}
