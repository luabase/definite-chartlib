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
  } else {
    title.top = "2%";
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
  } else {
    legend.top = "2%";
  }
  return legend;
};

export const grid = (conf: ChartConfig, dataset: ec.DataSet): ec.Grid => {
  let grid: ec.Grid = { show: false, containLabel: false };
  if ((conf.renderer ?? "canvas") === "canvas") {
    grid = { ...grid, left: "12%", bottom: "12%", right: "9%" };
    if (conf.type === ChartType.BAR) {
      const orientation = conf.features.orientation ?? "vertical";
      const isVertical = orientation === "vertical"
      const isLargeSet = dataset.source.length > 6
      if (isVertical) {
        grid.bottom = isLargeSet ? "18%" : "12%";
      } else {
        grid.left = isLargeSet ? "15%" : "18%";
      }
    }
  }
  return grid;
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
  const targetAxes = direction === "vertical" ? conf.yAxis : conf.xAxis;
  targetAxes.forEach((ax) => {
    if (ax.columns.length >= 1) {
      const type = getDataType(conf, direction);
      let name = ax.columns
        .map((col) => dataset.dimensions[col.index])
        .join(", ");
      name = name.length > 45 ? name.slice(0, 45) + "..." : name;
      const item: ec.Axis = {
        show: conf.type !== ChartType.PIE,
        type: type,
        name: name,
        nameLocation: "center",
        nameGap: direction === "horizontal" ? 30 : 50,
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
      // handle orientation transformation for bar charts
      if (conf.type === "bar") {
        const orientation = conf.features.orientation ?? "vertical";
        const isVertical = orientation === "vertical";
        const isLargeSet = dataset.source.length > 6;
        switch (direction) {
          case "horizontal": // x-axis
            if (isVertical) {
              item.axisLabel = {
                interval: 0,
                rotate: isLargeSet ? 30 : 0,
              };
              item.nameGap = isLargeSet ? 55 : 30;
            }
            break;
          case "vertical": // y-axis
            if (!isVertical) {
              item.axisLabel = {
                interval: 0,
                rotate: isLargeSet ? 30 : 0,
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
