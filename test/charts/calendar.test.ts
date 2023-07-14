import { describe, expect, it } from "vitest";
import data from "../fixtures";

import chartlib from "../../src";
import { valueFormatter } from "../../src/formatters";
import { color } from "../../src/constants";

describe("given 1 dimension and 1 aggregate dimension", () => {
  const chart = chartlib
    .create("calendar")
    .addDimension({ index: 0, dataType: "datetime" })
    .addMetric({
      index: 2,
      color: color.COLOR_PALETTE,
      aggregation: "sum",
    });
  it("can compile to calendar chart", () => {
    expect(chart.compile("My chart", data["dailyUsersByMobileOS"])).toEqual({
      animation: true,
      backgroundColor: "#18181b",
      calendar: [
        {
          top: 90,
          right: 30,
          cellSize: ["auto", 13],
          range: "2020",
          itemStyle: {
            color: "#18181b",
            borderColor: "#71717a",
            borderWidth: 0.5,
          },
          orient: "horizontal",
          splitLine: {
            lineStyle: {
              color: "#a1a1aa",
              type: "solid",
            },
          },
        },
      ],
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
          id: "2::calendar::1::users::0",
          dimensions: ["date", "users"],
          source: [
            ["2020-01-01", 800],
            ["2020-01-02", 807],
            ["2020-01-03", 1740],
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
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 0,
          datasetIndex: 1,
          name: "users",
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
      visualMap: {
        min: 800,
        max: 1740,
        calculable: true,
        type: "continuous",
        orient: "horizontal",
        left: "center",
        top: 3,
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
      },
      xAxis: [
        {
          name: "date",
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
