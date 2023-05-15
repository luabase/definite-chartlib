import { describe, it, expect } from "vitest";
import chartlib, { ChartType } from "../../src";

describe("given a dataset with 1 categorical and 1 value column", () => {
  it("can create a vertical bar chart", () => {
    const conf = {
      name: "My chart",
      type: ChartType.BAR,
      features: {},
      xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
      yAxis: [
        { columns: [{ index: 1, type: ChartType.BAR, color: "#2f4b7c" }] },
      ],
    };
    const dataset = {
      dimensions: ["cat", "val"],
      source: [
        ["cat1", 3],
        ["cat2", 4],
        ["cat3", 5],
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
      grid: {
        show: false,
        containLabel: false,
        left: "12%",
        bottom: "12%",
        right: "12%",
      },
      xAxis: [
        {
          type: "category",
          show: true,
          name: "cat",
          nameLocation: "center",
          nameGap: 50,
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
          name: "val",
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
        dimensions: ["cat", "val"],
        source: [
          ["cat1", 3],
          ["cat2", 4],
          ["cat3", 5],
        ],
      },
      series: [
        {
          type: "bar",
          color: "#2f4b7c",
          yAxisIndex: 0,
          encode: { x: "cat", y: "val" },
          name: "val",
        },
      ],
      backgroundColor: "#18181b",
      animation: true,
    });
  });
  it("can create a horizontal bar chart", () => {
    const conf = {
      name: "My chart",
      type: ChartType.BAR,
      features: {
        orientation: "horizontal",
      },
      xAxis: [
        { columns: [{ index: 1, type: ChartType.BAR, color: "#2f4b7c" }] },
      ],
      yAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
    };
    const dataset = {
      dimensions: ["cat", "val"],
      source: [
        ["cat1", 3],
        ["cat2", 4],
        ["cat3", 5],
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
      grid: {
        show: false,
        containLabel: false,
        left: "12%",
        bottom: "12%",
        right: "12%",
      },
      xAxis: [
        {
          type: "value",
          show: true,
          name: "val",
          nameLocation: "center",
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
          },
        },
      ],
      yAxis: [
        {
          type: "category",
          show: true,
          name: "cat",
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
            interval: 0,
            rotate: 0,
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
        dimensions: ["cat", "val"],
        source: [
          ["cat1", 3],
          ["cat2", 4],
          ["cat3", 5],
        ],
      },
      series: [
        {
          type: "bar",
          color: "#2f4b7c",
          xAxisIndex: 0,
          encode: { x: "val", y: "cat" },
          name: "val",
        },
      ],
      backgroundColor: "#18181b",
      animation: true,
    });
  });
});

describe("given a dataset with 1 categorical column and 2 value columns", () => {
  it("can create a vertical bar chart", () => {
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
            { index: 1, type: null, color: "#ffffff" },
            { index: 2, type: null, color: "#ffffff" },
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
      grid: {
        show: false,
        containLabel: false,
        left: "12%",
        bottom: "12%",
        right: "12%",
      },
      xAxis: [
        {
          type: "category",
          show: true,
          name: "year",
          nameLocation: "center",
          nameGap: 50,
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
          type: "bar",
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
  it("can create a horizontal bar chart", () => {
    const conf = {
      name: "My chart",
      type: ChartType.BAR,
      features: {
        orientation: "horizontal",
      },
      xAxis: [
        {
          columns: [
            { index: 1, type: null, color: "#ffffff" },
            { index: 2, type: null, color: "#ffffff" },
          ],
        },
      ],
      yAxis: [
        {
          columns: [{ index: 0, type: null, color: null }],
        },
      ],
    };
    const dataset = {
      dimensions: ["year", "amount1", "amount2"],
      source: [
        ["2021", 2, 4],
        ["2022", 3, 6],
        ["2023", 5, 10],
        ["2024", 5, 10],
        ["2025", 5, 10],
        ["2026", 5, 10],
        ["2027", 5, 10],
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
      grid: {
        show: false,
        containLabel: false,
        left: "18%",
        bottom: "12%",
        right: "12%",
      },
      xAxis: [
        {
          type: "value",
          show: true,
          name: "amount1, amount2",
          nameLocation: "center",
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
          },
        },
      ],
      yAxis: [
        {
          type: "category",
          show: true,
          name: "year",
          nameLocation: "center",
          nameGap: 65,
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
            interval: 0,
            rotate: 30,
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
          ["2024", 5, 10],
          ["2025", 5, 10],
          ["2026", 5, 10],
          ["2027", 5, 10],
        ],
      },
      series: [
        {
          type: "bar",
          color: "#ffffff",
          xAxisIndex: 0,
          encode: { y: "year", x: "amount1" },
          name: "amount1",
        },
        {
          type: "bar",
          color: "#ffffff",
          xAxisIndex: 0,
          encode: { y: "year", x: "amount2" },
          name: "amount2",
        },
      ],
      backgroundColor: "#18181b",
      animation: true,
    });
  });
});
