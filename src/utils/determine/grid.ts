import * as ec from "../../types/echarts";
import { ChartConfig, ChartType } from "../../types";

export const grid = (conf: ChartConfig, dataset: ec.DataSet): ec.Grid => {
  let grid: ec.Grid = { show: false, containLabel: false };
  if ((conf.renderer ?? "canvas") === "canvas") {
    grid = { ...grid, left: "12%", bottom: "12%", right: "9%" };
    if (conf.type === ChartType.BAR) {
      // handle bar
      const orientation = conf.features.orientation ?? "vertical";
      const isVertical = orientation === "vertical";
      const isLargeSet = dataset.source.length > 6;
      if (isVertical) {
        grid.bottom = isLargeSet ? "18%" : "12%";
      } else {
        grid.left = isLargeSet ? "15%" : "18%";
      }
    } else if (conf.type === ChartType.HEATMAP && (conf.features.piecewise ?? false)) {
      // handle heatmap
      grid.right = "15%";
    }
  }
  return grid;
};
