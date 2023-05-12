import { describe, it, expect } from "vitest";
import chartlib, { ChartType } from "../../src";

describe("given block results and some configuration", () => {
  it("can create bar chart", () => {
    const conf = {
      name: "My chart",
      type: ChartType.LINE,
      features: {},
      xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
      yAxis: [{ columns: [{ index: 1, type: ChartType.LINE, color: "#2f4b7c" }] }],
    };
    const res = {
      rows: [
        { date: "2020-01-01", amount: 3 },
        { date: "2020-01-02", amount: 4 },
        { date: "2020-01-03", amount: 5 },
      ],
      schema: [
        { name: "date", type: "string" },
        { name: "amount", type: "integer" },
      ],
    };
    const ecOption = chartlib.ecOptionFromBlockResult(conf, res);
    expect(ecOption).toEqual({
      title: {
        show: false,
        text: "My chart",
        left: "auto",
      },
      legend: {
        show: false,
        type: "scroll",
        left: "center",
      },
      grid: { show: false, containLabel: false, bottom: 50, left: 50 },
      xAxis: [
        {
          type: "category",
          show: true,
          name: "date",
          nameLocation: "center",
          nameGap: 50,
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
          ["2020-01-01", 3],
          ["2020-01-02", 4],
          ["2020-01-03", 5],
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
