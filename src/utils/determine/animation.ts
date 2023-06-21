import { ChartConfig } from "../../types";

export const animation = (conf: ChartConfig): boolean =>
  (conf.renderer ?? "canvas") === "canvas";
