import { describe, expect, it } from "vitest";
import data from "../fixtures";

import chartlib from "../../src";
import { valueFormatter } from "../../src/formatters";
import { color } from "../../src/constants";

describe("given 1 dimension and 1 aggregate metric", () => {
  const chart = chartlib
    .create("pie")
    .addDimension({ index: 1, dataType: "category" })
    .addMetric({
      index: 2,
      color: color.LIME_PALETTE,
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
          id: "2::pie::1::users::0",
          dimensions: ["os", "users"],
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
      },
      legend: {
        left: "center",
        show: false,
        top: "2%",
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          color: [
            "#f7fee7",
            "#ecfccb",
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
            color: "#71717a",
          },
          label: {
            show: true,
            color: "#71717a",
          },
          datasetIndex: 1,
          encode: { itemName: "os", value: "users" },
          name: "users",
          yAxisIndex: 0,
        },
      ],
      title: {
        left: "auto",
        show: true,
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
        show: true,
        trigger: "item",
      },
      visualMap: null,
      xAxis: [
        {
          name: "os",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          show: false,
          type: "category",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: valueFormatter,
          },
          name: "users",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
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
