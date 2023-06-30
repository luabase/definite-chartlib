# @definite/chartlib

[![Test](https://github.com/luabase/definite-chartlib/actions/workflows/test.yml/badge.svg)](https://github.com/luabase/definite-chartlib/actions/workflows/test.yml)
[![Release](https://github.com/luabase/definite-chartlib/actions/workflows/release.yml/badge.svg)](https://github.com/luabase/definite-chartlib/actions/workflows/release.yml)

## Chart Options Schema

📑 View [JSON Schema](./schema.json)

```ts
{
  chartType: "bar" | "line" | "pie" | "scatter" | "calendar" | "heatmap",
  style: {
    showTitle: boolean,
    showToolbox: boolean,
    // bar and line only
    showLegend: boolean,
    // bar only
    barStyle: "grouped" | "stacked",
    orientation: "vertical" | "horizontal",
    // line only
    lineStyle: "point" | "smooth",
    showArea: boolean,
    // calendar and heatmap
    colorGrouping: "continuous" | "piecewise"
  }
  dimensions: [
    {
      index: number,
      dataType: "category" | "datetime" | "value"
    },
    ...
  ],
  metrics: [
    {
      index: number,
      dataType: "category" | "datetime" | "value",
      chartType?: "bar" | "line" | "pie" | "scatter" | "calendar" | "heatmap",
      color: string | string[],
      aggregation: "none" | "avg" | "count" | "distinct" | "sum" | "min" | "max",
      axis?: "left" | "right"
    },
    ...
  ]
}
```

## Usage

The main functionality of this module is to generate an `ECOption` object from a given set of information. Rendering charts is outside the scope of this module and should be done with Echarts.

See tests for more usage examples.

### Create new chart

```ts
import chart from "@definite/chartlib";

const data = [
  {
    date: "2020-01-01",
    pageviews: 73,
    clicks: 12,
  },
  {
    date: "2020-01-02",
    pageviews: 84,
    clicks: 17,
  },
  {
    date: "2020-01-03",
    pageviews: 62,
    clicks: 8,
  },
];

const conf = chart
  .config
  .create("line")
  .setStyleOption("showTitle", true)
  .setStyleOption("showLegend", true)
  .setStyleOption("lineStyle", "smooth")
  .addDimension({ index: 0, dataType: "datetime" })
  .addMetric({ index: 1, dataType: "value", color: "#3377ff" })
  .addMetric({ index: 2, dataType: "value", color: "#ff3333" });

console.log(conf.options);
console.log(chart.plot(data, conf));
```

### Load chart from config

```ts
import chart from "@definite/chartlib";

const data = [
  {
    date: "2020-01-01",
    pageviews: 73,
    clicks: 12,
  },
  {
    date: "2020-01-02",
    pageviews: 84,
    clicks: 17,
  },
  {
    date: "2020-01-03",
    pageviews: 62,
    clicks: 8,
  },
];

const options = {
  type: "line",
  style: {
    showTitle: true,
    showLegend: true,
    lineStyle: "smooth",
  },
  dimensions: [
    {
      index: 0,
      dataType: "datetime",
    },
  ],
  metrics: [
    {
      index: 1,
      dataType: "value",
      color: "#3377ff",
      aggregation: "sum",
    },
    {
      index: 2,
      dataType: "value",
      color: "#ff3333",
      aggregation: "sum",
    },
  ],
};

const conf = chart.config.load(options);
console.log(conf.options);
console.log(chart.plot(data, conf));
```
