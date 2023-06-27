# @definite/chartlib

[![Test](https://github.com/luabase/definite-chartlib/actions/workflows/test.yml/badge.svg)](https://github.com/luabase/definite-chartlib/actions/workflows/test.yml)
[![Release](https://github.com/luabase/definite-chartlib/actions/workflows/release.yml/badge.svg)](https://github.com/luabase/definite-chartlib/actions/workflows/release.yml)

## Supported Matrix

| Chart Type       | X-Axis Data Type | Y-Axis Data Type | Multiple Y-Axes | Z-Axis |
| ---------------- | :--------------: | :--------------: | :-------------: | :----: |
| Pie              |   Categorical    |      Value       |        ❌        |   ❌    |
| Line             |   Categorical    |      Value       |        ✅        |   ❌    |
| Scatter          |      Value       |      Value       |        ❌        |   ❌    |
| Vertical Bar     |   Categorical    |      Value       |        ✅        |   ❌    |
| Horizontal Bar   |      Value       |   Categorical    |        ✅        |   ❌    |
| Grid Heatmap     |     Category     |     Category     |        ❌        |   ✅    |
| Calendar Heatmap |     Category     |      Value       |        ❌        |   ❌    |

## Configuration Schema

📑 View full [JSON Schema](./schema.json)

```ts
{
  name: string,
  type: "bar" | "line" | "pie" | "scatter" | "heatmap" | "calendar", // combo is implicit
  features: {
    // common features (all chart types)
    title: boolean | undefined,
    legend: boolean | undefined,
    toolbox: boolean | undefined,
    labels: boolean | undefined,
    // line only
    smooth: boolean | undefined,
    area: boolean | undefined,
    // bar only
    stack: boolean | undefined,
    orientation: "vertical" | "horizontal" | undefined,
    // heatmaps only
    piecewise: boolean | undefined
  },
  // optional transformations
  transform: {
    filter: [
      {
        index: number,
        type: "<" | "<=" | ">" | ">=" | "=" | "!=",
        value: string | number,
        parser: "datetime" | undefined
      },
      ...
    ],
    aggregate: [
      {
        index: number,
        type: "avg" | "count" | "sum",
        groupBy: number
      },
      ...
    ],
    sort: [
      {
        index: number,
        order: "asc" | "desc",
        parser: "datetime" | undefined
      },
      ...
    ]
  },
  xAxis: [
    {
      columns: [
        {
          index: number,
          type: string | null,
          color: string | string[] | null
        },
        ...
      ]
    },
    ...
  ],
  yAxis: [
    {
      columns: [
        {
          index: number,
          type: string | null,
          color: string | string[] | null
        },
        ...
      ]
    },
    ...
  ],
  // only supported for select chart types
  zAxis: [
    {
      columns: [
        {
          index: number,
          type: string | null,
          color: string | string[] | null
        },
        ...
      ]
    },
    ...
  ]
}
```

## Usage

The main functionality of this module is to generate an `ECOption` object from a given set of information. Rendering charts is outside the scope of this module and should be done with Echarts.

See tests for more configuration examples.

### Create option from block results

```typescript
import chartlib from "@definite/chartlib"

const blockResult = {
  rows: [
    {
      date: "2020-01-01",
      visitors_from_search: 73,
      visitors_from_social: 12,
    },
    {
      date: "2020-01-02",
      visitors_from_search: 84,
      visitors_from_social: 17,
    },
    {
      date: "2020-01-03",
      visitors_from_search: 62,
      visitors_from_social: 8,
    },
  ],
  schema: [
    { name: "date", type: "string" },
    { name: "visitors_from_search", type: "integer" },
    { name: "visitors_from_social", type: "integer" },
  ],
};

const chartConfig = {
  name: "Visitor Attribution",
  type: "line",
  features: {},
  xAxis: [
    { 
      columns: [
        { index: 0, type: null, color: null }
      ] 
    }
  ],
  yAxis: [
    { 
      columns: [
        { index: 1, type: "line", color: "#d45087" },
        { index: 2, type: "line", color: "#2f4b7c" },
      ] 
    }
  ],
};

const ecOption = chartlib.ecOptionFromBlockResult(chartConfig, blockResult);
```

## Transforms
✨ **New in v0.7**

Transforms allow you to further process the data for visualization. Supported transformations:

| Type      | Description                                           |
| --------- | ----------------------------------------------------- |
| Filter    | Filter data on value comparison                       |
| Aggregate | Group data by some column and aggregate target column |
| Sort      | Sort the dataset by some column                       |

While the [config schema](#configuration-schema) allows for multiple items in each transformation type, only one transformation per type is currently supported.

### Chained Transforms

Although only one of each type of transformation is currently supported, multiple transformation types can be combined. Order of execution is as follows and the subsequent transform operates on the output of the previous transform:

Example transform config:

```ts
{
  transform: {
    filter: [
      {
        index: 0,
        type: "!=",
        value: "b"
      },
    ],
    aggregate: [
      {
        index: 1,
        type: "sum",
        groupBy: 0
      },
    ],
    sort: [
      {
        index: 1,
        order: "desc"
      },
    ]
  },
}
```

Execution overview:
```
START
+------+------+
| col1 | col2 |
+------+------+
|  a   |   1  |
|  a   |   2  |
|  b   |   1  |
|  b   |   2  |
|  c   |   1  |
|  c   |   3  |
+------+------+
       ⬇️
FILTER col1 != b
+------+------+
| col1 | col2 |
+------+------+
|  a   |   1  |
|  a   |   2  |
|  c   |   1  |
|  c   |   3  |
+------+------+
       ⬇️
AGGREGATE SUM(col2) GROUP BY col1
+------+------+
| col1 | col2 |
+------+------+
|  a   |   3  |
|  c   |   4  |
+------+------+
       ⬇️
SORT col2 DESC
+------+------+
| col1 | col2 |
+------+------+
|  c   |   4  |
|  a   |   3  |
+------+------+
END
```

🚧 **WARNING**: Transforms API is new and subject to change. Aggregates have not been tested and validated against all chart types.
