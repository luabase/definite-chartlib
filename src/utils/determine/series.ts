import * as ec from "../../types/echarts";
import * as frame from "../frame";
import { Axis, ChartConfig, ChartType } from "../../types";
import { color, error } from "../../constants";

const getTypedAxes = (
  conf: ChartConfig
): { valAxis: Axis[]; catAxis1: Axis[]; catAxis2?: Axis[] } => {
  switch (conf.type) {
    case ChartType.BAR:
      return (conf.features.orientation ?? "vertical") === "vertical"
        ? { valAxis: conf.yAxis, catAxis1: conf.xAxis }
        : { valAxis: conf.xAxis, catAxis1: conf.yAxis };
    case ChartType.HEATMAP:
      if (conf.zAxis) {
        return {
          valAxis: conf.zAxis,
          catAxis1: conf.xAxis,
          catAxis2: conf.yAxis,
        };
      } else {
        throw error.Z_AXIS_NOT_FOUND;
      }
    default:
      return { valAxis: conf.yAxis, catAxis1: conf.xAxis };
  }
};

export const series = (conf: ChartConfig, dataset: ec.DataSet): ec.Series[] => {
  const series: ec.Series[] = [];
  const { valAxis, catAxis1, catAxis2 } = getTypedAxes(conf);
  valAxis.forEach((axis, index) => {
    axis.columns.forEach((col) => {
      const item: ec.Series = {
        type: col.type ?? conf.type,
        name: dataset.dimensions[col.index],
      };
      if (conf.features.labels ?? false) {
        item.label = { show: true };
      }
      switch (conf.type) {
        case ChartType.BAR:
          item.color = col.color ?? color.DARK_BLUE;
          if ((conf.features.orientation ?? "vertical") === "vertical") {
            item.yAxisIndex = index;
            item.encode = {
              x: dataset.dimensions[catAxis1[0].columns[0].index],
              y: dataset.dimensions[col.index],
            };
          } else {
            item.xAxisIndex = index;
            item.encode = {
              y: dataset.dimensions[catAxis1[0].columns[0].index],
              x: dataset.dimensions[col.index],
            };
          }
          if (conf.features.stack ?? false) {
            item.stack = "total";
          }
          break;
        case ChartType.LINE:
          item.color = col.color ?? color.DARK_BLUE;
          item.yAxisIndex = index;
          item.encode = {
            x: dataset.dimensions[catAxis1[0].columns[0].index],
            y: dataset.dimensions[col.index],
          };
          if (conf.features.area ?? false) {
            item.areaStyle = {};
          }
          if (conf.features.smooth ?? false) {
            item.smooth = true;
          }
          break;
        case ChartType.PIE:
          item.color = col.color ?? color.LIME_PALETTE;
          item.encode = { itemName: "", value: "" };
          item.encode.itemName =
            dataset.dimensions[catAxis1[0].columns[0].index];
          item.encode.value = dataset.dimensions[col.index];
          item.textStyle = { color: color.ZINC_500 };
          item.label = { show: true, color: color.ZINC_500 };
          item.radius = ["40%", "70%"];
          item.itemStyle = {
            borderRadius: 10,
            borderColor: color.ZINC_900,
            borderWidth: 2,
          };
          break;
        case ChartType.SCATTER:
          item.color = col.color ?? color.DARK_BLUE;
          item.yAxisIndex = index;
          item.encode = {
            x: dataset.dimensions[catAxis1[0].columns[0].index],
            y: dataset.dimensions[col.index],
          };
          item.symbolSize = 15;
          break;
        case ChartType.HEATMAP:
          if (!catAxis2) {
            throw error.Z_AXIS_NOT_FOUND;
          }
          item.encode = {
            x: dataset.dimensions[catAxis1[0].columns[0].index],
            y: dataset.dimensions[catAxis2[0].columns[0].index],
            value: dataset.dimensions[col.index],
          };
          break;
        case ChartType.CALENDAR: {
          const transposed = frame.transpose(dataset.source);
          const years = Array.from(
            new Set(
              transposed[0]
                .map((t) => new Date(String(t)))
                .map((d) => d.getUTCFullYear())
                .sort()
            )
          );
          years.forEach((_, i) => {
            const itemCopy = { ...item };
            itemCopy.type = ChartType.HEATMAP;
            itemCopy.calendarIndex = i;
            itemCopy.coordinateSystem = "calendar";
            series.push(itemCopy);
          });
        }
      }
      if (conf.type !== ChartType.CALENDAR) {
        series.push(item);
      }
    });
  });
  return series;
};
