import { describe, it, expect } from "vitest";
import chartlib, { ChartType, format } from "../../src";

describe("given a dataset with 2 value columns", () => {
  it("can create a scatter chart", () => {
    const conf = {
      name: "My chart",
      type: ChartType.SCATTER,
      features: {},
      xAxis: [
        { columns: [{ index: 0, type: ChartType.SCATTER, color: "#2f4b7c" }] },
      ],
      yAxis: [
        { columns: [{ index: 1, type: ChartType.SCATTER, color: "#2f4b7c" }] },
      ],
    };
    const dataset = {
      dimensions: ["height", "weight"],
      source: [
        [4, 3],
        [3, 4],
        [5, 5],
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
        right: "9%",
      },
      xAxis: [
        {
          type: "value",
          show: true,
          name: "height",
          nameLocation: "center",
          nameGap: 30,
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
      yAxis: [
        {
          type: "value",
          show: true,
          name: "weight",
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
        dimensions: ["height", "weight"],
        source: [
          [4, 3],
          [3, 4],
          [5, 5],
        ],
      },
      series: [
        {
          type: "scatter",
          color: "#2f4b7c",
          yAxisIndex: 0,
          symbolSize: 15,
          encode: { x: "height", y: "weight" },
          name: "weight",
        },
      ],
      visualMap: null,
      calendar: null,
      backgroundColor: "#18181b",
      animation: true,
    });
  });
});
