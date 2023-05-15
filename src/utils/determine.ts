import * as ec from "../types/echarts";
import { color } from "../constants";
import { ChartConfig, ChartType } from "../types";

export const renderer = (v: string | undefined): string => {
  return v ?? "canvas";
};

export const title = (conf: ChartConfig): ec.Title => {
  const title: ec.Title = {
    show: conf.features.title ?? false,
    text: conf.name,
    left: "auto",
  };
  if ((conf.renderer ?? "canvas") === "svg") {
    title.top = 10;
    title.left = 10;
  }
  return title;
};

export const legend = (conf: ChartConfig): ec.Legend => {
  const legend: ec.Legend = {
    show: conf.features.legend ?? false,
    type: "scroll",
    left: "center",
  };
  if ((conf.renderer ?? "canvas") === "svg") {
    legend.top = 10;
  }
  return legend;
};

export const grid = (conf: ChartConfig): ec.Grid => {
  if ((conf.renderer ?? "canvas") === "canvas") {
    return { show: false, containLabel: false, bottom: 50, left: 50 };
  } else {
    return { show: false, containLabel: false };
  }
};

const getDataType = (
  conf: ChartConfig,
  direction: "vertical" | "horizontal"
): "category" | "value" => {
  switch (conf.type) {
    case ChartType.PIE:
      return direction === "horizontal" ? "category" : "value";
    case ChartType.LINE:
      return direction === "horizontal" ? "category" : "value";
    case ChartType.SCATTER:
      return "value";
    case ChartType.BAR:
      switch (conf.features.orientation ?? "vertical") {
        case "vertical":
          return direction === "horizontal" ? "category" : "value";
        case "horizontal":
          return direction === "horizontal" ? "value" : "category";
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
  direction: "horizontal" | "vertical"
): ec.Axis[] => {
  const axes: ec.Axis[] = [];
  const confAxes = direction === "vertical" ? conf.yAxis : conf.xAxis;
  confAxes.forEach((ax) => {
    if (ax.columns.length >= 1) {
      // NOTE: assumes all column in axis have same type
      const type = getDataType(conf, direction);
      const name = ax.columns
        .map((col) => dataset.dimensions[col.index])
        .join(", ");
      const item: ec.Axis = {
        show: conf.type !== ChartType.PIE,
        type: type,
        name: name,
        nameLocation: "center",
        nameGap: 50,
        nameTextStyle: {
          fontSize: 14,
        },
      };
      if (direction === "vertical" || conf.type === ChartType.SCATTER) {
        item.splitLine = {
          show: true,
          lineStyle: { width: 1, type: "dashed", color: color.ZINC_800 },
        };
      }
      // show all axis ticks for bar charts
      if (conf.type === "bar" && direction === "horizontal") {
        item.axisLabel = {
          interval: 0,
          rotate: dataset.source.length > 6 ? 30 : 0,
        };
        item.nameGap = dataset.source.length > 6 ? 81 : 50;
      }
      axes.push(item);
    }
  });
  return axes;
};

const addFeaturesForSeries = (
  conf: ChartConfig,
  series: ec.Series
): ec.Series => {
  if (conf.features.labels ?? false) {
    series.label = { show: true };
  }
  if (conf.features.stack ?? false) {
    series.stack = "total";
  }
  if (conf.features.area ?? false) {
    series.areaStyle = {};
  }
  if (conf.features.smooth ?? false) {
    series.smooth = true;
  }
  if (conf.type === ChartType.PIE) {
    series.radius = ["40%", "70%"];
    series.itemStyle = {
      borderRadius: 10,
      borderColor: color.ZINC_900,
      borderWidth: 2,
    };
  }
  if (conf.type === ChartType.SCATTER) {
    series.symbolSize = 15;
  }
  return series;
};

export const series = (conf: ChartConfig, dataset: ec.DataSet): ec.Series[] => {
  let series: ec.Series[] = [];
  const orientation = conf.features.orientation ?? "vertical";
  const { catAxis, valAxis } =
    orientation === "vertical"
      ? { catAxis: conf.xAxis, valAxis: conf.yAxis }
      : { catAxis: conf.yAxis, valAxis: conf.xAxis };

  valAxis.forEach((axis, index) => {
    axis.columns.forEach((col) => {
      const item: ec.Series = {
        type: col.type ?? conf.type,
        name: dataset.dimensions[col.index],
        color: col.color ?? color.DARK_BLUE,
      };
      if (conf.type === ChartType.PIE) {
        item.encode = { itemName: "", value: "" };
        item.encode.itemName = dataset.dimensions[catAxis[0].columns[0].index];
        item.encode.value = dataset.dimensions[col.index];
        item.textStyle = { color: color.ZINC_500 };
        item.label = { show: true, color: color.ZINC_500 };
      } else {
        item.encode = { x: "", y: "" };
        if (orientation === "vertical") {
          item.yAxisIndex = index;
          item.encode.x = dataset.dimensions[catAxis[0].columns[0].index];
          item.encode.y = dataset.dimensions[col.index];
        } else {
          item.xAxisIndex = index;
          item.encode.y = dataset.dimensions[catAxis[0].columns[0].index];
          item.encode.x = dataset.dimensions[col.index];
        }
      }
      series.push(item);
    });
  });
  series = series.map((s) => addFeaturesForSeries(conf, s));
  return series;
};

export const animation = (conf: ChartConfig): boolean => {
  return (conf.renderer ?? "canvas") === "canvas";
};

export const tooltip = (conf: ChartConfig): ec.ToolTip => {
  if (conf.type !== ChartType.PIE) {
    return {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999999",
        },
      },
    };
  } else {
    return {
      show: true,
      trigger: "item",
    };
  }
};

export const toolbox = (conf: ChartConfig): ec.ToolBox => {
  if (
    (conf.renderer ?? "canvas") === "canvas" &&
    (conf.features.toolbox ?? false)
  ) {
    return {
      show: true,
      feature: {
        saveAsImage: {
          show: true,
          type: "png",
        },
        dataView: {
          show: true,
          readOnly: true,
        },
      },
    };
  } else {
    return {
      show: false,
    };
  }
};
