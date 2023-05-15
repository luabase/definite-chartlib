import { describe, it, expect } from "vitest";
import chartlib, { ChartType } from "../../src";

describe("given a dataset with 1 categorical column and 2 value columns", () => {
  it("can create a combo chart", () => {
    const conf = {
      name: "My chart",
      type: ChartType.BAR,
      features: {},
      xAxis: [
        {
          columns: [{ index: 0, type: null, color: null }],
        },
      ],
      yAxis: [
        {
          columns: [
            { index: 1, type: ChartType.BAR, color: "#ffffff" },
            { index: 2, type: ChartType.LINE, color: "#ffffff" },
          ],
        },
      ],
    };
    const dataset = {
      dimensions: ["year", "amount1", "amount2"],
      source: [
        ["2021", 2, 4],
        ["2022", 3, 6],
        ["2023", 5, 10],
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
          axisLabel: {
            interval: 0,
            rotate: 0,
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
          type: "bar",
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
  it("can create a combo chart with 2 y-axes", () => {
    const conf = {
      name: "My chart",
      type: ChartType.BAR,
      features: {},
      xAxis: [
        {
          columns: [{ index: 0, type: null, color: null }],
        },
      ],
      yAxis: [
        {
          columns: [{ index: 1, type: ChartType.BAR, color: "#ffffff" }],
        },
        {
          columns: [{ index: 2, type: ChartType.LINE, color: "#ffffff" }],
        },
      ],
    };
    const dataset = {
      dimensions: ["year", "amount1", "amount2"],
      source: [
        ["2021", 2, 4],
        ["2022", 3, 6],
        ["2023", 5, 10],
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
          axisLabel: {
            interval: 0,
            rotate: 0,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          show: true,
          name: "amount1",
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
          name: "amount2",
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
          type: "bar",
          color: "#ffffff",
          yAxisIndex: 0,
          encode: { x: "year", y: "amount1" },
          name: "amount1",
        },
        {
          type: "line",
          color: "#ffffff",
          yAxisIndex: 1,
          encode: { x: "year", y: "amount2" },
          name: "amount2",
        },
      ],
      backgroundColor: "#18181b",
      animation: true,
    });
  });
});
