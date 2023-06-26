import { describe, it, expect } from "vitest";
import chartlib, { ChartType, ChartConfig, format } from "../../src";

describe("given block results and some configuration", () => {
  it("can create bar chart", () => {
    const conf: ChartConfig = {
      name: "My chart",
      type: ChartType.LINE,
      features: {},
      transform: {
        filter: [
          {
            index: 0,
            type: "<",
            value: "2020-01-03",
            parser: "datetime",
          },
        ],
        sort: [
          {
            index: 0,
            order: "desc",
            parser: "datetime",
          },
        ],
      },
      xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
      yAxis: [
        { columns: [{ index: 1, type: ChartType.LINE, color: "#2f4b7c" }] },
      ],
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
        right: "9%",
      },
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
        dimensions: ["date", "amount"],
        source: [
          ["2020-01-02", 4],
          ["2020-01-01", 3],
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
      visualMap: null,
      calendar: null,
      backgroundColor: "#18181b",
      animation: true,
    });
  });
});
