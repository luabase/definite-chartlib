import { describe, expect, it } from "vitest";
import data from "../fixtures";

import chartlib from "../../src";
import {
  valueFormatter,
  percentFormatter,
  axisFormatter,
} from "../../src/formatters";
import { color } from "../../src/constants";

describe("given 1 dimension and 1 aggregate metric", () => {
  const chart = chartlib
    .create("pie")
    .addDimension({ index: 1, dataType: "category" })
    .addMetric({
      index: 2,
      color: color.COLOR_PALETTE,
      aggregation: "sum",
    });
  it("can compile to pie chart", () => {
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
          dimensions: ["os", "users"],
          id: "2::pie::1::users::0",
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
          color: [
            "#d9f99d",
            "#bef264",
            "#a3e635",
            "#84cc16",
            "#65a30d",
            "#4d7c0f",
            "#3f6212",
            "#365314",
          ],
          datasetIndex: 1,
          encode: {
            itemName: "os",
            value: "users",
          },
          itemStyle: {
            borderColor: "#18181b",
            borderRadius: 10,
            borderWidth: 2,
          },
          label: {
            color: "#18181b",
            show: true,
          },
          name: "users",
          radius: ["40%", "70%"],
          textStyle: {
            color: "#18181b",
          },
          type: "pie",
          yAxisIndex: 0,
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
      visualMap: null,
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
          name: "os",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: false,
          type: "category",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            color: "#a1a1aa",
            formatter: valueFormatter,
          },
          axisLine: {
            color: "#a1a1aa",
          },
          name: "users",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: false,
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

describe("given a percentage format in the first metric", () => {
  const chart = chartlib
    .create("pie")
    .addDimension({ index: 0, dataType: "category" })
    .addMetric({
      index: 1,
      color: color.COLOR_PALETTE,
      aggregation: "sum",
      format: "percent",
    });
  it("can compile to a pie chart with percentage labels", () => {
    expect(chart.compile("My chart", data["percentageTest"])).toEqual({
      animation: true,
      backgroundColor: "#18181b",
      calendar: null,
      dataset: [
        {
          dimensions: ["key", "percent"],
          source: [
            ["a", 0.2],
            ["b", 0.3],
            ["c", 0.5],
          ],
        },
        {
          id: "1::pie::1::percent::0",
          dimensions: ["key", "percent"],
          source: [
            ["a", 0.2],
            ["b", 0.3],
            ["c", 0.5],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "12%",
        right: "9%",
        top: "2%",
        show: false,
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
          type: "pie",
          radius: ["40%", "70%"],
          color: [
            "#d9f99d",
            "#bef264",
            "#a3e635",
            "#84cc16",
            "#65a30d",
            "#4d7c0f",
            "#3f6212",
            "#365314",
          ],
          itemStyle: {
            borderColor: "#18181b",
            borderRadius: 10,
            borderWidth: 2,
          },
          textStyle: {
            color: "#18181b",
          },
          label: {
            show: true,
            color: "#18181b",
          },
          datasetIndex: 1,
          encode: { itemName: "key", value: "percent" },
          name: "percent",
          yAxisIndex: 0,
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
        confine: true,
        backgroundColor: "#18181b",
        borderColor: "#71717a",
        textStyle: {
          color: "#d4d4d8",
        },
        show: true,
        trigger: "item",
      },
      visualMap: null,
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
          name: "key",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: false,
          type: "category",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            color: "#a1a1aa",
            formatter: percentFormatter,
          },
          axisLine: {
            color: "#a1a1aa",
          },
          name: "percent",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
            color: "#a1a1aa",
            fontSize: 14,
          },
          show: false,
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
