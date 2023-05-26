var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/main.ts
var main_exports = {};
__export(main_exports, {
  ecOptionFromBlockResult: () => ecOptionFromBlockResult,
  ecOptionFromDataset: () => ecOptionFromDataset
});

// src/constants/color.ts
var color_exports = {};
__export(color_exports, {
  COLOR_PALETTE: () => COLOR_PALETTE,
  DARK_BLUE: () => DARK_BLUE,
  DARK_PURPLE: () => DARK_PURPLE,
  LIGHT_PINK: () => LIGHT_PINK,
  LIME_100: () => LIME_100,
  LIME_200: () => LIME_200,
  LIME_300: () => LIME_300,
  LIME_400: () => LIME_400,
  LIME_50: () => LIME_50,
  LIME_500: () => LIME_500,
  LIME_600: () => LIME_600,
  LIME_700: () => LIME_700,
  LIME_800: () => LIME_800,
  LIME_900: () => LIME_900,
  LIME_PALETTE: () => LIME_PALETTE,
  ORANGE: () => ORANGE,
  PINK: () => PINK,
  PURPLE: () => PURPLE,
  TEAL: () => TEAL,
  YELLOW: () => YELLOW,
  ZINC_500: () => ZINC_500,
  ZINC_800: () => ZINC_800,
  ZINC_900: () => ZINC_900
});
var LIME_50 = "#f7fee7";
var LIME_100 = "#ecfccb";
var LIME_200 = "#d9f99d";
var LIME_300 = "#bef264";
var LIME_400 = "#a3e635";
var LIME_500 = "#84cc16";
var LIME_600 = "#65a30d";
var LIME_700 = "#4d7c0f";
var LIME_800 = "#3f6212";
var LIME_900 = "#365314";
var ZINC_500 = "#71717a";
var ZINC_800 = "#27272a";
var ZINC_900 = "#18181b";
var TEAL = "#003f5c";
var DARK_BLUE = "#2f4b7c";
var DARK_PURPLE = "#665191";
var PURPLE = "#a05195";
var PINK = "#d45087";
var LIGHT_PINK = "#f95d6a";
var ORANGE = "#ff7c43";
var YELLOW = "#ffa600";
var LIME_PALETTE = [
  LIME_50,
  LIME_100,
  LIME_200,
  LIME_300,
  LIME_400,
  LIME_500,
  LIME_600,
  LIME_700,
  LIME_800,
  LIME_900
];
var COLOR_PALETTE = [
  TEAL,
  DARK_BLUE,
  DARK_PURPLE,
  PURPLE,
  PINK,
  LIGHT_PINK,
  ORANGE,
  YELLOW
];

// src/utils/dataset.ts
var dataset_exports = {};
__export(dataset_exports, {
  fromBlockResult: () => fromBlockResult
});

// src/utils/frame.ts
var frame_exports = {};
__export(frame_exports, {
  formatValues: () => formatValues,
  transpose: () => transpose
});

// src/utils/datetime.ts
var datetime_exports = {};
__export(datetime_exports, {
  isStartOrEndOfMonth: () => isStartOrEndOfMonth,
  isStartOrEndOfQuarter: () => isStartOrEndOfQuarter,
  isStartOrEndOfYear: () => isStartOrEndOfYear,
  strftime: () => strftime,
  toDateUTC: () => toDateUTC
});
var isDate = (v) => {
  if (v instanceof Date)
    return true;
  if (typeof v === "number") {
    if (v >= 1970 && v <= 9999) {
      return true;
    }
  }
  if (typeof v === "string") {
    if (!isNaN(Date.parse(v)) && v.length >= 4 && v.length <= 10) {
      return true;
    }
  }
  return false;
};
var getQuarter = (d) => {
  if (d.getUTCMonth() + 1 < 4)
    return 1;
  if (d.getUTCMonth() + 1 < 7)
    return 2;
  if (d.getUTCMonth() + 1 < 10)
    return 3;
  return 4;
};
var toDateUTC = (v) => {
  const date = v instanceof Date ? v : new Date(Date.parse(String(v)));
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  );
};
var isStartOrEndOfYear = (v) => {
  if (!isDate(v))
    return false;
  const date = toDateUTC(v);
  if (date.getUTCMonth() === 0 && date.getUTCDate() === 1 || date.getUTCMonth() === 11 && date.getUTCDate() === 31) {
    return true;
  }
  return false;
};
var isStartOrEndOfQuarter = (v) => {
  if (!isDate(v))
    return false;
  const date = toDateUTC(v);
  if (date.getUTCMonth() + 1 === 1 && date.getUTCDate() === 1 || // Jan 1
  date.getUTCMonth() + 1 === 3 && date.getUTCDate() === 31 || // Mar 31
  date.getUTCMonth() + 1 === 4 && date.getUTCDate() === 1 || // Apr 1
  date.getUTCMonth() + 1 === 6 && date.getUTCDate() === 30 || // Jun 30
  date.getUTCMonth() + 1 === 7 && date.getUTCDate() === 1 || // Jul 1
  date.getUTCMonth() + 1 === 9 && date.getUTCDate() === 30 || // Sep 30
  date.getUTCMonth() + 1 === 10 && date.getUTCDate() === 1 || // Oct 1
  date.getUTCMonth() + 1 === 12 && date.getUTCDate() === 31) {
    return true;
  }
  return false;
};
var isStartOrEndOfMonth = (v) => {
  if (!isDate(v))
    return false;
  const date = toDateUTC(v);
  if ([1, 3, 5, 7, 8, 10, 12].includes(date.getUTCMonth() + 1) && [1, 31].includes(date.getUTCDate()) || [4, 6, 9, 11].includes(date.getUTCMonth() + 1) && [1, 30].includes(date.getUTCDate()) || date.getUTCMonth() + 1 === 2 && [1, 28, 29].includes(date.getUTCDate())) {
    return true;
  }
  return false;
};
var strftime = (v, fmt) => {
  const date = toDateUTC(v);
  const tokens = fmt.split("");
  let str = "";
  tokens.forEach((t) => {
    switch (t) {
      case "y":
        str += String(date.getUTCFullYear());
        break;
      case "q":
        str += String(getQuarter(date));
        break;
      case "m":
        if (date.getUTCMonth() + 1 > 9) {
          str += String(date.getUTCMonth() + 1);
        } else {
          str += `0${String(date.getUTCMonth() + 1)}`;
        }
        break;
      case "d":
        if (date.getUTCDate() > 9) {
          str += String(date.getUTCDate());
        } else {
          str += `0${String(date.getUTCDate())}`;
        }
        break;
      default:
        str += t;
        break;
    }
  });
  return str;
};

// src/utils/frame.ts
var transpose = (frame) => {
  if (frame.length === 0)
    return frame;
  return frame[0].map((_, i) => frame.map((row) => row[i]));
};
var formatValues = (frame) => {
  const transposed = transpose(frame);
  const transformed = [];
  transposed.forEach((column, i) => {
    if (column.every((v) => isStartOrEndOfYear(v))) {
      transformed[i] = column.map((v) => strftime(v, "y"));
    } else if (column.every(isStartOrEndOfQuarter)) {
      transformed[i] = column.map((v) => strftime(v, "yQq"));
    } else if (column.every(isStartOrEndOfMonth)) {
      transformed[i] = column.map((v) => strftime(v, "y-m"));
    } else if (column.every((v) => !isNaN(Number(v)))) {
      transformed[i] = column.map((v) => Number(v));
    } else {
      transformed[i] = column;
    }
  });
  return transpose(transformed);
};

// src/utils/dataset.ts
var fromBlockResult = (results) => {
  const dimensions = results.schema.map((col) => col.name);
  const source = [];
  results.rows.forEach((r, i) => {
    const row = [];
    Object.entries(r).map(([k, v]) => row[dimensions.indexOf(k)] = v);
    source[i] = row;
  });
  return { dimensions, source: formatValues(source) };
};

// src/utils/determine.ts
var determine_exports = {};
__export(determine_exports, {
  animation: () => animation,
  axis: () => axis,
  grid: () => grid,
  legend: () => legend,
  renderer: () => renderer,
  series: () => series,
  title: () => title,
  toolbox: () => toolbox,
  tooltip: () => tooltip
});

// src/types/echarts/index.ts
var echarts_exports = {};

// src/types/enums.ts
var ChartType = /* @__PURE__ */ ((ChartType2) => {
  ChartType2["BAR"] = "bar";
  ChartType2["LINE"] = "line";
  ChartType2["PIE"] = "pie";
  ChartType2["SCATTER"] = "scatter";
  return ChartType2;
})(ChartType || {});

// src/utils/format.ts
var format_exports = {};
__export(format_exports, {
  categoricalValues: () => categoricalValues,
  numericalValues: () => numericalValues
});
var categoricalValues = (value) => String(value).length > 15 ? String(value).slice(0, 11) + "..." + String(value).slice(-4) : String(value);
var numericalValues = (value) => Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1
}).format(Number(value));

// src/utils/determine.ts
var renderer = (v) => {
  return v ?? "canvas";
};
var title = (conf) => {
  const title2 = {
    show: conf.features.title ?? false,
    text: conf.name,
    left: "auto"
  };
  if ((conf.renderer ?? "canvas") === "svg") {
    title2.top = 10;
    title2.left = 10;
  } else {
    title2.top = "2%";
  }
  return title2;
};
var legend = (conf) => {
  const legend2 = {
    show: conf.features.legend ?? false,
    type: "scroll",
    left: "center"
  };
  if ((conf.renderer ?? "canvas") === "svg") {
    legend2.top = 10;
  } else {
    legend2.top = "2%";
  }
  return legend2;
};
var grid = (conf, dataset) => {
  let grid2 = { show: false, containLabel: false };
  if ((conf.renderer ?? "canvas") === "canvas") {
    grid2 = { ...grid2, left: "12%", bottom: "12%", right: "9%" };
    if (conf.type === "bar" /* BAR */) {
      const orientation = conf.features.orientation ?? "vertical";
      const isVertical = orientation === "vertical";
      const isLargeSet = dataset.source.length > 6;
      if (isVertical) {
        grid2.bottom = isLargeSet ? "18%" : "12%";
      } else {
        grid2.left = isLargeSet ? "15%" : "18%";
      }
    }
  }
  return grid2;
};
var getDataType = (conf, direction) => {
  switch (conf.type) {
    case "pie" /* PIE */:
      return direction === "horizontal" ? "category" : "value";
    case "line" /* LINE */:
      return direction === "horizontal" ? "category" : "value";
    case "scatter" /* SCATTER */:
      return "value";
    case "bar" /* BAR */:
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
var axis = (conf, dataset, direction) => {
  const axes = [];
  const targetAxes = direction === "vertical" ? conf.yAxis : conf.xAxis;
  targetAxes.forEach((ax) => {
    if (ax.columns.length >= 1) {
      const type = getDataType(conf, direction);
      let name = ax.columns.map((col) => dataset.dimensions[col.index]).join(", ");
      name = name.length > 45 ? name.slice(0, 45) + "..." : name;
      const item = {
        show: conf.type !== "pie" /* PIE */,
        type,
        name,
        nameLocation: "center",
        nameGap: direction === "horizontal" ? 30 : 50,
        nameTextStyle: {
          fontSize: 14
        }
      };
      if (direction === "vertical" || conf.type === "scatter" /* SCATTER */) {
        item.splitLine = {
          show: true,
          lineStyle: { width: 1, type: "dashed", color: color_exports.ZINC_800 }
        };
      }
      if (type === "value") {
        item.axisLabel = { formatter: numericalValues };
      }
      if (conf.type === "bar") {
        const orientation = conf.features.orientation ?? "vertical";
        const isVertical = orientation === "vertical";
        const isLargeSet = dataset.source.length > 6;
        switch (direction) {
          case "horizontal":
            if (isVertical) {
              item.axisLabel = {
                interval: 0,
                rotate: isLargeSet ? 30 : 0,
                formatter: categoricalValues
              };
              item.nameGap = isLargeSet ? 55 : 30;
            }
            break;
          case "vertical":
            if (!isVertical) {
              item.axisLabel = {
                interval: 0,
                rotate: isLargeSet ? 30 : 0,
                formatter: categoricalValues
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
var addFeaturesForSeries = (conf, series2) => {
  if (conf.features.labels ?? false) {
    series2.label = { show: true };
  }
  if (conf.features.stack ?? false) {
    series2.stack = "total";
  }
  if (conf.features.area ?? false) {
    series2.areaStyle = {};
  }
  if (conf.features.smooth ?? false) {
    series2.smooth = true;
  }
  if (conf.type === "pie" /* PIE */) {
    series2.radius = ["40%", "70%"];
    series2.itemStyle = {
      borderRadius: 10,
      borderColor: color_exports.ZINC_900,
      borderWidth: 2
    };
  }
  if (conf.type === "scatter" /* SCATTER */) {
    series2.symbolSize = 15;
  }
  return series2;
};
var series = (conf, dataset) => {
  let series2 = [];
  const orientation = conf.features.orientation ?? "vertical";
  const { catAxis, valAxis } = orientation === "vertical" ? { catAxis: conf.xAxis, valAxis: conf.yAxis } : { catAxis: conf.yAxis, valAxis: conf.xAxis };
  valAxis.forEach((axis2, index) => {
    axis2.columns.forEach((col) => {
      const item = {
        type: col.type ?? conf.type,
        name: dataset.dimensions[col.index],
        color: col.color ?? color_exports.DARK_BLUE
      };
      if (conf.type === "pie" /* PIE */) {
        item.encode = { itemName: "", value: "" };
        item.encode.itemName = dataset.dimensions[catAxis[0].columns[0].index];
        item.encode.value = dataset.dimensions[col.index];
        item.textStyle = { color: color_exports.ZINC_500 };
        item.label = { show: true, color: color_exports.ZINC_500 };
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
      series2.push(item);
    });
  });
  series2 = series2.map((s) => addFeaturesForSeries(conf, s));
  return series2;
};
var animation = (conf) => {
  return (conf.renderer ?? "canvas") === "canvas";
};
var tooltip = (conf) => {
  if (conf.type !== "pie" /* PIE */) {
    return {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999999"
        }
      }
    };
  } else {
    return {
      show: true,
      trigger: "item"
    };
  }
};
var toolbox = (conf) => {
  if ((conf.renderer ?? "canvas") === "canvas" && (conf.features.toolbox ?? false)) {
    return {
      show: true,
      feature: {
        saveAsImage: {
          show: true,
          type: "png"
        },
        dataView: {
          show: true,
          readOnly: true
        }
      }
    };
  } else {
    return {
      show: false
    };
  }
};

// src/utils/legacy.ts
var legacy_exports = {};
__export(legacy_exports, {
  toChartConfig: () => toChartConfig
});
var toChartConfig = (details, results) => {
  const xix = results.schema.findIndex((v) => v.name === details.xAxis);
  const yix = results.schema.findIndex((v) => v.name === details.yAxis);
  const type = details.chartType ?? null;
  const defaultColor = details.chartType === "pie" /* PIE */ ? color_exports.LIME_PALETTE : color_exports.LIME_200;
  const yCols = [{ index: yix, type, color: defaultColor }];
  (details.series ?? []).forEach((s) => {
    yCols.push({
      index: results.schema.findIndex((v) => v.name === s.column),
      type: s.type ?? null,
      color: s.color ?? color_exports.DARK_BLUE
    });
  });
  return {
    name: details.name,
    type,
    features: {},
    xAxis: [{ columns: [{ index: xix, type: null, color: null }] }],
    yAxis: [{ columns: yCols }]
  };
};

// src/utils/axes.ts
var axes_exports = {};
__export(axes_exports, {
  swap: () => swap
});
var swap = (conf) => {
  const tmpAxis = conf.xAxis;
  conf.xAxis = conf.yAxis;
  conf.yAxis = tmpAxis;
  return conf;
};

// src/utils/convert.ts
var convert_exports = {};
__export(convert_exports, {
  config: () => config
});
var resetFeatures = (conf) => {
  const tmpFeatures = conf.features;
  conf.features = {};
  conf.features.title = tmpFeatures.title ?? false;
  conf.features.legend = tmpFeatures.legend ?? false;
  return conf;
};
var convertAllColumnTypesInAxes = (axes, to) => {
  const columns = [];
  axes.forEach((axis2) => {
    axis2.columns.forEach((col) => {
      col.type = to;
      if (to === "pie" /* PIE */) {
        col.color = color_exports.LIME_PALETTE;
      } else if (Array.isArray(col.color)) {
        col.color = color_exports.LIME_200;
      }
      columns.push(col);
    });
  });
  return [{ columns }];
};
var toLine = (conf) => {
  const from = conf.type;
  conf.type = "line" /* LINE */;
  const previousFeatures = conf.features;
  conf = resetFeatures(conf);
  switch (from) {
    case "pie" /* PIE */: {
      conf.yAxis[0].columns[0].type = "line" /* LINE */;
      conf.yAxis[0].columns[0].color = color_exports.LIME_200;
      return conf;
    }
    default: {
      if ((previousFeatures.orientation ?? "vertical") === "horizontal") {
        conf = swap(conf);
      }
      conf.yAxis = convertAllColumnTypesInAxes(conf.yAxis, "line" /* LINE */);
      return conf;
    }
  }
};
var toBar = (conf) => {
  const from = conf.type;
  conf.type = "bar" /* BAR */;
  conf = resetFeatures(conf);
  switch (from) {
    case "pie" /* PIE */: {
      conf.yAxis[0].columns[0].type = "bar" /* BAR */;
      conf.yAxis[0].columns[0].color = color_exports.LIME_200;
      return conf;
    }
    default: {
      conf.yAxis = convertAllColumnTypesInAxes(conf.yAxis, "bar" /* BAR */);
      return conf;
    }
  }
};
var toPie = (conf) => {
  const from = conf.type;
  conf.type = "pie" /* PIE */;
  conf.features.legend = false;
  conf = resetFeatures(conf);
  switch (from) {
    default: {
      conf.yAxis = convertAllColumnTypesInAxes(conf.yAxis, "pie" /* PIE */);
      return conf;
    }
  }
};
var config = (conf, to) => {
  console.debug(`Converting chart from ${conf.type} to ${to}`);
  switch (to) {
    case "line" /* LINE */:
      return toLine(conf);
    case "bar" /* BAR */:
      return toBar(conf);
    case "pie" /* PIE */:
      return toPie(conf);
    default:
      return conf;
  }
};

// src/main.ts
var ecOptionFromDataset = (conf, dataset) => {
  dataset.source = frame_exports.formatValues(dataset.source);
  return {
    animation: determine_exports.animation(conf),
    backgroundColor: color_exports.ZINC_900,
    dataset,
    grid: determine_exports.grid(conf, dataset),
    legend: determine_exports.legend(conf),
    series: determine_exports.series(conf, dataset),
    title: determine_exports.title(conf),
    toolbox: determine_exports.toolbox(conf),
    tooltip: determine_exports.tooltip(conf),
    xAxis: determine_exports.axis(conf, dataset, "horizontal"),
    yAxis: determine_exports.axis(conf, dataset, "vertical")
  };
};
var ecOptionFromBlockResult = (conf, res) => {
  return ecOptionFromDataset(conf, dataset_exports.fromBlockResult(res));
};

// src/index.ts
var src_default = main_exports;
export {
  ChartType,
  axes_exports as axes,
  color_exports as color,
  convert_exports as convert,
  dataset_exports as dataset,
  datetime_exports as datetime,
  src_default as default,
  determine_exports as determine,
  echarts_exports as echarts,
  format_exports as format,
  frame_exports as frame,
  legacy_exports as legacy
};
