import { describe, expect, it } from "vitest";
import data from "../fixtures";

import chartlib from "../../src";
import { valueFormatter, axisFormatter } from "../../src/formatters";
import { color } from "../../src/constants";

describe("given 1 dimension and 1 aggregate metric", () => {
  const chart = chartlib
    .create("line")
    .addDimension({ index: 0, dataType: "datetime" })
    .addMetric({
      index: 2,
      color: color.LIME_200,
      aggregation: "sum",
    });
  it("can compile to point line chart", () => {
    expect(chart.compile("My chart", data["dailyUsersByMobileOS"])).toEqual({
      animation: true,
      backgroundColor: "#18181b",
      calendar: null,
      dataset: [
        {
          dimensions: ["date", "os", "users"],
          source: [
            ["2020-01-01", "iOS", 300],
            ["2020-01-02", "iOS", 310],
            ["2020-01-03", "iOS", 305],
            ["2020-01-03", "iOS", 305],
            ["2020-01-01", "Android", 500],
            ["2020-01-02", "Android", 497],
            ["2020-01-03", "Android", 550],
            ["2020-01-03", "Android", 580],
          ],
        },
        {
          id: "2::line::1::users::0",
          dimensions: ["date", "users"],
          source: [
            ["2020-01-01", 800],
            ["2020-01-02", 807],
            ["2020-01-03", 1740],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "12%",
        right: "9%",
        top: "10%",
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
        type: "scroll",
        textStyle: {
          color: "#d4d4d8",
        },
      },
      series: [
        {
          type: "line",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { x: "date", y: "users" },
          name: "users",
          yAxisIndex: 0,
        },
      ],
      title: {
        left: "center",
        show: false,
        text: "My chart",
        top: "2%",
      },
      toolbox: {
        feature: {
          dataView: {
            readOnly: true,
            show: true,
          },
          saveAsImage: {
            show: true,
            type: "png",
          },
        },
        show: false,
      },
      tooltip: {
        confine: true,
        backgroundColor: "#18181b",
        borderColor: "#71717a",
        textStyle: {
          color: "#d4d4d8",
        },
        axisPointer: {
          crossStyle: {
            color: "#999999",
          },
          type: "cross",
          label: {
            backgroundColor: "#71717a",
          },
        },
        show: true,
        trigger: "axis",
      },
      visualMap: null,
      xAxis: [
        {
          axisLabel: {
            color: "#a1a1aa",
            formatter: axisFormatter,
            interval: 0,
            rotate: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#a1a1aa",
            },
          },
          name: "date",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: true,
          type: "category",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            color: "#a1a1aa",
            formatter: valueFormatter,
          },
          axisLine: {
            color: "#a1a1aa",
          },
          name: "users",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: true,
          splitLine: {
            lineStyle: {
              color: "#27272a",
              type: "dashed",
            },
          },
          type: "value",
        },
      ],
    });
  });
});

describe("given 2 dimensions and 1 aggregate metric", () => {
  const chart = chartlib
    .create("line")
    .addDimension({ index: 0, dataType: "datetime" })
    .addDimension({ index: 1, dataType: "category" })
    .addMetric({
      index: 2,
      color: color.LIME_200,
      aggregation: "sum",
    });
  it("can compile to point line chart", () => {
    expect(chart.compile("My chart", data["dailyUsersByMobileOS"])).toEqual({
      animation: true,
      backgroundColor: "#18181b",
      calendar: null,
      dataset: [
        {
          dimensions: ["date", "os", "users"],
          source: [
            ["2020-01-01", "iOS", 300],
            ["2020-01-02", "iOS", 310],
            ["2020-01-03", "iOS", 305],
            ["2020-01-03", "iOS", 305],
            ["2020-01-01", "Android", 500],
            ["2020-01-02", "Android", 497],
            ["2020-01-03", "Android", 550],
            ["2020-01-03", "Android", 580],
          ],
        },
        {
          id: "2::line::1::iOS::0",
          dimensions: ["date", "iOS"],
          source: [
            ["2020-01-01", 300],
            ["2020-01-02", 310],
            ["2020-01-03", 610],
          ],
        },
        {
          id: "2::line::2::Android::0",
          dimensions: ["date", "Android"],
          source: [
            ["2020-01-01", 500],
            ["2020-01-02", 497],
            ["2020-01-03", 1130],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "12%",
        right: "9%",
        top: "10%",
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        textStyle: {
          color: "#d4d4d8",
        },
        top: "2%",
        type: "scroll",
      },
      series: [
        {
          type: "line",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { x: "date", y: "iOS" },
          name: "iOS",
          yAxisIndex: 0,
        },
        {
          type: "line",
          color: "#2f4b7c",
          datasetIndex: 2,
          encode: { x: "date", y: "Android" },
          name: "Android",
          yAxisIndex: 0,
        },
      ],
      title: {
        left: "center",
        show: false,
        text: "My chart",
        top: "2%",
      },
      toolbox: {
        feature: {
          dataView: {
            readOnly: true,
            show: true,
          },
          saveAsImage: {
            show: true,
            type: "png",
          },
        },
        show: false,
      },
      tooltip: {
        confine: true,
        backgroundColor: "#18181b",
        borderColor: "#71717a",
        textStyle: {
          color: "#d4d4d8",
        },
        axisPointer: {
          crossStyle: {
            color: "#999999",
          },
          label: {
            backgroundColor: "#71717a",
          },
          type: "cross",
        },
        show: true,
        trigger: "axis",
      },
      visualMap: null,
      xAxis: [
        {
          axisLabel: {
            color: "#a1a1aa",
            formatter: axisFormatter,
            interval: 0,
            rotate: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#a1a1aa",
            },
          },
          name: "date",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: true,
          type: "category",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            color: "#a1a1aa",
            formatter: valueFormatter,
          },
          axisLine: {
            color: "#a1a1aa",
          },
          name: "users",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: true,
          splitLine: {
            lineStyle: {
              color: "#27272a",
              type: "dashed",
            },
          },
          type: "value",
        },
      ],
    });
  });
  it("can compile to area line chart", () => {
    chart.setStyleOption("lineStyle", "area");
    expect(chart.compile("My chart", data["dailyUsersByMobileOS"])).toEqual({
      animation: true,
      backgroundColor: "#18181b",
      calendar: null,
      dataset: [
        {
          dimensions: ["date", "os", "users"],
          source: [
            ["2020-01-01", "iOS", 300],
            ["2020-01-02", "iOS", 310],
            ["2020-01-03", "iOS", 305],
            ["2020-01-03", "iOS", 305],
            ["2020-01-01", "Android", 500],
            ["2020-01-02", "Android", 497],
            ["2020-01-03", "Android", 550],
            ["2020-01-03", "Android", 580],
          ],
        },
        {
          id: "2::line::1::iOS::0",
          dimensions: ["date", "iOS"],
          source: [
            ["2020-01-01", 300],
            ["2020-01-02", 310],
            ["2020-01-03", 610],
          ],
        },
        {
          id: "2::line::2::Android::0",
          dimensions: ["date", "Android"],
          source: [
            ["2020-01-01", 500],
            ["2020-01-02", 497],
            ["2020-01-03", 1130],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "12%",
        right: "9%",
        top: "10%",
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
        type: "scroll",
        textStyle: {
          color: "#d4d4d8",
        },
      },
      series: [
        {
          type: "line",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { x: "date", y: "iOS" },
          name: "iOS",
          yAxisIndex: 0,
          areaStyle: {},
          stack: "total",
        },
        {
          type: "line",
          color: "#2f4b7c",
          datasetIndex: 2,
          encode: { x: "date", y: "Android" },
          name: "Android",
          yAxisIndex: 0,
          areaStyle: {},
          stack: "total",
        },
      ],
      title: {
        left: "center",
        show: false,
        text: "My chart",
        top: "2%",
      },
      toolbox: {
        feature: {
          dataView: {
            readOnly: true,
            show: true,
          },
          saveAsImage: {
            show: true,
            type: "png",
          },
        },
        show: false,
      },
      tooltip: {
        confine: true,
        backgroundColor: "#18181b",
        borderColor: "#71717a",
        textStyle: {
          color: "#d4d4d8",
        },
        axisPointer: {
          crossStyle: {
            color: "#999999",
          },
          label: {
            backgroundColor: "#71717a",
          },
          type: "cross",
        },
        show: true,
        trigger: "axis",
      },
      visualMap: null,
      xAxis: [
        {
          axisLabel: {
            color: "#a1a1aa",
            formatter: axisFormatter,
            interval: 0,
            rotate: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#a1a1aa",
            },
          },
          name: "date",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: true,
          type: "category",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            color: "#a1a1aa",
            formatter: valueFormatter,
          },
          axisLine: {
            color: "#a1a1aa",
          },
          name: "users",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: true,
          splitLine: {
            lineStyle: {
              color: "#27272a",
              type: "dashed",
            },
          },
          type: "value",
        },
      ],
    });
  });
});

describe("given 1 dimension and 2 or more aggregate metrics", () => {
  const chart = chartlib
    .create("line")
    .addDimension({ index: 0, dataType: "datetime" })
    .addMetric({
      index: 1,
      color: color.LIME_200,
      aggregation: "count",
    })
    .addMetric({
      index: 2,
      color: color.DARK_BLUE,
      aggregation: "distinct",
    });
  it("can compile to point line chart", () => {
    expect(chart.compile("My chart", data["clickStreamEvents"])).toEqual({
      animation: true,
      backgroundColor: "#18181b",
      calendar: null,
      dataset: [
        {
          dimensions: ["date", "event", "user_id"],
          source: [
            ["2020-01-01", "click", "123"],
            ["2020-01-01", "pageview", "123"],
            ["2020-01-02", "pageview", "123"],
            ["2020-01-02", "pageview", "456"],
            ["2020-01-02", "click", "456"],
          ],
        },
        {
          id: "1::line::1::event (count)::0",
          dimensions: ["date", "event"],
          source: [
            ["2020-01-01", 2],
            ["2020-01-02", 3],
          ],
        },
        {
          id: "2::line::2::user_id (distinct)::1",
          dimensions: ["date", "user_id"],
          source: [
            ["2020-01-01", 1],
            ["2020-01-02", 2],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "12%",
        right: "9%",
        top: "10%",
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
        type: "scroll",
        textStyle: {
          color: "#d4d4d8",
        },
      },
      series: [
        {
          type: "line",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { x: "date", y: "event" },
          name: "event (count)",
          yAxisIndex: 0,
        },
        {
          type: "line",
          color: "#2f4b7c",
          datasetIndex: 2,
          encode: { x: "date", y: "user_id" },
          name: "user_id (distinct)",
          yAxisIndex: 0,
        },
      ],
      title: {
        left: "center",
        show: false,
        text: "My chart",
        top: "2%",
      },
      toolbox: {
        feature: {
          dataView: {
            readOnly: true,
            show: true,
          },
          saveAsImage: {
            show: true,
            type: "png",
          },
        },
        show: false,
      },
      tooltip: {
        confine: true,
        backgroundColor: "#18181b",
        borderColor: "#71717a",
        textStyle: {
          color: "#d4d4d8",
        },
        axisPointer: {
          crossStyle: {
            color: "#999999",
          },
          label: {
            backgroundColor: "#71717a",
          },
          type: "cross",
        },
        show: true,
        trigger: "axis",
      },
      visualMap: null,
      xAxis: [
        {
          axisLabel: {
            color: "#a1a1aa",
            formatter: axisFormatter,
            interval: 0,
            rotate: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#a1a1aa",
            },
          },
          name: "date",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: true,
          type: "category",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            color: "#a1a1aa",
            formatter: valueFormatter,
          },
          axisLine: {
            color: "#a1a1aa",
          },
          name: "",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: true,
          splitLine: {
            lineStyle: {
              color: "#27272a",
              type: "dashed",
            },
          },
          type: "value",
        },
      ],
    });
  });
  it("can compile to area line chart", () => {
    chart.setStyleOption("lineStyle", "area");
    expect(chart.compile("My chart", data["clickStreamEvents"])).toEqual({
      animation: true,
      backgroundColor: "#18181b",
      calendar: null,
      dataset: [
        {
          dimensions: ["date", "event", "user_id"],
          source: [
            ["2020-01-01", "click", "123"],
            ["2020-01-01", "pageview", "123"],
            ["2020-01-02", "pageview", "123"],
            ["2020-01-02", "pageview", "456"],
            ["2020-01-02", "click", "456"],
          ],
        },
        {
          id: "1::line::1::event (count)::0",
          dimensions: ["date", "event"],
          source: [
            ["2020-01-01", 2],
            ["2020-01-02", 3],
          ],
        },
        {
          id: "2::line::2::user_id (distinct)::1",
          dimensions: ["date", "user_id"],
          source: [
            ["2020-01-01", 1],
            ["2020-01-02", 2],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "12%",
        right: "9%",
        top: "10%",
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
        type: "scroll",
        textStyle: {
          color: "#d4d4d8",
        },
      },
      series: [
        {
          type: "line",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { x: "date", y: "event" },
          name: "event (count)",
          yAxisIndex: 0,
          areaStyle: {},
          stack: "total",
        },
        {
          type: "line",
          color: "#2f4b7c",
          datasetIndex: 2,
          encode: { x: "date", y: "user_id" },
          name: "user_id (distinct)",
          yAxisIndex: 0,
          areaStyle: {},
          stack: "total",
        },
      ],
      title: {
        left: "center",
        show: false,
        text: "My chart",
        top: "2%",
      },
      toolbox: {
        feature: {
          dataView: {
            readOnly: true,
            show: true,
          },
          saveAsImage: {
            show: true,
            type: "png",
          },
        },
        show: false,
      },
      tooltip: {
        confine: true,
        backgroundColor: "#18181b",
        borderColor: "#71717a",
        textStyle: {
          color: "#d4d4d8",
        },
        axisPointer: {
          crossStyle: {
            color: "#999999",
          },
          label: {
            backgroundColor: "#71717a",
          },
          type: "cross",
        },
        show: true,
        trigger: "axis",
      },
      visualMap: null,
      xAxis: [
        {
          axisLabel: {
            color: "#a1a1aa",
            formatter: axisFormatter,
            interval: 0,
            rotate: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#a1a1aa",
            },
          },
          name: "date",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: true,
          type: "category",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            color: "#a1a1aa",
            formatter: valueFormatter,
          },
          axisLine: {
            color: "#a1a1aa",
          },
          name: "",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: true,
          splitLine: {
            lineStyle: {
              color: "#27272a",
              type: "dashed",
            },
          },
          type: "value",
        },
      ],
    });
  });
});

describe("given 1 dimension and 2 aggregate metrics, each with different axes", () => {
  const chart = chartlib
    .create("line")
    .addDimension({ index: 0, dataType: "datetime" })
    .addMetric({
      index: 1,
      color: color.LIME_200,
      aggregation: "count",
      axis: "left",
    })
    .addMetric({
      index: 2,
      color: color.DARK_BLUE,
      aggregation: "distinct",
      axis: "right",
    });
  it("can compile to point line chart", () => {
    expect(chart.compile("My chart", data["clickStreamEvents"])).toEqual({
      animation: true,
      backgroundColor: "#18181b",
      calendar: null,
      dataset: [
        {
          dimensions: ["date", "event", "user_id"],
          source: [
            ["2020-01-01", "click", "123"],
            ["2020-01-01", "pageview", "123"],
            ["2020-01-02", "pageview", "123"],
            ["2020-01-02", "pageview", "456"],
            ["2020-01-02", "click", "456"],
          ],
        },
        {
          id: "1::line::1::event (count)::0",
          dimensions: ["date", "event"],
          source: [
            ["2020-01-01", 2],
            ["2020-01-02", 3],
          ],
        },
        {
          id: "2::line::2::user_id (distinct)::1",
          dimensions: ["date", "user_id"],
          source: [
            ["2020-01-01", 1],
            ["2020-01-02", 2],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "12%",
        right: "12%",
        top: "10%",
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
        type: "scroll",
        textStyle: {
          color: "#d4d4d8",
        },
      },
      series: [
        {
          type: "line",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { x: "date", y: "event" },
          name: "event (count)",
          yAxisIndex: 0,
        },
        {
          type: "line",
          color: "#2f4b7c",
          datasetIndex: 2,
          encode: { x: "date", y: "user_id" },
          name: "user_id (distinct)",
          yAxisIndex: 1,
        },
      ],
      title: {
        left: "center",
        show: false,
        text: "My chart",
        top: "2%",
      },
      toolbox: {
        feature: {
          dataView: {
            readOnly: true,
            show: true,
          },
          saveAsImage: {
            show: true,
            type: "png",
          },
        },
        show: false,
      },
      tooltip: {
        confine: true,
        backgroundColor: "#18181b",
        borderColor: "#71717a",
        textStyle: {
          color: "#d4d4d8",
        },
        axisPointer: {
          crossStyle: {
            color: "#999999",
          },
          label: {
            backgroundColor: "#71717a",
          },
          type: "cross",
        },
        show: true,
        trigger: "axis",
      },
      visualMap: null,
      xAxis: [
        {
          axisLabel: {
            color: "#a1a1aa",
            formatter: axisFormatter,
            interval: 0,
            rotate: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#a1a1aa",
            },
          },
          name: "date",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: true,
          type: "category",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            color: "#a1a1aa",
            formatter: valueFormatter,
          },
          axisLine: {
            color: "#a1a1aa",
          },
          name: "event",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: true,
          splitLine: {
            lineStyle: {
              color: "#27272a",
              type: "dashed",
            },
          },
          type: "value",
        },
        {
          axisLabel: {
            color: "#a1a1aa",
            formatter: valueFormatter,
          },
          axisLine: {
            color: "#a1a1aa",
          },
          name: "user_id",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: true,
          splitLine: {
            lineStyle: {
              color: "#27272a",
              type: "dashed",
            },
          },
          type: "value",
        },
      ],
    });
  });
});
