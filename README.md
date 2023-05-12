# @definite/chartlib

Unified charting library

## Supported Chart Types

| Chart Type     | X-Axis Data Type | Y-Axis Data Type | Multiple Y-Axes |
| -------------- | :--------------: | :--------------: | :-------------: |
| Pie            |   Categorical    |      Value       |        ❌        |
| Line           |   Categorical    |      Value       |        ✅        |
| Combo          |   Categorical    |      Value       |        ✅        |
| Scatter        |      Value       |      Value       |        ❌        |
| Vertical Bar   |   Categorical    |      Value       |        ❌        |
| Horizontal Bar |      Value       |   Categorical    |        ❌        |

## Configuration Schema

```ts
{
  name: string,
  type: "pie" | "line" | "scatter" | "bar", // combo is implicit
  features: {
    title: boolean | undefined,
    legend: boolean | undefined,
    toolbox: boolean | undefined,
    labels: boolean | undefined,
    stack: boolean | undefined,
    smooth: boolean | undefined,
    area: boolean | undefined,
    orientation: "vertical" | "horizontal" | undefined, // bar only
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
  ]
}
```

## Usage

The main functionality of this module is to generate an `ECOption` object from a given set of information. Rendering charts is outside the scope of this module and should be done with Echarts.

See tests for more configuration examples.

### Create option from block results

```ts
import chartlib from "@definite/chartlib"

const blockResult = {
  rows: [
    {
      date: "2020-01-01",
      total_users: 73,
      purchasing_users: 12,
    },
    {
      date: "2020-01-02",
      total_users: 84,
      purchasing_users: 17,
    },
    {
      date: "2020-01-03",
      total_users: 62,
      purchasing_users: 8,
    },
  ],
  schema: [
    { name: "date", type: "string" },
    { name: "total_users", type: "integer" },
    { name: "purchasing_users", type: "integer" },
  ],
};

const chartConfig = {
  name: "Daily Users",
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
