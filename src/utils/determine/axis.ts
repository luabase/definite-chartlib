import * as ec from "../../types/echarts";
import * as format from "../format";
import { Axis, ChartConfig, ChartType } from "../../types";
import { color, error } from "../../constants";

const getTargetAxes = (conf: ChartConfig, type: "x" | "y" | "z"): Axis[] => {
  switch (type) {
    case "x":
      return conf.xAxis;
    case "y":
      return conf.yAxis;
    case "z":
      if (conf.zAxis) {
        return conf.zAxis;
      } else {
        throw error.Z_AXIS_NOT_FOUND;
      }
  }
};

const getDataType = (
  conf: ChartConfig,
  axisType: "x" | "y" | "z"
): "category" | "value" => {
  switch (conf.type) {
    case ChartType.PIE:
    case ChartType.LINE:
      return axisType === "x" ? "category" : "value";
    case ChartType.SCATTER:
      return "value";
    case ChartType.HEATMAP:
      return "category";
    case ChartType.BAR:
      switch (conf.features.orientation ?? "vertical") {
        case "vertical":
          return axisType === "x" ? "category" : "value";
        case "horizontal":
          return axisType === "x" ? "value" : "category";
        default:
          return "category";
      }
    default:
      return "category";
  }
};

export const axis = (
  conf: ChartConfig,
  dataset: ec.DataSet,
  axisType: "x" | "y" | "z"
): ec.Axis[] => {
  const axes: ec.Axis[] = [];
  const targetAxes = getTargetAxes(conf, axisType);
  targetAxes.forEach((ax) => {
    if (ax.columns.length > 0) {
      const type = getDataType(conf, axisType);
      let name = ax.columns
        .map((col) => dataset.dimensions[col.index])
        .join(", ");
      name = name.length > 45 ? name.slice(0, 45) + "..." : name;
      const item: ec.Axis = {
        show: ![ChartType.PIE, ChartType.CALENDAR].includes(conf.type),
        type: type,
        name: name,
        nameLocation: "center",
        nameGap: axisType === "x" ? 30 : 50,
        nameTextStyle: {
          fontSize: 14,
        },
      };
      if (axisType === "y" || conf.type === ChartType.SCATTER) {
        item.splitLine = {
          show: true,
          lineStyle: { width: 1, type: "dashed", color: color.ZINC_800 },
        };
      }
      if (type === "value") {
        item.axisLabel = { formatter: format.numericalValues };
      }
      // handle orientation transformation for bar charts
      if (conf.type === ChartType.BAR) {
        const orientation = conf.features.orientation ?? "vertical";
        const isLargeSet = dataset.source.length > 6;
        switch (axisType) {
          case "x":
            if (orientation === "vertical") {
              item.axisLabel = {
                interval: Math.floor((dataset.source.length - 1) / 10),
                rotate: isLargeSet ? 30 : 0,
                formatter: format.categoricalValues,
              };
              item.nameGap = isLargeSet ? 55 : 30;
            }
            break;
          case "y":
            if (orientation === "horizontal") {
              item.axisLabel = {
                interval: Math.floor((dataset.source.length - 1) / 10),
                rotate: isLargeSet ? 30 : 0,
                formatter: format.categoricalValues,
              };
              item.nameGap = isLargeSet ? 70 : 85;
            }
            break;
        }
      }
      axes.push(item);
    }
  });
  return axes;
};
