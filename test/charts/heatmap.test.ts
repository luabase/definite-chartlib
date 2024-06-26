import { describe, expect, it } from "vitest";
import data from "../fixtures";

import chartlib from "../../src";
import { color } from "../../src/constants";
import { axisFormatter } from "../../src/formatters";

describe("given 2 dimensions and 1 non-aggregated metric", () => {
  const chart = chartlib
    .create("heatmap")
    .addDimension({ index: 0, dataType: "datetime" })
    .addDimension({ index: 1, dataType: "category" })
    .addMetric({
      index: 2,
      color: color.COLOR_PALETTE,
      aggregation: "none",
    });
  it("can compile to heatmap chart", () => {
    expect(chart.compile("My chart", data["heatmap"])).toEqual({
      animation: true,
      backgroundColor: "#18181b",
      calendar: null,
      dataset: [
        {
          dimensions: ["date", "hour", "value"],
          source: [
            ["2020-01-01", "1pm", 30],
            ["2020-01-01", "2pm", 40],
            ["2020-01-01", "3pm", 50],
            ["2020-01-02", "1pm", 35],
            ["2020-01-02", "2pm", 45],
            ["2020-01-02", "3pm", 55],
          ],
        },
        {
          dimensions: ["date", "hour", "value"],
          id: "2::heatmap::1::::0",
          source: [
            ["2020-01-01", "1pm", 30],
            ["2020-01-01", "2pm", 40],
            ["2020-01-01", "3pm", 50],
            ["2020-01-02", "1pm", 35],
            ["2020-01-02", "2pm", 45],
            ["2020-01-02", "3pm", 55],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "12%",
        right: "11%",
        show: false,
        top: "2%",
      },
      legend: {
        left: "center",
        show: false,
        textStyle: {
          color: "#d4d4d8",
        },
        top: "2%",
        type: "scroll",
      },
      series: [
        {
          datasetIndex: 1,
          encode: {
            value: "value",
            x: "date",
            y: "hour",
          },
          name: "value",
          type: "heatmap",
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
        axisPointer: {
          label: {
            backgroundColor: "#71717a",
          },
        },
        backgroundColor: "#18181b",
        borderColor: "#71717a",
        confine: true,
        show: true,
        textStyle: {
          color: "#d4d4d8",
        },
        trigger: "item",
      },
      visualMap: {
        calculable: true,
        inRange: {
          color: [
            "#003f5c",
            "#2f4b7c",
            "#665191",
            "#a05195",
            "#d45087",
            "#f95d6a",
            "#ff7c43",
            "#ffa600",
          ],
        },
        left: "right",
        max: 55,
        min: 30,
        orient: "vertical",
        top: "center",
        type: "continuous",
      },
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
            formatter: axisFormatter,
            interval: 0,
            rotate: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#a1a1aa",
            },
          },
          name: "hour",
          nameGap: 85,
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
          type: "category",
        },
      ],
    });
  });
});
