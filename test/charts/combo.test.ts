import { describe, expect, it } from "vitest";
import data from "../fixtures";

import chartlib from "../../src";
import { categoryFormatter, valueFormatter } from "../../src/formatters";
import { color } from "../../src/constants";

describe("given 1 dimension and 2 aggregate metrics", () => {
  const chart = chartlib
    .create("bar")
    .setStyleOption("barStyle", "stacked")
    .addDimension({ index: 0, dataType: "datetime" })
    .addMetric({
      index: 2,
      chartType: "bar",
      color: color.LIME_200,
      aggregation: "sum",
    })
    .addMetric({
      index: 2,
      chartType: "line",
      color: color.LIGHT_PINK,
      aggregation: "avg",
    });
  it("can compile to combo chart", () => {
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
          id: "2::bar::1::users (sum)::0",
          dimensions: ["date", "users"],
          source: [
            ["2020-01-01", 800],
            ["2020-01-02", 807],
            ["2020-01-03", 1740],
          ],
        },
        {
          id: "2::line::2::users (avg)::1",
          dimensions: ["date", "users"],
          source: [
            ["2020-01-01", 400],
            ["2020-01-02", 403.5],
            ["2020-01-03", 435],
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
          name: "users (sum)",
          yAxisIndex: 0,
          stack: "total",
        },
        {
          type: "line",
          color: "#f95d6a",
          datasetIndex: 2,
          encode: { x: "date", y: "users" },
          name: "users (avg)",
          yAxisIndex: 0,
          stack: "",
        },
      ],
      title: {
        left: "auto",
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
