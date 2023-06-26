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
  ZINC_400: () => ZINC_400,
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
var ZINC_400 = "#a1a1aa";
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

// src/constants/error.ts
var error_exports = {};
__export(error_exports, {
  Z_AXIS_NOT_FOUND: () => Z_AXIS_NOT_FOUND
});
var Z_AXIS_NOT_FOUND = "zAxis not found in chart config";

// src/utils/dataset.ts
var dataset_exports = {};
__export(dataset_exports, {
  fromBlockResult: () => fromBlockResult
});

// src/utils/frame.ts
var frame_exports = {};
__export(frame_exports, {
  aggregate: () => aggregate,
  filter: () => filter,
  formatValues: () => formatValues,
  runTfPipeline: () => runTfPipeline,
  select: () => select,
  sort: () => sort,
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
var filter = (frame, col, type, value, parser) => {
  const transposed = transpose(frame);
  const keep = [];
  const filtered = [];
  const series2 = transposed[col];
  const convert = !parser ? (v) => Number(v) : (v) => Date.parse(String(v));
  series2.forEach((v, i) => {
    switch (type) {
      case "<":
        if (convert(v) < convert(value)) {
          keep.push(i);
        }
        break;
      case "<=":
        if (convert(v) <= convert(value)) {
          keep.push(i);
        }
        break;
      case ">":
        if (convert(v) > convert(value)) {
          keep.push(i);
        }
        break;
      case ">=":
        if (convert(v) >= convert(value)) {
          keep.push(i);
        }
        break;
      case "=":
        if (v === value) {
          keep.push(i);
        }
        break;
      case "!=":
        if (v !== value) {
          keep.push(i);
        }
        break;
    }
  });
  frame.forEach((s, i) => {
    if (keep.includes(i)) {
      filtered.push(s);
    }
  });
  return filtered;
};
var aggregate = (frame, col, type, groupBy) => {
  const selected = select(frame, [groupBy, col]);
  groupBy = 0;
  col = 1;
  const transposed = transpose(selected);
  const map = /* @__PURE__ */ new Map();
  transposed[groupBy].forEach((v) => {
    if (!map.has(v)) {
      map.set(
        v,
        transposed[col].filter((_, j) => transposed[groupBy][j] === v)
      );
    }
  });
  const aggregated = [];
  for (const key of map.keys()) {
    const values = map.get(key);
    switch (type) {
      case "avg": {
        const avg = values?.reduce((acc, curr) => {
          curr = Number(curr);
          return acc + curr;
        }, 0);
        if (avg) {
          aggregated.push([key, avg / (values?.length ?? 1)]);
        }
        break;
      }
      case "count": {
        aggregated.push([key, values?.length ?? 0]);
        break;
      }
      case "sum": {
        const sum = values?.reduce((acc, curr) => {
          curr = Number(curr);
          return acc + curr;
        }, 0);
        if (sum) {
          aggregated.push([key, sum]);
        }
        break;
      }
    }
  }
  return aggregated;
};
var select = (frame, cols) => {
  const transposed = transpose(frame);
  const selected = [];
  cols.forEach((i) => selected.push(transposed[i]));
  return transpose(selected);
};
var sort = (frame, col, order, parser) => {
  const transposed = transpose(frame);
  if (parser) {
    transposed[col] = transposed[col].map((v) => Date.parse(String(v)));
  }
  let values = [...transposed[col]];
  values = values.sort();
  if (order === "desc") {
    values = values.reverse();
  }
  const sorted = [];
  values.forEach((v) => {
    const ix = transposed[col].indexOf(v);
    sorted.push(frame[ix]);
    delete transposed[col][ix];
  });
  return sorted;
};
var runTfPipeline = (frame, conf) => {
  (conf.filter ?? []).forEach((fil) => {
    frame = filter(frame, fil.index, fil.type, fil.value, fil.parser);
  });
  (conf.aggregate ?? []).forEach((agg) => {
    frame = aggregate(frame, agg.index, agg.type, agg.groupBy);
  });
  (conf.sort ?? []).forEach((s) => {
    frame = sort(frame, s.index, s.order, s.parser);
  });
  return frame;
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

// src/utils/determine/index.ts
var determine_exports = {};
__export(determine_exports, {
  animation: () => animation,
  axis: () => axis,
  calendar: () => calendar,
  grid: () => grid,
  legend: () => legend,
  renderer: () => renderer,
  series: () => series,
  title: () => title,
  toolbox: () => toolbox,
  tooltip: () => tooltip,
  visualMap: () => visualMap
});

// src/utils/determine/animation.ts
var animation = (conf) => (conf.renderer ?? "canvas") === "canvas";

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

// src/types/echarts/index.ts
var echarts_exports = {};

// src/types/enums.ts
var ChartType = /* @__PURE__ */ ((ChartType2) => {
  ChartType2["BAR"] = "bar";
  ChartType2["LINE"] = "line";
  ChartType2["PIE"] = "pie";
  ChartType2["SCATTER"] = "scatter";
  ChartType2["HEATMAP"] = "heatmap";
  ChartType2["CALENDAR"] = "calendar";
  return ChartType2;
})(ChartType || {});

// src/utils/determine/axis.ts
var getTargetAxes = (conf, type) => {
  switch (type) {
    case "x":
      return conf.xAxis;
    case "y":
      return conf.yAxis;
    case "z":
      if (conf.zAxis) {
        return conf.zAxis;
      } else {
        throw error_exports.Z_AXIS_NOT_FOUND;
      }
  }
};
var getDataType = (conf, axisType) => {
  switch (conf.type) {
    case "pie" /* PIE */:
    case "line" /* LINE */:
      return axisType === "x" ? "category" : "value";
    case "scatter" /* SCATTER */:
      return "value";
    case "heatmap" /* HEATMAP */:
      return "category";
    case "bar" /* BAR */:
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
var axis = (conf, dataset, axisType) => {
  const axes = [];
  const targetAxes = getTargetAxes(conf, axisType);
  targetAxes.forEach((ax) => {
    if (ax.columns.length > 0) {
      const type = getDataType(conf, axisType);
      let name = ax.columns.map((col) => dataset.dimensions[col.index]).join(", ");
      name = name.length > 45 ? name.slice(0, 45) + "..." : name;
      const item = {
        show: !["pie" /* PIE */, "calendar" /* CALENDAR */].includes(conf.type),
        type,
        name,
        nameLocation: "center",
        nameGap: axisType === "x" ? 30 : 50,
        nameTextStyle: {
          fontSize: 14
        }
      };
      if (axisType === "y" || conf.type === "scatter" /* SCATTER */) {
        item.splitLine = {
          show: true,
          lineStyle: { width: 1, type: "dashed", color: color_exports.ZINC_800 }
        };
      }
      if (type === "value") {
        item.axisLabel = { formatter: numericalValues };
      }
      if (conf.type === "bar" /* BAR */) {
        const orientation = conf.features.orientation ?? "vertical";
        const isLargeSet = dataset.source.length > 6;
        switch (axisType) {
          case "x":
            if (orientation === "vertical") {
              item.axisLabel = {
                interval: Math.floor((dataset.source.length - 1) / 10),
                rotate: isLargeSet ? 30 : 0,
                formatter: categoricalValues
              };
              item.nameGap = isLargeSet ? 55 : 30;
            }
            break;
          case "y":
            if (orientation === "horizontal") {
              item.axisLabel = {
                interval: Math.floor((dataset.source.length - 1) / 10),
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

// src/utils/determine/calendar.ts
var calendar = (conf, dataset) => {
  if (conf.type !== "calendar" /* CALENDAR */) {
    return null;
  }
  const transposed = transpose(dataset.source);
  const years = Array.from(
    new Set(
      transposed[0].map((t) => new Date(String(t))).map((d) => d.getUTCFullYear()).sort()
    )
  );
  return years.map((year, i) => {
    return {
      top: i * 130 + 90,
      right: 30,
      cellSize: ["auto", 13],
      range: String(year),
      itemStyle: {
        color: color_exports.ZINC_900,
        borderColor: color_exports.ZINC_500,
        borderWidth: 0.5
      },
      orient: "horizontal",
      splitLine: {
        show: true,
        lineStyle: {
          color: color_exports.ZINC_400,
          width: 1,
          type: "solid"
        }
      }
    };
  });
};

// src/utils/determine/grid.ts
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
    } else if (conf.type === "heatmap" /* HEATMAP */) {
      grid2.right = conf.features.piecewise ?? false ? "15%" : "11%";
    }
  }
  return grid2;
};

// src/utils/determine/legend.ts
var legend = (conf) => {
  return {
    show: (conf.features.legend ?? false) && !["heatmap" /* HEATMAP */, "calendar" /* CALENDAR */].includes(conf.type),
    type: "scroll",
    left: "center",
    top: conf.renderer === "svg" ? 10 : "2%"
  };
};

// src/utils/determine/renderer.ts
var renderer = (v) => v ?? "canvas";

// src/utils/determine/series.ts
var getTypedAxes = (conf) => {
  switch (conf.type) {
    case "bar" /* BAR */:
      return (conf.features.orientation ?? "vertical") === "vertical" ? { valAxis: conf.yAxis, catAxis1: conf.xAxis } : { valAxis: conf.xAxis, catAxis1: conf.yAxis };
    case "heatmap" /* HEATMAP */:
      if (conf.zAxis) {
        return {
          valAxis: conf.zAxis,
          catAxis1: conf.xAxis,
          catAxis2: conf.yAxis
        };
      } else {
        throw error_exports.Z_AXIS_NOT_FOUND;
      }
    default:
      return { valAxis: conf.yAxis, catAxis1: conf.xAxis };
  }
};
var series = (conf, dataset) => {
  const series2 = [];
  const { valAxis, catAxis1, catAxis2 } = getTypedAxes(conf);
  valAxis.forEach((axis2, index) => {
    axis2.columns.forEach((col) => {
      const item = {
        type: col.type ?? conf.type,
        name: dataset.dimensions[col.index]
      };
      if (conf.features.labels ?? false) {
        item.label = { show: true };
      }
      switch (conf.type) {
        case "bar" /* BAR */:
          item.color = col.color ?? color_exports.DARK_BLUE;
          if ((conf.features.orientation ?? "vertical") === "vertical") {
            item.yAxisIndex = index;
            item.encode = {
              x: dataset.dimensions[catAxis1[0].columns[0].index],
              y: dataset.dimensions[col.index]
            };
          } else {
            item.xAxisIndex = index;
            item.encode = {
              y: dataset.dimensions[catAxis1[0].columns[0].index],
              x: dataset.dimensions[col.index]
            };
          }
          if (conf.features.stack ?? false) {
            item.stack = "total";
          }
          break;
        case "line" /* LINE */:
          item.color = col.color ?? color_exports.DARK_BLUE;
          item.yAxisIndex = index;
          item.encode = {
            x: dataset.dimensions[catAxis1[0].columns[0].index],
            y: dataset.dimensions[col.index]
          };
          if (conf.features.area ?? false) {
            item.areaStyle = {};
          }
          if (conf.features.smooth ?? false) {
            item.smooth = true;
          }
          break;
        case "pie" /* PIE */:
          item.color = col.color ?? color_exports.LIME_PALETTE;
          item.encode = { itemName: "", value: "" };
          item.encode.itemName = dataset.dimensions[catAxis1[0].columns[0].index];
          item.encode.value = dataset.dimensions[col.index];
          item.textStyle = { color: color_exports.ZINC_500 };
          item.label = { show: true, color: color_exports.ZINC_500 };
          item.radius = ["40%", "70%"];
          item.itemStyle = {
            borderRadius: 10,
            borderColor: color_exports.ZINC_900,
            borderWidth: 2
          };
          break;
        case "scatter" /* SCATTER */:
          item.color = col.color ?? color_exports.DARK_BLUE;
          item.yAxisIndex = index;
          item.encode = {
            x: dataset.dimensions[catAxis1[0].columns[0].index],
            y: dataset.dimensions[col.index]
          };
          item.symbolSize = 15;
          break;
        case "heatmap" /* HEATMAP */:
          if (!catAxis2) {
            throw error_exports.Z_AXIS_NOT_FOUND;
          }
          item.encode = {
            x: dataset.dimensions[catAxis1[0].columns[0].index],
            y: dataset.dimensions[catAxis2[0].columns[0].index],
            value: dataset.dimensions[col.index]
          };
          break;
        case "calendar" /* CALENDAR */: {
          const transposed = transpose(dataset.source);
          const years = Array.from(
            new Set(
              transposed[0].map((t) => new Date(String(t))).map((d) => d.getUTCFullYear()).sort()
            )
          );
          years.forEach((_, i) => {
            const itemCopy = { ...item };
            itemCopy.type = "heatmap" /* HEATMAP */;
            itemCopy.calendarIndex = i;
            itemCopy.coordinateSystem = "calendar";
            series2.push(itemCopy);
          });
        }
      }
      if (conf.type !== "calendar" /* CALENDAR */) {
        series2.push(item);
      }
    });
  });
  return series2;
};

// src/utils/determine/title.ts
var title = (conf) => {
  return {
    show: conf.features.title ?? false,
    text: conf.name,
    top: conf.renderer === "svg" ? 10 : "2%",
    left: conf.renderer === "svg" ? 10 : "auto"
  };
};

// src/utils/determine/tooltip.ts
var tooltip = (conf) => {
  switch (conf.type) {
    case "calendar" /* CALENDAR */:
    case "pie" /* PIE */:
      return {
        show: true,
        trigger: "item"
      };
    case "heatmap" /* HEATMAP */:
      return {
        show: true,
        trigger: "item",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999999"
          }
        }
      };
    default:
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
  }
};

// src/utils/determine/toolbox.ts
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

// src/utils/determine/visualMap.ts
var visualMap = (conf, dataset) => {
  if (!["heatmap" /* HEATMAP */, "calendar" /* CALENDAR */].includes(conf.type)) {
    return null;
  }
  const valAxis = conf.type === "heatmap" /* HEATMAP */ ? conf.zAxis : conf.yAxis;
  if (!valAxis) {
    throw error_exports.Z_AXIS_NOT_FOUND;
  }
  const transposed = transpose(dataset.source);
  const series2 = transposed[valAxis[0].columns[0].index].map((s) => Number(s));
  const min = Math.min(...series2);
  const max = Math.max(...series2);
  if (!Array.isArray(valAxis[0].columns[0].color)) {
    valAxis[0].columns[0].color = color_exports.LIME_PALETTE;
  }
  return {
    inRange: {
      color: valAxis[0].columns[0].color
    },
    left: conf.type === "heatmap" /* HEATMAP */ ? "right" : "center",
    top: conf.type === "heatmap" /* HEATMAP */ ? "center" : 3,
    type: conf.features.piecewise ?? false ? "piecewise" : "continuous",
    orient: conf.type === "heatmap" /* HEATMAP */ ? "vertical" : "horizontal",
    min,
    max,
    calculable: true
  };
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
      if (["calendar" /* CALENDAR */, "heatmap" /* HEATMAP */, "pie" /* PIE */].includes(to)) {
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
    case "heatmap" /* HEATMAP */: {
      if (!conf.zAxis) {
        throw error_exports.Z_AXIS_NOT_FOUND;
      }
      conf.yAxis = convertAllColumnTypesInAxes(conf.zAxis, "line" /* LINE */);
      delete conf.zAxis;
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
    case "heatmap" /* HEATMAP */: {
      if (!conf.zAxis) {
        throw error_exports.Z_AXIS_NOT_FOUND;
      }
      conf.yAxis = convertAllColumnTypesInAxes(conf.zAxis, "bar" /* BAR */);
      delete conf.zAxis;
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
  const previousFeatures = conf.features;
  conf = resetFeatures(conf);
  conf.features.legend = false;
  switch (from) {
    case "heatmap" /* HEATMAP */: {
      if (!conf.zAxis) {
        throw error_exports.Z_AXIS_NOT_FOUND;
      }
      conf.yAxis = convertAllColumnTypesInAxes(conf.zAxis, "pie" /* PIE */);
      delete conf.zAxis;
      return conf;
    }
    default: {
      if ((previousFeatures.orientation ?? "vertical") === "horizontal") {
        conf = swap(conf);
      }
      conf.yAxis = convertAllColumnTypesInAxes([conf.yAxis[0]], "pie" /* PIE */);
      return conf;
    }
  }
};
var toHeatmap = (conf) => {
  const from = conf.type;
  conf.type = "heatmap" /* HEATMAP */;
  const previousFeatures = conf.features;
  conf = resetFeatures(conf);
  conf.features.labels = true;
  switch (from) {
    default: {
      if ((previousFeatures.orientation ?? "vertical") === "horizontal") {
        conf = swap(conf);
      }
      const xAxis = conf.xAxis;
      conf.zAxis = convertAllColumnTypesInAxes(
        [conf.yAxis[0]],
        "heatmap" /* HEATMAP */
      );
      conf.xAxis = xAxis;
      conf.yAxis = [...xAxis];
      return conf;
    }
  }
};
var toScatter = (conf) => {
  const from = conf.type;
  conf.type = "scatter" /* SCATTER */;
  const previousFeatures = conf.features;
  conf = resetFeatures(conf);
  switch (from) {
    case "heatmap" /* HEATMAP */: {
      if (!conf.zAxis) {
        throw error_exports.Z_AXIS_NOT_FOUND;
      }
      conf.yAxis = convertAllColumnTypesInAxes(conf.zAxis, "scatter" /* SCATTER */);
      delete conf.zAxis;
      return conf;
    }
    default: {
      if ((previousFeatures.orientation ?? "vertical") === "horizontal") {
        conf = swap(conf);
      }
      conf.yAxis = convertAllColumnTypesInAxes(
        [conf.yAxis[0]],
        "scatter" /* SCATTER */
      );
      return conf;
    }
  }
};
var toCalendar = (conf) => {
  const from = conf.type;
  conf.type = "calendar" /* CALENDAR */;
  const previousFeatures = conf.features;
  conf = resetFeatures(conf);
  switch (from) {
    case "heatmap" /* HEATMAP */: {
      if (!conf.zAxis) {
        throw error_exports.Z_AXIS_NOT_FOUND;
      }
      conf.yAxis = convertAllColumnTypesInAxes(conf.zAxis, "calendar" /* CALENDAR */);
      delete conf.zAxis;
      return conf;
    }
    default: {
      if ((previousFeatures.orientation ?? "vertical") === "horizontal") {
        conf = swap(conf);
      }
      conf.yAxis = convertAllColumnTypesInAxes(
        [conf.yAxis[0]],
        "calendar" /* CALENDAR */
      );
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
    case "scatter" /* SCATTER */:
      return toScatter(conf);
    case "heatmap" /* HEATMAP */:
      return toHeatmap(conf);
    case "calendar" /* CALENDAR */:
      return toCalendar(conf);
    default:
      return conf;
  }
};

// src/main.ts
var useSelectedDimensionsOnly = (conf, dataset) => {
  const xIndex = conf.xAxis[0].columns[0].index;
  const yIndex = conf.yAxis[0].columns[0].index;
  dataset.dimensions = [dataset.dimensions[xIndex], dataset.dimensions[yIndex]];
  dataset.source = frame_exports.select(dataset.source, [xIndex, yIndex]);
  conf.xAxis[0].columns[0].index = 0;
  conf.yAxis[0].columns[0].index = 1;
};
var ecOptionFromDataset = (conf, dataset) => {
  if (conf.type === "calendar" /* CALENDAR */) {
    useSelectedDimensionsOnly(conf, dataset);
  }
  dataset.source = frame_exports.formatValues(dataset.source);
  if (conf.transform) {
    dataset.source = frame_exports.runTfPipeline(dataset.source, conf.transform);
  }
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
    xAxis: determine_exports.axis(conf, dataset, "x"),
    yAxis: determine_exports.axis(conf, dataset, "y"),
    visualMap: determine_exports.visualMap(conf, dataset),
    calendar: determine_exports.calendar(conf, dataset)
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
  error_exports as error,
  format_exports as format,
  frame_exports as frame,
  legacy_exports as legacy
};
