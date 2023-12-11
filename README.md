# @definite/chartlib

## Chart Options Schema

📑 [Spec](./schema.json)

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
    lineStyle: "point" | "area",
    // calendar and heatmap
    colorGrouping: "continuous" | "piecewise"
  },
  dimensions: [
    {
      index: number,
      dataType: "category" | "datetime",
    },
    ...
  ],
  metrics: [
    {
      index: number,
      color: string | string[],
      aggregation: "none" | "avg" | "count" | "distinct" | "sum" | "min" | "max",
      axis?: "left" | "right",
      dataType?: "value",
      chartType?: "bar" | "line" | "pie" | "scatter" | "calendar" | "heatmap",
      format?: "percent" | "currency" | "number",
    },
    ...
  ]
}
```

## Usage

The main functionality of this module is to generate an `ECOption` object from a given set of information. Rendering charts is outside the scope of this module and should be done with Echarts.

See tests for more usage examples.

```ts
import chartlib from "@definite/chartlib";

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

const chart = chartlib
  .create("line")
  .setStyleOption("showLegend", true)
  .addDimension({ index: 0, dataType: "datetime" })
  .addMetric({ index: 1, dataType: "value", color: "#3377ff" })
  .addMetric({ index: 2, dataType: "value", color: "#ff3333" });

chart.compile("My Chart Title", data) // dumps to ECOption
```
