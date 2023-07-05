import { describe, expect, it } from "vitest";
import * as fixtures from "./fixtures.json";

import chartlib from "../../src";
import { categoryFormatter, valueFormatter } from "../../src/formatters";
import { color } from "../../src/constants";

describe("given 1 dimension and 1 aggregate metric", () => {
  const data = fixtures["dailyUsersByMobileOS"];
  const chart = chartlib
    .create("bar")
    .addDimension({ index: 1, dataType: "category" })
    .addMetric({
      index: 2,
      dataType: "value",
      color: color.LIME_200,
      aggregation: "sum",
    });
  it("can compile to a vertical bar chart", () => {
    expect(chart.compile("My chart", data)).toEqual({
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
          id: "2::bar::1::users",
          dimensions: ["os", "users"],
          source: [
            ["iOS", 1220],
            ["Android", 2127],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "12%",
        right: "9%",
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
      },
      series: [
        {
          type: "bar",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { x: "os", y: "users" },
          name: "users",
          yAxisIndex: 0,
        },
      ],
      title: {
        left: "auto",
        show: true,
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
        axisPointer: {
          crossStyle: {
            color: "#999999",
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
            formatter: categoryFormatter,
            interval: 0,
            rotate: 0,
          },
          name: "os",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          show: true,
          type: "category",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: valueFormatter,
          },
          name: "users",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
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
  const data = fixtures["dailyUsersByMobileOS"];
  const chart = chartlib
    .create("bar")
    .addDimension({ index: 0, dataType: "datetime" })
    .addDimension({ index: 1, dataType: "category" })
    .addMetric({
      index: 2,
      dataType: "value",
      color: color.LIME_200,
      aggregation: "sum",
    });
  it("can compile to a vertical bar chart", () => {
    expect(chart.compile("My chart", data)).toEqual({
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
          id: "2::bar::1::iOS",
          dimensions: ["date", "users"],
          source: [
            ["2020-01-01", 300],
            ["2020-01-02", 310],
            ["2020-01-03", 610],
          ],
        },
        {
          id: "2::bar::2::Android",
          dimensions: ["date", "users"],
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
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
      },
      series: [
        {
          type: "bar",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { x: "date", y: "users" },
          name: "iOS",
          yAxisIndex: 0,
        },
        {
          type: "bar",
          color: "#2f4b7c",
          datasetIndex: 2,
          encode: { x: "date", y: "users" },
          name: "Android",
          yAxisIndex: 0,
        },
      ],
      title: {
        left: "auto",
        show: true,
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
        axisPointer: {
          crossStyle: {
            color: "#999999",
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
            formatter: categoryFormatter,
            interval: 0,
            rotate: 0,
          },
          name: "date",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          show: true,
          type: "category",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: valueFormatter,
          },
          name: "users",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
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

describe("given 1 dimension and 2 aggregate metrics", () => {
  const data = fixtures["clickStreamEvents"];
  const chart = chartlib
    .create("bar")
    .addDimension({ index: 0, dataType: "datetime" })
    .addMetric({
      index: 1,
      dataType: "value",
      color: color.LIME_200,
      aggregation: "count",
    })
    .addMetric({
      index: 2,
      dataType: "value",
      color: color.DARK_BLUE,
      aggregation: "distinct",
    });
  it("can compile to a vertical bar chart", () => {
    expect(chart.compile("My chart", data)).toEqual({
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
          id: "1::bar::1::event (count)",
          dimensions: ["date", "event"],
          source: [
            ["2020-01-01", 2],
            ["2020-01-02", 3],
          ],
        },
        {
          id: "2::bar::2::user_id (distinct)",
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
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
      },
      series: [
        {
          type: "bar",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { x: "date", y: "event" },
          name: "event (count)",
          yAxisIndex: 0,
        },
        {
          type: "bar",
          color: "#2f4b7c",
          datasetIndex: 2,
          encode: { x: "date", y: "user_id" },
          name: "user_id (distinct)",
          yAxisIndex: 0,
        },
      ],
      title: {
        left: "auto",
        show: true,
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
        axisPointer: {
          crossStyle: {
            color: "#999999",
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
            formatter: categoryFormatter,
            interval: 0,
            rotate: 0,
          },
          name: "date",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          show: true,
          type: "category",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: valueFormatter,
          },
          name: "",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
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
