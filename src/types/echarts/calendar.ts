import { IAdjustable } from "./abstract";
import { SplitLine } from "./elements";

export default interface Calendar extends IAdjustable {
  cellSize: (string | number)[];
  range: string;
  itemStyle: {
    color: string;
    borderColor: string;
    borderWidth: number;
  };
  orient: string;
  splitLine: SplitLine;
}
