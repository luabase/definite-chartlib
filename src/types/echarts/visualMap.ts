import { IAdjustable } from "./abstract";

export default interface VisualMap extends IAdjustable {
  min: number;
  max: number;
  type: string;
  calculable: boolean;
  orient: "horizontal" | "vertical";
  inRange: {
    color: string[];
  };
}
