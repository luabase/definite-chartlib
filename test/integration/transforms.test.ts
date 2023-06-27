import { describe, it, expect } from "vitest";
import chartlib, { ChartType, ChartConfig, color, format } from "../../src";

describe("given a set of data with 3 columns (3 cat, 1 val)", () => {
  const blockResults = {
    rows: [
      { date: "2020-01-01", month: "Jan", os: "iOS", users: 80 },
      { date: "2020-01-01", month: "Jan", os: "Android", users: 120 },
      { date: "2020-01-02", month: "Jan", os: "iOS", users: 86 },
      { date: "2020-01-02", month: "Jan", os: "Android", users: 143 },
      { date: "2020-02-01", month: "Feb", os: "iOS", users: 65 },
      { date: "2020-02-01", month: "Feb", os: "Android", users: 93 },
      { date: "2020-02-02", month: "Feb", os: "iOS", users: 76 },
      { date: "2020-02-02", month: "Feb", os: "Android", users: 118 },
      { date: "2020-03-01", month: "Mar", os: "iOS", users: 85 },
      { date: "2020-03-01", month: "Mar", os: "Android", users: 140 },
      { date: "2020-03-02", month: "Mar", os: "iOS", users: 81 },
      { date: "2020-03-02", month: "Mar", os: "Android", users: 135 },
    ],
    schema: [
      { name: "date", type: "string", sql_value_type: "DATE" },
      { name: "month", type: "string", sql_value_type: "TEXT" },
      { name: "os", type: "string", sql_value_type: "TEXT" },
      { name: "users", type: "number", sql_value_type: "INTEGER" },
    ],
  };
  describe("given a chart config with multiple transforms (1 filter, 1 aggregate, 1 sort", () => {
    const conf: ChartConfig = {
      name: "Total iOS Users by Month",
      type: ChartType.BAR,
      features: {
        title: true,
        legend: true,
      },
      transform: {
        filter: [
          {
            index: 2,
            type: "=",
            value: "iOS",
          },
        ],
        aggregate: [
          {
            index: 3,
            type: "sum",
            groupBy: 1,
          },
        ],
        sort: [
          {
            index: 1,
            order: "desc",
          },
        ],
      },
      xAxis: [{ columns: [{ index: 1, type: null, color: null }] }],
      yAxis: [
        { columns: [{ index: 3, type: ChartType.BAR, color: color.LIME_200 }] },
      ],
    };
    it("it can correctly transform the dataset and display the configured chart", () => {
      expect(chartlib.ecOptionFromBlockResult(conf, blockResults)).toEqual({
        title: {
          show: true,
          text: "Total iOS Users by Month",
          left: "auto",
          top: "2%",
        },
        legend: {
          show: true,
          type: "scroll",
          left: "center",
          top: "2%",
        },
        grid: {
          show: false,
          containLabel: false,
          left: "12%",
          bottom: "12%",
          right: "9%",
        },
        xAxis: [
          {
            type: "category",
            show: true,
            name: "month",
            nameLocation: "center",
            nameGap: 30,
            nameTextStyle: {
              fontSize: 14,
            },
            axisLabel: {
              formatter: format.categoricalValues,
              interval: 0,
              rotate: 0,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            show: true,
            name: "users",
            nameLocation: "center",
            nameGap: 50,
            nameTextStyle: {
              fontSize: 14,
            },
            splitLine: {
              lineStyle: {
                color: "#27272a",
                type: "dashed",
                width: 1,
              },
              show: true,
            },
            axisLabel: {
              formatter: format.numericalValues,
            },
          },
        ],
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999999",
            },
          },
        },
        toolbox: {
          show: false,
        },
        dataset: {
          dimensions: ["month", "users"],
          source: [
            ["Jan", 166],
            ["Mar", 166],
            ["Feb", 141],
          ],
        },
        series: [
          {
            type: "bar",
            color: "#d9f99d",
            yAxisIndex: 0,
            encode: { x: "month", y: "users" },
            name: "users",
          },
        ],
        visualMap: null,
        calendar: null,
        backgroundColor: "#18181b",
        animation: true,
      });
    });
  });
});
