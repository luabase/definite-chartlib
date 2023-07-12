"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Chart: () => Chart,
  default: () => src_default,
  echarts: () => echarts_exports
});
module.exports = __toCommonJS(src_exports);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  chartGenerator: () => chartGenerator,
  create: () => create,
  load: () => load
});

// src/utils/array.ts
var array_exports = {};
__export(array_exports, {
  getAllSubsets: () => getAllSubsets,
  removeDuplicates: () => removeDuplicates,
  sum: () => sum,
  unboundedReadItem: () => unboundedReadItem
});
function unboundedReadItem(arr, i) {
  return arr[i % arr.length];
}
function sum(arr) {
  return arr.reduce((acc, curr) => acc + Number(curr), 0);
}
function getAllSubsets(arr, n = 1) {
  const subsets = [[]];
  arr.forEach((item) => {
    const last = subsets.length - 1;
    for (let i = 0; i <= last; i++) {
      subsets.push([...subsets[i], item]);
    }
  });
  return subsets.sort((a, b) => a.length - b.length).filter((subset) => subset.length >= n);
}
function removeDuplicates(arr) {
  return Array.from(new Set(arr));
}

// src/utils/color.ts
var color_exports2 = {};
__export(color_exports2, {
  asArray: () => asArray,
  asSingleton: () => asSingleton
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

// src/utils/color.ts
function asArray(s) {
  return Array.isArray(s) ? s : color_exports.LIME_PALETTE;
}
function asSingleton(s) {
  return Array.isArray(s) ? s[0] : s;
}

// src/utils/datasets.ts
var datasets_exports = {};
__export(datasets_exports, {
  containsLargeData: () => containsLargeData
});
function containsLargeData(datasets2) {
  return datasets2[datasets2.length - 1].source.length > 10;
}

// src/utils/datetime.ts
var datetime_exports = {};
__export(datetime_exports, {
  getQuarter: () => getQuarter,
  isStartOrEndOfMonth: () => isStartOrEndOfMonth,
  isStartOrEndOfQuarter: () => isStartOrEndOfQuarter,
  isStartOrEndOfYear: () => isStartOrEndOfYear,
  strftime: () => strftime,
  toDateUTC: () => toDateUTC
});
function toDateUTC(v) {
  const date = new Date(v);
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
}
function getQuarter(d) {
  const month = d.getUTCMonth() + 1;
  if (month <= 3) {
    return 1;
  } else if (month <= 6) {
    return 2;
  } else if (month <= 9) {
    return 3;
  } else {
    return 4;
  }
}
function isStartOrEndOfYear(d) {
  return d.getUTCMonth() === 0 && d.getUTCDate() === 1 || d.getUTCMonth() === 11 && d.getUTCDate() === 31;
}
function isStartOrEndOfQuarter(d) {
  return d.getUTCMonth() + 1 === 1 && d.getUTCDate() === 1 || // Jan 1
  d.getUTCMonth() + 1 === 3 && d.getUTCDate() === 31 || // Mar 31
  d.getUTCMonth() + 1 === 4 && d.getUTCDate() === 1 || // Apr 1
  d.getUTCMonth() + 1 === 6 && d.getUTCDate() === 30 || // Jun 30
  d.getUTCMonth() + 1 === 7 && d.getUTCDate() === 1 || // Jul 1
  d.getUTCMonth() + 1 === 9 && d.getUTCDate() === 30 || // Sep 30
  d.getUTCMonth() + 1 === 10 && d.getUTCDate() === 1 || // Oct 1
  d.getUTCMonth() + 1 === 12 && d.getUTCDate() === 31;
}
function isStartOrEndOfMonth(d) {
  return [1, 3, 5, 7, 8, 10, 12].includes(d.getUTCMonth() + 1) && [1, 31].includes(d.getUTCDate()) || [4, 6, 9, 11].includes(d.getUTCMonth() + 1) && [1, 30].includes(d.getUTCDate()) || d.getUTCMonth() + 1 === 2 && [1, 28, 29].includes(d.getUTCDate());
}
function strftime(d, fmt) {
  let str = "";
  fmt.split("").forEach((t) => {
    switch (t) {
      case "y":
        str += d.getUTCFullYear();
        break;
      case "q":
        str += getQuarter(d);
        break;
      case "m":
        str += d.getUTCMonth() + 1 > 9 ? d.getUTCMonth() + 1 : `0${d.getUTCMonth() + 1}`;
        break;
      case "d":
        str += d.getUTCDate() > 9 ? d.getUTCDate() : `0${d.getUTCDate()}`;
        break;
      default:
        str += t;
        break;
    }
  });
  return str;
}

// src/utils/map.ts
var map_exports = {};
__export(map_exports, {
  getKeyByValue: () => getKeyByValue
});
function getKeyByValue(m, v) {
  for (let [key, value] of m.entries()) {
    if (value === v)
      return key;
  }
  return void 0;
}

// src/utils/string.ts
var string_exports = {};
__export(string_exports, {
  truncate: () => truncate
});
function truncate(s, len) {
  return s.length > len ? s.substring(0, len) + "..." : s;
}

// src/perf.ts
function profile(target, name, descriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args) {
    const proto = typeof target === "function" ? target.prototype : target;
    const startTime = Date.now();
    const result = original.apply(this, args);
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.debug(`${proto.constructor.name}.${name} took ${duration}ms`);
    return result;
  };
  return descriptor;
}

// src/dataframe.ts
var _DataFrame = class {
  constructor(rows) {
    this.data = [];
    this.columns = /* @__PURE__ */ new Map();
    rows.forEach((row, i) => {
      if (i === 0) {
        Object.keys(row).forEach((k, i2) => {
          if (!this.columns.has(i2)) {
            this.columns.set(i2, k);
          }
        });
      }
      this.data.push(Object.values(row));
    });
    this.shape = {
      height: this.data.length,
      width: Object.keys(this.columns).length
    };
  }
  static load(data, columns) {
    const df = new _DataFrame([]);
    df.data = data;
    df.columns = columns;
    df.shape = {
      height: data.length,
      width: Array.from(columns.keys()).length
    };
    return df;
  }
  static transpose(data) {
    if (data.length === 0)
      return data;
    return data[0].map((_, i) => data.map((row) => row[i]));
  }
  transposed() {
    if (this.shape.height === 0)
      return this.data;
    return _DataFrame.transpose(this.data);
  }
  col(ix) {
    return this.transposed()[ix];
  }
  asDataSet() {
    return {
      dimensions: Array.from(this.columns.values()),
      source: this.data
    };
  }
  static fromDataSet(dataset) {
    return _DataFrame.load(
      dataset.source,
      new Map(dataset.dimensions.map((s, i) => [i, s]))
    );
  }
  filter(col, where) {
    const filtered = this.data.filter((row) => where(row[col]));
    return _DataFrame.load(filtered, this.columns);
  }
  aggregateValue(prev, next, acc, aggregation) {
    switch (aggregation) {
      case "sum":
      case "avg":
        acc += Number(next);
        return acc;
      case "count":
        acc++;
        return acc;
      case "distinct":
        if (prev !== next) {
          acc++;
        }
        return acc;
      case "min":
        if (!prev) {
          acc = Number(next);
        } else {
          acc = Math.min(acc, Number(next));
        }
        return acc;
      case "max":
        if (!prev) {
          acc = Number(next);
        } else {
          acc = Math.max(acc, Number(next));
        }
        return acc;
      default:
        throw new Error(`Invalid aggregation ${aggregation}`);
    }
  }
  groupBy(col, by, aggregation) {
    const map = /* @__PURE__ */ new Map();
    for (let i = 0; i < this.data.length; i++) {
      const k = this.data[i][by];
      const v = this.data[i][col];
      if (!map.has(k)) {
        const acc = this.aggregateValue(void 0, v, 0, aggregation);
        map.set(k, { acc, seen: 1 });
      } else {
        let { acc, seen } = map.get(k) || { acc: 0, seen: 0 };
        acc = this.aggregateValue(this.data[i - 1][col], v, acc, aggregation);
        seen++;
        map.set(k, { acc, seen });
      }
    }
    if (aggregation === "avg") {
      for (const [k, v] of map.entries()) {
        map.set(k, { acc: v.acc / v.seen, seen: v.seen });
      }
    }
    return _DataFrame.load(
      Array.from(map.entries()).map(([k, v]) => [k, v.acc]),
      /* @__PURE__ */ new Map([
        [0, this.columns.get(by) ?? ""],
        [1, this.columns.get(col) ?? ""]
      ])
    );
  }
  map(col, fn) {
    const transposed = this.transposed();
    transposed[col] = transposed[col].map(fn);
    this.data = _DataFrame.transpose(transposed);
    return _DataFrame.load(this.data, this.columns);
  }
  pivot(index, columns, values, aggregation) {
    const map = /* @__PURE__ */ new Map();
    for (let i = 0; i < this.data.length; i++) {
      const row = this.data[i];
      const k = row[index];
      const cat = row[columns];
      const val = row[values];
      if (!map.has(k)) {
        const innerMap = /* @__PURE__ */ new Map();
        const acc = this.aggregateValue(void 0, val, 0, aggregation);
        innerMap.set(cat, { acc, seen: 1 });
        map.set(k, innerMap);
      } else {
        const innerMap = map.get(k);
        if (!innerMap.has(cat)) {
          const acc = this.aggregateValue(void 0, val, 0, aggregation);
          innerMap.set(cat, { acc, seen: 1 });
        } else {
          let { acc, seen } = innerMap.get(cat) || { acc: 0, seen: 0 };
          acc = this.aggregateValue(
            this.data[i - 1][values],
            val,
            acc,
            aggregation
          );
          seen++;
          innerMap.set(cat, { acc, seen });
        }
        map.set(k, innerMap);
      }
    }
    const data = [];
    const cols = /* @__PURE__ */ new Map([[0, this.columns.get(index) ?? ""]]);
    array_exports.removeDuplicates(this.col(columns)).map(String).forEach((v, i) => {
      cols.set(i + 1, v);
    });
    for (const [outerK, innerMap] of map.entries()) {
      const row = [outerK];
      for (let i = 0; i < cols.size - 1; i++) {
        row.push(null);
      }
      for (const [innerK, v] of innerMap.entries()) {
        const ix = map_exports.getKeyByValue(cols, innerK);
        let { acc, seen } = v;
        if (aggregation === "avg") {
          acc = acc / seen;
        }
        row[ix] = acc;
      }
      data.push(row);
    }
    return _DataFrame.load(data, cols);
  }
  select(cols) {
    let data = this.transposed().filter((_, i) => cols.includes(i));
    data = _DataFrame.transpose(data);
    const columns = /* @__PURE__ */ new Map();
    this.columns.forEach((v, k) => {
      if (cols.includes(k)) {
        columns.set(columns.size, v);
      }
    });
    return _DataFrame.load(data, columns);
  }
};
var DataFrame = _DataFrame;
__decorateClass([
  profile
], DataFrame.prototype, "filter", 1);
__decorateClass([
  profile
], DataFrame.prototype, "groupBy", 1);
__decorateClass([
  profile
], DataFrame.prototype, "map", 1);
__decorateClass([
  profile
], DataFrame.prototype, "pivot", 1);
__decorateClass([
  profile
], DataFrame.prototype, "select", 1);

// src/formatters.ts
function categoryFormatter(value) {
  return String(value).length > 15 ? String(value).slice(0, 11) + "..." + String(value).slice(-4) : String(value);
}
function valueFormatter(value) {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(Number(value));
}

// src/determine/axis.ts
function axis(chart, datasets2, kind) {
  const df = DataFrame.fromDataSet(datasets2[0]);
  const isLarge = datasets_exports.containsLargeData(datasets2);
  const axes = [];
  if (isDimensionalAxis(chart, kind)) {
    const ix = chart.getChartType() === "heatmap" && kind === "y" ? 1 : 0;
    const name = df.columns.get(chart.getDimensions()[ix].index) ?? "";
    const item = {
      show: chart.isCartesian(),
      type: "category",
      name: string_exports.truncate(name, 42),
      nameGap: kind === "y" ? 85 : 30
    };
    if (chart.getChartType() === "bar") {
      item.nameGap = isLarge ? item.nameGap + 25 : item.nameGap;
      item.axisLabel = {
        interval: Math.floor((df.shape.height - 1) / 10),
        rotate: isLarge ? 30 : 0,
        formatter: categoryFormatter
      };
    }
    axes.push(addCommonFeatures(chart.getChartType(), item, kind));
  } else {
    const map = getMapOfValueAxes(chart);
    const keys = Array.from(map.keys());
    keys.sort().forEach((k) => {
      let metrics = map.get(k);
      if (chart.getChartType() === "scatter") {
        metrics = kind === "x" ? [metrics[0]] : [metrics[1]];
      }
      const name = metrics.length > 1 ? "" : df.columns.get(metrics[0].index) ?? "";
      const item = {
        show: chart.isCartesian(),
        type: "value",
        name: string_exports.truncate(name, 42),
        nameGap: kind === "x" ? 30 : 50,
        axisLabel: { formatter: valueFormatter }
      };
      axes.push(addCommonFeatures(chart.getChartType(), item, kind));
    });
  }
  return axes;
}
function isDimensionalAxis(chart, kind) {
  let dim = kind === "x";
  if (chart.getChartType() === "heatmap") {
    dim = true;
  } else if (chart.getChartType() === "scatter") {
    dim = false;
  } else if (chart.getStyleOrientation() === "horizontal") {
    dim = !dim;
  }
  return dim;
}
function addCommonFeatures(chartType, item, kind) {
  item.nameLocation = "center";
  item.nameTextStyle = { fontSize: 14 };
  if (kind === "y" || chartType === "scatter") {
    item.splitLine = {
      lineStyle: { type: "dashed", color: color_exports.ZINC_800 }
    };
  }
  return item;
}
function getMapOfValueAxes(chart) {
  const map = /* @__PURE__ */ new Map();
  if (["bar", "line"].includes(chart.getChartType())) {
    return chart.getMetrics().reduce((acc, m) => {
      const axis2 = m.axis ?? "left";
      if (acc.has(axis2)) {
        acc.get(axis2)?.push(m);
      } else {
        acc.set(axis2, [m]);
      }
      return acc;
    }, map);
  } else {
    map.set("left", chart.getMetrics());
  }
  return map;
}

// src/determine/calendar.ts
function calendar(chart, df) {
  if (chart.getChartType() !== "calendar")
    return null;
  const dim = chart.getGroupByDimension();
  if (!dim || dim.dataType === "category")
    return null;
  const years = Array.from(
    new Set(
      df.col(dim.index).map((v) => new Date(String(v))).map((d) => d.getUTCFullYear()).sort()
    )
  );
  return years.map((y, i) => {
    return {
      top: i * 130 + 90,
      right: 30,
      cellSize: ["auto", 13],
      range: String(y),
      itemStyle: {
        color: color_exports.ZINC_900,
        borderColor: color_exports.ZINC_500,
        borderWidth: 0.5
      },
      orient: "horizontal",
      splitLine: { lineStyle: { color: color_exports.ZINC_400, type: "solid" } }
    };
  });
}

// src/determine/datasets.ts
function datasets(chart, df) {
  const datasets2 = [df.asDataSet()];
  const groupBy = chart.getGroupByDimension();
  if (!groupBy)
    throw new Error("Group by dimension not found");
  const splitBy = chart.getBreakdownDimension();
  if (groupBy.dataType === "datetime") {
    df = formatDateTimeIndexForDF(df, groupBy.index);
  }
  const dfs = [];
  if (splitBy) {
    if (chart.getChartType() === "scatter") {
      dfs.push(
        ...array_exports.removeDuplicates(df.col(splitBy.index)).map((v) => df.filter(splitBy.index, (w) => w === v))
      );
    } else {
      const pivoted = df.pivot(
        groupBy.index,
        splitBy.index,
        chart.getMetrics()[0].index,
        chart.getMetrics()[0].aggregation
      );
      for (const k of pivoted.columns.keys()) {
        if (k !== 0) {
          dfs.push(pivoted.select([0, k]));
        }
      }
    }
  } else {
    dfs.push(df);
  }
  dfs.forEach((df2) => {
    if (["scatter", "heatmap"].includes(chart.getChartType())) {
      const metric = chart.getMetrics()[0];
      const dataset = df2.asDataSet();
      const name = !!splitBy ? df2.col(splitBy.index)[0] : "";
      const type = chart.getChartType();
      dataset.id = `${metric.index}::${type}::${datasets2.length}::${name}`;
      datasets2.push(dataset);
    } else {
      if (!!splitBy) {
        const metric = chart.getMetrics()[0];
        const dataset = df2.asDataSet();
        const name = df2.columns.get(1);
        const type = chart.getChartType();
        dataset.id = `${metric.index}::${type}::${datasets2.length}::${name}`;
        datasets2.push(dataset);
      } else {
        chart.getMetrics().forEach((metric) => {
          if (metric.aggregation === "none")
            throw new Error("Cannot be none");
          const dataset = df2.groupBy(metric.index, groupBy?.index, metric.aggregation).asDataSet();
          let name = df2.columns.get(metric.index);
          const uniqueMetricIndices = array_exports.removeDuplicates(
            chart.getMetrics().map((m) => m.index)
          ).length;
          const totalMetrics = chart.getMetrics().length;
          name = ["count", "distinct"].includes(metric.aggregation) || uniqueMetricIndices === 1 && totalMetrics > 1 ? `${name} (${metric.aggregation})` : name;
          const type = metric.chartType ?? chart.getChartType();
          dataset.id = `${metric.index}::${type}::${datasets2.length}::${name}`;
          datasets2.push(dataset);
        });
      }
    }
  });
  return datasets2;
}
function formatDateTimeIndexForDF(df, index) {
  let fmt = "";
  const values = df.col(index);
  const dates = values.map((v) => datetime_exports.toDateUTC(String(v)));
  if (dates.every((d) => datetime_exports.isStartOrEndOfYear(d))) {
    fmt = "y";
  } else if (dates.every((d) => datetime_exports.isStartOrEndOfQuarter(d))) {
    fmt = "yQq";
  } else if (dates.every((d) => datetime_exports.isStartOrEndOfMonth(d))) {
    fmt = "y-m";
  } else {
    fmt = "y-m-d";
  }
  return df.map(index, (v) => {
    const d = datetime_exports.toDateUTC(String(v));
    return datetime_exports.strftime(d, fmt);
  });
}

// src/determine/grid.ts
function grid(chart, datasets2) {
  const isLarge = datasets_exports.containsLargeData(datasets2);
  let grid2 = {
    show: false,
    containLabel: false,
    left: "12%",
    bottom: "12%",
    right: "9%"
  };
  if (chart.getChartType() === "bar") {
    if (chart.getStyleOrientation() === "vertical") {
      grid2.bottom = isLarge ? "18%" : "12%";
    } else {
      grid2.left = isLarge ? "18%" : "15%";
    }
  } else if (chart.getChartType() === "heatmap") {
    grid2.right = chart.getStyleColorGrouping() === "piecewise" ? "15%" : "11%";
  }
  return grid2;
}

// src/determine/legend.ts
function legend(chart) {
  return {
    show: chart.getStyleShowLegend(),
    left: "center",
    top: "2%"
  };
}

// src/determine/series.ts
function series(chart, datasets2) {
  const series2 = [];
  const colors = [];
  datasets2.slice(1).forEach((dataset) => {
    if (!dataset.id)
      throw new Error("Dataset for series must include ID");
    let [mix, t, dix, name] = dataset.id.split("::");
    const metric = chart.getMetric(
      (m) => m.index === Number(mix) && (m.chartType ?? chart.getChartType()) === t
    );
    if (!metric)
      throw new Error("Metric not found");
    const colorId = `${mix}-${metric.color}`;
    const c = colors.includes(colorId) ? array_exports.unboundedReadItem(color_exports.COLOR_PALETTE, Number(dix) - 1) : metric.color;
    colors.push(colorId);
    t = t === "calendar" ? "heatmap" : t;
    const item = {
      type: t,
      color: c,
      datasetIndex: Number(dix),
      name
    };
    if (chart.getStyleOrientation() === "horizontal") {
      item.xAxisIndex = 0;
      item.encode = { x: dataset.dimensions[1], y: dataset.dimensions[0] };
    } else if (chart.getChartType() === "pie") {
      item.encode = {
        itemName: dataset.dimensions[0],
        value: dataset.dimensions[1]
      };
      item.itemStyle = {
        borderColor: color_exports.ZINC_900,
        borderRadius: 10,
        borderWidth: 2
      };
      item.label = { color: color_exports.ZINC_500, show: true };
      item.yAxisIndex = 0;
      item.textStyle = { color: color_exports.ZINC_500 };
      item.radius = ["40%", "70%"];
    } else if (chart.getChartType() === "scatter") {
      const metrics = chart.getMetrics();
      item.symbolSize = 15;
      item.encode = {
        x: dataset.dimensions[metrics[0].index],
        y: dataset.dimensions[metrics[1].index],
        tooltip: [
          dataset.dimensions[chart.getGroupByDimension()?.index ?? 0],
          dataset.dimensions[metrics[0].index],
          dataset.dimensions[metrics[1].index]
        ]
      };
    } else if (chart.getChartType() === "calendar") {
      const df = DataFrame.fromDataSet(dataset);
      Array.from(
        new Set(
          df.col(0).map((v) => new Date(String(v))).map((d) => d.getUTCFullYear()).sort()
        )
      ).forEach((_, i) => {
        series2.push({
          type: "heatmap",
          coordinateSystem: "calendar",
          name,
          datasetIndex: 1,
          calendarIndex: i
        });
      });
      return;
    } else if (chart.getChartType() === "heatmap") {
      delete item.color;
      item.datasetIndex = 1;
      item.encode = {
        x: dataset.dimensions[0],
        y: dataset.dimensions[1],
        value: dataset.dimensions[2]
      };
      item.name = dataset.dimensions[2];
    } else {
      item.yAxisIndex = 0;
      item.encode = { x: dataset.dimensions[0], y: dataset.dimensions[1] };
    }
    if (chart.getStyleBarStyle() === "stacked" || chart.getStyleLineStyle() === "area") {
      item.stack = "total";
      if (chart.getChartType() === "line") {
        item.areaStyle = {};
      }
    }
    series2.push(item);
  });
  return series2;
}

// src/determine/title.ts
function title(chart, s) {
  return {
    show: chart.getStyleShowTitle(),
    text: string_exports.truncate(s, 42),
    top: "2%",
    left: "auto"
  };
}

// src/determine/toolbox.ts
function toolbox(chart) {
  return {
    show: chart.getStyleShowToolbox(),
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
}

// src/determine/tooltip.ts
function tooltip(chart) {
  const item = {
    show: true,
    trigger: !["line", "bar"].includes(chart.getChartType()) ? "item" : "axis"
  };
  if (["bar", "line"].includes(chart.getChartType())) {
    item.axisPointer = { type: "cross", crossStyle: { color: "#999999" } };
  }
  return item;
}

// src/determine/visualMap.ts
function visualMap(chart, datasets2) {
  if (!["heatmap", "calendar"].includes(chart.getChartType()))
    return null;
  const dataset = datasets2[1];
  if (!dataset)
    throw new Error("dataset not found");
  const df = DataFrame.fromDataSet(dataset);
  const metric = chart.getMetrics()[0];
  const ix = chart.getChartType() === "heatmap" ? metric.index : 1;
  const arr = df.col(ix).map((v) => Number(v));
  const isHeatmap = chart.getChartType() === "heatmap";
  return {
    inRange: {
      color: color_exports2.asArray(metric.color)
    },
    left: isHeatmap ? "right" : "center",
    top: isHeatmap ? "center" : 3,
    type: chart.getStyleColorGrouping() ?? "continuous",
    orient: isHeatmap ? "vertical" : "horizontal",
    min: Math.min(...arr),
    max: Math.max(...arr),
    calculable: true
  };
}

// src/chart.ts
var _Chart = class {
  constructor(chartType) {
    this.chartType = chartType;
    this.style = _Chart.defaultStyleOptions(this.chartType);
    this.dimensions = [];
    this.metrics = [];
  }
  static load(opts) {
    const manager = new _Chart(opts.chartType);
    manager.style = { ...manager.style, ...opts.style };
    opts.dimensions.forEach((d) => manager.addDimension(d));
    opts.metrics.forEach((m) => manager.addMetric(m));
    return manager;
  }
  static fromLegacy(opts) {
    switch (opts.type) {
      case "bar": {
        const chart = new _Chart("bar");
        const orientation = opts.features.orientation ?? "vertical";
        const dims = orientation === "vertical" ? opts.xAxis[0].columns : opts.yAxis[0].columns;
        const metrics = orientation === "vertical" ? opts.yAxis[0].columns : opts.xAxis[0].columns;
        dims.forEach(
          (col) => chart.addDimension({ index: col.index, dataType: "category" })
        );
        metrics.forEach(
          (col) => chart.addMetric({
            index: col.index,
            color: col.color ?? color_exports.LIME_200,
            chartType: col.type === "line" ? "line" : "bar",
            aggregation: "sum"
          })
        );
        chart.setStyleOption("showTitle", opts.features.title ?? false);
        chart.setStyleOption("showLegend", opts.features.legend ?? false);
        chart.setStyleOption(
          "barStyle",
          opts.features.stack ?? false ? "stacked" : "grouped"
        );
        chart.setStyleOption(
          "orientation",
          orientation === "vertical" ? "vertical" : "horizontal"
        );
        return chart;
      }
      case "line": {
        const chart = new _Chart("line");
        opts.xAxis[0].columns.forEach(
          (col) => chart.addDimension({ index: col.index, dataType: "category" })
        );
        opts.yAxis[0].columns.forEach(
          (col) => chart.addMetric({
            index: col.index,
            color: col.color ?? color_exports.LIME_200,
            chartType: col.type === "line" ? "line" : "bar",
            aggregation: "sum"
          })
        );
        chart.setStyleOption("showTitle", opts.features.title ?? false);
        chart.setStyleOption("showLegend", opts.features.legend ?? false);
        chart.setStyleOption(
          "lineStyle",
          opts.features.area ?? false ? "area" : "point"
        );
        return chart;
      }
      case "pie": {
        const chart = new _Chart("pie");
        chart.addDimension({
          index: opts.xAxis[0].columns[0].index,
          dataType: "category"
        });
        chart.addMetric({
          index: opts.yAxis[0].columns[0].index,
          color: opts.yAxis[0].columns[0].color ?? color_exports.LIME_PALETTE,
          aggregation: "sum"
        });
        chart.setStyleOption("showTitle", opts.features.title ?? false);
        return chart;
      }
      case "scatter": {
        const chart = new _Chart("scatter");
        [...opts.xAxis[0].columns, ...opts.yAxis[0].columns].forEach((col) => {
          chart.addMetric({
            index: col.index,
            color: col.color ?? color_exports.LIME_200,
            aggregation: "none"
          });
        });
        chart.addDimension({ index: 0, dataType: "category" });
        chart.setStyleOption("showTitle", opts.features.title ?? false);
        return chart;
      }
      case "heatmap": {
        if (!opts.zAxis)
          throw new Error("zAxis not found");
        const chart = new _Chart("heatmap");
        chart.addDimension({
          index: opts.xAxis[0].columns[0].index,
          dataType: "category"
        });
        chart.addDimension({
          index: opts.yAxis[0].columns[0].index,
          dataType: "category"
        });
        chart.addMetric({
          index: opts.zAxis[0].columns[0].index,
          color: opts.zAxis[0].columns[0].color ?? color_exports.LIME_PALETTE,
          aggregation: "none"
        });
        chart.setStyleOption("showTitle", opts.features.title ?? false);
        chart.setStyleOption(
          "colorGrouping",
          opts.features.piecewise ?? false ? "piecewise" : "continuous"
        );
        return chart;
      }
      case "calendar": {
        const chart = new _Chart("calendar");
        chart.addDimension({
          index: opts.xAxis[0].columns[0].index,
          dataType: "datetime"
        });
        chart.addMetric({
          index: opts.yAxis[0].columns[0].index,
          color: opts.yAxis[0].columns[0].color ?? color_exports.LIME_PALETTE,
          aggregation: "sum"
        });
        chart.setStyleOption("showTitle", opts.features.title ?? false);
        chart.setStyleOption(
          "colorGrouping",
          opts.features.piecewise ?? false ? "piecewise" : "continuous"
        );
        return chart;
      }
      default:
        throw new Error(`Type ${opts.type} is not supported`);
    }
  }
  static defaultStyleOptions(chartType) {
    switch (chartType) {
      case "bar":
        return {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical"
        };
      case "line":
        return {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point"
        };
      case "pie":
      case "scatter":
        return {
          showTitle: true,
          showToolbox: false
        };
      case "calendar":
      case "heatmap":
        return {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous"
        };
    }
  }
  convertTo(to) {
    const from = this.chartType;
    if (to === from)
      return this;
    switch (to) {
      case "bar":
        return this.toBarChart();
      case "line":
        return this.toLineChart();
      case "pie":
        return this.toPieChart();
      case "scatter":
        return this.toScatter();
      case "heatmap":
        return this.toHeatmap();
      case "calendar":
        return this.toCalendar();
    }
  }
  toBarChart() {
    const chart = new _Chart("bar");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    chart.addDimension(this.dimensions[0]);
    this.metrics.forEach(
      (metric) => chart.addMetric({
        index: metric.index,
        color: color_exports2.asSingleton(metric.color),
        aggregation: "sum"
      })
    );
    return chart;
  }
  toLineChart() {
    const chart = new _Chart("line");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    chart.addDimension(this.dimensions[0]);
    this.metrics.forEach((metric) => {
      chart.addMetric({
        index: metric.index,
        color: color_exports2.asSingleton(metric.color),
        aggregation: "sum"
      });
    });
    return chart;
  }
  toPieChart() {
    const chart = new _Chart("pie");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    chart.addDimension(this.dimensions[0]);
    chart.addMetric({
      index: this.metrics[0].index,
      color: color_exports2.asArray(this.metrics[0].color),
      aggregation: "sum"
    });
    return chart;
  }
  toScatter() {
    const chart = new _Chart("scatter");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    chart.addDimension(this.dimensions[0]);
    this.metrics.slice(0, 2).forEach(
      (metric) => chart.addMetric({
        index: metric.index,
        color: color_exports2.asSingleton(metric.color),
        aggregation: "none"
      })
    );
    if (chart.canAddMetric()) {
      chart.addMetric(chart.getMetrics()[0]);
    }
    return chart;
  }
  toHeatmap() {
    const chart = new _Chart("heatmap");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    this.dimensions.slice(0, 2).forEach((dim) => {
      chart.addDimension(dim);
    });
    if (chart.canAddDimension()) {
      chart.addDimension(chart.getDimensions()[0]);
    }
    chart.addMetric({
      index: this.metrics[0].index,
      color: color_exports2.asArray(this.metrics[0].color),
      aggregation: "none"
    });
    return chart;
  }
  toCalendar() {
    const chart = new _Chart("calendar");
    chart.setStyleOption("showTitle", this.getStyleShowTitle());
    const dim = this.dimensions.find((dim2) => dim2.dataType === "datetime");
    if (dim) {
      chart.addDimension({
        index: dim.index,
        dataType: "datetime"
      });
    } else {
      chart.addDimension({
        index: this.dimensions[0].index,
        dataType: "datetime"
      });
    }
    chart.addMetric({
      index: this.metrics[0].index,
      color: color_exports2.asArray(this.metrics[0].color),
      aggregation: "sum"
    });
    return chart;
  }
  compile(title2, data) {
    const df = new DataFrame(data);
    const datasets2 = datasets(this, df);
    return {
      animation: true,
      backgroundColor: color_exports.ZINC_900,
      calendar: calendar(this, df),
      dataset: datasets2,
      grid: grid(this, datasets2),
      legend: legend(this),
      series: series(this, datasets2),
      title: title(this, title2),
      toolbox: toolbox(this),
      tooltip: tooltip(this),
      visualMap: visualMap(this, datasets2),
      xAxis: axis(this, datasets2, "x"),
      yAxis: axis(this, datasets2, "y")
    };
  }
  canAddDimension() {
    if (["bar", "line", "scatter", "heatmap"].includes(this.chartType)) {
      return this.dimensions.length < 2 && this.metrics.length < 2;
    } else {
      return false;
    }
  }
  canAddMetric() {
    if (["bar", "line"].includes(this.chartType)) {
      return this.dimensions.length < 2;
    } else if (this.chartType === "scatter") {
      return this.metrics.length < 2;
    } else {
      return false;
    }
  }
  canAddAxis() {
    throw new Error("Not implemented");
  }
  getGroupByDimension() {
    return this.dimensions[0];
  }
  getBreakdownDimension() {
    return ["bar", "line", "scatter"].includes(this.chartType) ? this.dimensions[1] : void 0;
  }
  getOptions() {
    return {
      chartType: this.chartType,
      style: this.style,
      dimensions: this.dimensions,
      metrics: this.metrics
    };
  }
  getChartType() {
    return this.chartType;
  }
  isCartesian() {
    return !["pie", "calendar"].includes(this.chartType);
  }
  getStyleShowTitle() {
    return this.style.showTitle;
  }
  getStyleShowToolbox() {
    return this.style.showToolbox;
  }
  getStyleShowLegend() {
    if (["bar", "line"].includes(this.chartType)) {
      return this.style.showLegend;
    } else if (this.chartType === "scatter" && this.getBreakdownDimension()) {
      return true;
    }
    return false;
  }
  getStyleOrientation() {
    if (this.chartType === "bar") {
      return { ...this.style }.orientation;
    }
    return void 0;
  }
  getStyleBarStyle() {
    if (this.chartType === "bar") {
      return { ...this.style }.barStyle;
    }
    return void 0;
  }
  getStyleLineStyle() {
    if (this.chartType === "line") {
      return { ...this.style }.lineStyle;
    }
    return void 0;
  }
  getStyleColorGrouping() {
    if (["heatmap", "calendar"].includes(this.chartType)) {
      return this.style.colorGrouping;
    }
    return void 0;
  }
  setStyleOption(k, v) {
    this.style = { ...this.style, ...{ [k]: v } };
    return this;
  }
  addDimension(dim) {
    if (!this.canAddDimension)
      throw new Error("Cannot add another dimension");
    this.dimensions.push(dim);
    return this;
  }
  getDimensions() {
    return this.dimensions;
  }
  getDimension(where) {
    return this.dimensions.find((dim) => where(dim));
  }
  updateDimension(where, k, v) {
    const dim = this.dimensions.find((d) => where(d));
    if (!dim) {
      return this;
    }
    const ix = this.dimensions.indexOf(dim);
    this.dimensions[ix] = { ...this.dimensions[ix], ...{ [k]: v } };
    return this;
  }
  deleteDimension(where) {
    this.dimensions = this.dimensions.filter((d) => !where(d));
    return this;
  }
  addMetric(metric) {
    if (!this.canAddMetric)
      throw new Error("Cannot add another metric");
    this.metrics.push(metric);
    return this;
  }
  getMetrics() {
    return this.metrics;
  }
  getMetric(where) {
    return this.metrics.find((m) => where(m));
  }
  updateMetric(where, k, v) {
    const metric = this.metrics.find((m) => where(m));
    if (!metric) {
      return this;
    }
    const ix = this.metrics.indexOf(metric);
    this.metrics[ix] = { ...this.metrics[ix], ...{ [k]: v } };
    return this;
  }
  deleteMetric(where) {
    this.metrics = this.metrics.filter((m) => !where(m));
    return this;
  }
};
var Chart = _Chart;
__decorateClass([
  profile
], Chart.prototype, "compile", 1);

// src/factory.ts
var COLORS = [color_exports.LIME_200, ...color_exports.COLOR_PALETTE.slice(1)];
var AutoChartFactory = class {
  constructor(opts) {
    this.subsetQ = array_exports.getAllSubsets(opts, 2);
    this.createQ = [];
    while (this.subsetQ.length > 0) {
      const subset = this.subsetQ.shift();
      if (subset) {
        this.addAllCreateChartMessagesToQueue(subset);
      }
    }
    this.createQ = array_exports.removeDuplicates(this.createQ);
  }
  addAllCreateChartMessagesToQueue(opts) {
    const dims = opts.filter(
      (opt) => ["category", "datetime"].includes(opt.dataType)
    );
    if (dims.length < 1) {
      return;
    }
    const metrics = opts.filter((opt) => opt.dataType === "value");
    if (dims.length === 1) {
      if (metrics.length === 1) {
        if (dims[0].dataType === "category") {
          ["bar", "pie"].forEach(
            (t) => this.createQ.push({ type: t, dimensions: dims, metrics })
          );
        } else if (dims[0].dataType === "datetime") {
          ["line", "calendar"].forEach(
            (t) => this.createQ.push({ type: t, dimensions: dims, metrics })
          );
        }
      } else if (metrics.length === 2) {
        if (dims[0].dataType === "category") {
          ["bar", "scatter"].forEach(
            (t) => this.createQ.push({ type: t, dimensions: dims, metrics })
          );
        } else if (dims[0].dataType === "datetime") {
          ["line", "scatter"].forEach(
            (t) => this.createQ.push({ type: t, dimensions: dims, metrics })
          );
        }
      } else {
        if (dims[0].dataType === "category") {
          this.createQ.push({
            type: "bar",
            dimensions: dims,
            metrics
          });
        } else if (dims[0].dataType === "datetime") {
          this.createQ.push({
            type: "line",
            dimensions: dims,
            metrics
          });
        }
      }
    } else if (dims.length === 2) {
      if (metrics.length === 1) {
        if (dims[0].dataType === "datetime" && dims[1].dataType === "category") {
          ["line", "heatmap"].forEach(
            (t) => this.createQ.push({ type: t, dimensions: dims, metrics })
          );
        } else if (dims[0].dataType === "category" && dims[1].dataType === "category") {
          ["bar", "heatmap"].forEach(
            (t) => this.createQ.push({ type: t, dimensions: dims, metrics })
          );
        } else if (dims[0].dataType === "category" && dims[1].dataType === "datetime") {
          this.createQ.push({
            type: "heatmap",
            dimensions: dims,
            metrics
          });
        } else {
          return;
        }
      } else {
        return;
      }
    } else {
      return;
    }
  }
  generateSingleChart() {
    const msg = this.createQ.shift();
    if (!msg)
      throw new Error("No more charts to generate");
    const chart = new Chart(msg.type);
    msg.dimensions.forEach(
      (opt) => chart.addDimension({
        index: opt.index,
        dataType: opt.dataType
      })
    );
    msg.metrics.forEach((opt, i) => {
      const colorChoice = ["pie", "calendar", "heatmap"].includes(msg.type) ? color_exports.LIME_PALETTE : array_exports.unboundedReadItem(COLORS, i);
      const aggregation = ["scatter", "heatmap"].includes(msg.type) ? "none" : "sum";
      chart.addMetric({
        index: opt.index,
        color: colorChoice,
        aggregation
      });
    });
    return chart;
  }
  generateAllCharts() {
    const charts = [];
    while (this.createQ.length > 0) {
      const chart = this.generateSingleChart();
      charts.push(chart);
    }
    return charts;
  }
};

// src/main.ts
function create(type) {
  return new Chart(type);
}
function load(opts) {
  return "chartType" in opts ? Chart.load(opts) : Chart.fromLegacy(opts);
}
function* chartGenerator(columns) {
  let i = 0;
  const factory = new AutoChartFactory(columns);
  const charts = factory.generateAllCharts();
  while (true) {
    yield array_exports.unboundedReadItem(charts, i);
    i++;
  }
}

// src/types/echarts/index.ts
var echarts_exports = {};

// src/index.ts
var src_default = main_exports;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Chart,
  echarts
});
