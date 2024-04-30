import { describe, expect, it } from "vitest";
import data from "../fixtures";

import chartlib from "../../src";
import {
  valueFormatter,
  calendarTooltipFormatter,
  axisFormatter,
} from "../../src/formatters";
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
          cellSize: ["auto", 13],
          itemStyle: {
            borderColor: "#71717a",
            borderWidth: 0.5,
            color: "#18181b",
          },
          orient: "horizontal",
          range: "2020",
          right: 30,
          splitLine: {
            lineStyle: {
              color: "#a1a1aa",
              type: "solid",
            },
          },
          top: 90,
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
          dimensions: ["date", "users"],
          id: "2::calendar::1::users::0",
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
          calendarIndex: 0,
          coordinateSystem: "calendar",
          datasetIndex: 1,
          name: "users",
          type: "heatmap",
        },
      ],
      title: {
        left: "auto",
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
        formatter: calendarTooltipFormatter,
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
        left: "center",
        max: 1740,
        min: 800,
        orient: "horizontal",
        top: 3,
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
