import { describe, it, expect } from "vitest";
import chartlib, { ChartType } from "../../src";

describe("given dataset with one categorical and one value column", () => {
  it("can create simple line chart", () => {
    const conf = {
      name: "My chart",
      type: ChartType.LINE,
      features: {},
      xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
      yAxis: [
        { columns: [{ index: 1, type: ChartType.LINE, color: "#2f4b7c" }] },
      ],
    };
    const dataset = {
      dimensions: ["date", "amount"],
      source: [
        ["2020-01-01", 3],
        ["2020-02-01", 4],
        ["2020-03-01", 5],
      ],
    };
    const ecOption = chartlib.ecOptionFromDataset(conf, dataset);
    expect(ecOption).toEqual({
      title: {
        show: false,
        text: "My chart",
        left: "auto",
        top: "2%",
      },
      legend: {
        show: false,
        type: "scroll",
        left: "center",
        top: "2%",
      },
      grid: { show: false, containLabel: false, left: "12%", bottom: "12%", right: "9%" },
      xAxis: [
        {
          type: "category",
          show: true,
          name: "date",
          nameLocation: "center",
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          show: true,
          name: "amount",
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
        dimensions: ["date", "amount"],
        source: [
          ["2020-01", 3],
          ["2020-02", 4],
          ["2020-03", 5],
        ],
      },
      series: [
        {
          type: "line",
          color: "#2f4b7c",
          yAxisIndex: 0,
          encode: { x: "date", y: "amount" },
          name: "amount",
        },
      ],
      backgroundColor: "#18181b",
      animation: true,
    });
  });
});

describe("given dataset with one categorical and two value columns", () => {
  it("can create a line chart with 2 series on y-axis", () => {
    const conf = {
      name: "My chart",
      type: ChartType.LINE,
      features: {},
      xAxis: [
        {
          columns: [{ index: 0, type: null, color: null }],
        },
      ],
      yAxis: [
        {
          columns: [
            { index: 1, type: ChartType.LINE, color: "#ffffff" },
            { index: 2, type: ChartType.LINE, color: "#ffffff" },
          ],
        },
      ],
    };
    const dataset = {
      dimensions: ["year", "amount1", "amount2"],
      source: [
        ["2021-01-01", 2, 4],
        ["2022-01-01", 3, 6],
        ["2023-01-01", 5, 10],
      ],
    };
    const ecOption = chartlib.ecOptionFromDataset(conf, dataset);
    expect(ecOption).toEqual({
      title: {
        show: false,
        text: "My chart",
        left: "auto",
        top: "2%",
      },
      legend: {
        show: false,
        type: "scroll",
        left: "center",
        top: "2%",
      },
      grid: { show: false, containLabel: false, left: "12%", bottom: "12%", right: "9%" },
      xAxis: [
        {
          type: "category",
          show: true,
          name: "year",
          nameLocation: "center",
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          show: true,
          name: "amount1, amount2",
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
        dimensions: ["year", "amount1", "amount2"],
        source: [
          ["2021", 2, 4],
          ["2022", 3, 6],
          ["2023", 5, 10],
        ],
      },
      series: [
        {
          type: "line",
          color: "#ffffff",
          yAxisIndex: 0,
          encode: { x: "year", y: "amount1" },
          name: "amount1",
        },
        {
          type: "line",
          color: "#ffffff",
          yAxisIndex: 0,
          encode: { x: "year", y: "amount2" },
          name: "amount2",
        },
      ],
      backgroundColor: "#18181b",
      animation: true,
    });
  });
  it("can create a line chart with 2 y-axes, each with one series", () => {
    const conf = {
      name: "My chart",
      type: ChartType.LINE,
      features: {},
      xAxis: [
        {
          columns: [{ index: 0, type: null, color: null }],
        },
      ],
      yAxis: [
        { columns: [{ index: 1, type: ChartType.LINE, color: "#ffffff" }] },
        { columns: [{ index: 2, type: ChartType.LINE, color: "#ffffff" }] },
      ],
    };
    const dataset = {
      dimensions: ["year", "temp", "rainfall"],
      source: [
        ["2021", 66, 13],
        ["2022", 68, 12],
        ["2023", 71, 11],
      ],
    };
    const ecOption = chartlib.ecOptionFromDataset(conf, dataset);
    expect(ecOption).toEqual({
      title: {
        show: false,
        text: "My chart",
        left: "auto",
        top: "2%",
      },
      legend: {
        show: false,
        type: "scroll",
        left: "center",
        top: "2%",
      },
      grid: { show: false, containLabel: false, left: "12%", bottom: "12%", right: "9%" },
      xAxis: [
        {
          type: "category",
          show: true,
          name: "year",
          nameLocation: "center",
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          show: true,
          name: "temp",
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
        },
        {
          type: "value",
          show: true,
          name: "rainfall",
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
        dimensions: ["year", "temp", "rainfall"],
        source: [
          ["2021", 66, 13],
          ["2022", 68, 12],
          ["2023", 71, 11],
        ],
      },
      series: [
        {
          type: "line",
          color: "#ffffff",
          yAxisIndex: 0,
          encode: { x: "year", y: "temp" },
          name: "temp",
        },
        {
          type: "line",
          color: "#ffffff",
          yAxisIndex: 1,
          encode: { x: "year", y: "rainfall" },
          name: "rainfall",
        },
      ],
      backgroundColor: "#18181b",
      animation: true,
    });
  });
});
