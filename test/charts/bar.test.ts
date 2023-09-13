import { describe, expect, it } from "vitest";
import data from "../fixtures";

import chartlib from "../../src";
import { categoryFormatter, valueFormatter } from "../../src/formatters";
import { color } from "../../src/constants";

describe("given 1 dimension and 1 aggregate metric", () => {
  const chart = chartlib
    .create("bar")
    .addDimension({ index: 1, dataType: "category" })
    .addMetric({
      index: 2,
      color: color.LIME_200,
      aggregation: "sum",
    });
  it("can compile to a vertical bar chart", () => {
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
          id: "2::bar::1::users::0",
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
        top: "8%",
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
        type: "scroll",
      },
      series: [
        {
          type: "bar",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { x: "os", y: "users" },
          name: "users",
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
          crossStyle: {
            color: "#999999",
          },
          type: "cross",
        },
        show: true,
        trigger: "axis",
      },
      visualMap: null,
      xAxis: [
        {
          axisLabel: {
            formatter: categoryFormatter,
            interval: 0,
            rotate: 0,
          },
          name: "os",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          show: true,
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
          show: true,
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
  it("can compile to a horizontal bar chart", () => {
    chart.setStyleOption("orientation", "horizontal");
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
          id: "2::bar::1::users::0",
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
        left: "15%",
        right: "9%",
        top: "8%",
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
        type: "scroll",
      },
      series: [
        {
          type: "bar",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { x: "users", y: "os" },
          name: "users",
          xAxisIndex: 0,
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
          crossStyle: {
            color: "#999999",
          },
          type: "cross",
        },
        show: true,
        trigger: "axis",
      },
      visualMap: null,
      xAxis: [
        {
          axisLabel: {
            formatter: valueFormatter,
          },
          name: "users",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          show: true,
          type: "value",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: categoryFormatter,
            interval: 0,
            rotate: 0,
          },
          name: "os",
          nameGap: 85,
          nameLocation: "center",
          nameTextStyle: {
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

describe("given 2 dimensions and 1 aggregate metric", () => {
  const chart = chartlib
    .create("bar")
    .addDimension({ index: 0, dataType: "datetime" })
    .addDimension({ index: 1, dataType: "category" })
    .addMetric({
      index: 2,
      color: color.LIME_200,
      aggregation: "sum",
    });
  it("can compile to a vertical bar chart", () => {
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
          id: "2::bar::1::iOS::0",
          dimensions: ["date", "iOS"],
          source: [
            ["2020-01-01", 300],
            ["2020-01-02", 310],
            ["2020-01-03", 610],
          ],
        },
        {
          id: "2::bar::2::Android::0",
          dimensions: ["date", "Android"],
          source: [
            ["2020-01-01", 500],
            ["2020-01-02", 497],
            ["2020-01-03", 1130],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "12%",
        right: "9%",
        top: "8%",
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
        type: "scroll",
      },
      series: [
        {
          type: "bar",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { x: "date", y: "iOS" },
          name: "iOS",
          yAxisIndex: 0,
        },
        {
          type: "bar",
          color: "#2f4b7c",
          datasetIndex: 2,
          encode: { x: "date", y: "Android" },
          name: "Android",
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
          crossStyle: {
            color: "#999999",
          },
          type: "cross",
        },
        show: true,
        trigger: "axis",
      },
      visualMap: null,
      xAxis: [
        {
          axisLabel: {
            formatter: categoryFormatter,
            interval: 0,
            rotate: 0,
          },
          name: "date",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          show: true,
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
          show: true,
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
  it("can compile to a stacked bar chart", () => {
    chart.setStyleOption("barStyle", "stacked");
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
          id: "2::bar::1::iOS::0",
          dimensions: ["date", "iOS"],
          source: [
            ["2020-01-01", 300],
            ["2020-01-02", 310],
            ["2020-01-03", 610],
          ],
        },
        {
          id: "2::bar::2::Android::0",
          dimensions: ["date", "Android"],
          source: [
            ["2020-01-01", 500],
            ["2020-01-02", 497],
            ["2020-01-03", 1130],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "12%",
        right: "9%",
        top: "8%",
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
        type: "scroll",
      },
      series: [
        {
          type: "bar",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { x: "date", y: "iOS" },
          name: "iOS",
          yAxisIndex: 0,
          stack: "total",
        },
        {
          type: "bar",
          color: "#2f4b7c",
          datasetIndex: 2,
          encode: { x: "date", y: "Android" },
          name: "Android",
          yAxisIndex: 0,
          stack: "total",
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
          crossStyle: {
            color: "#999999",
          },
          type: "cross",
        },
        show: true,
        trigger: "axis",
      },
      visualMap: null,
      xAxis: [
        {
          axisLabel: {
            formatter: categoryFormatter,
            interval: 0,
            rotate: 0,
          },
          name: "date",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          show: true,
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
          show: true,
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
    chart.setStyleOption("barStyle", "grouped");
  });
  it("can compile to a horizontal bar chart", () => {
    chart.setStyleOption("orientation", "horizontal");
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
          id: "2::bar::1::iOS::0",
          dimensions: ["date", "iOS"],
          source: [
            ["2020-01-01", 300],
            ["2020-01-02", 310],
            ["2020-01-03", 610],
          ],
        },
        {
          id: "2::bar::2::Android::0",
          dimensions: ["date", "Android"],
          source: [
            ["2020-01-01", 500],
            ["2020-01-02", 497],
            ["2020-01-03", 1130],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "15%",
        right: "9%",
        top: "8%",
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
        type: "scroll",
      },
      series: [
        {
          type: "bar",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { y: "date", x: "iOS" },
          name: "iOS",
          xAxisIndex: 0,
          yAxisIndex: 0,
        },
        {
          type: "bar",
          color: "#2f4b7c",
          datasetIndex: 2,
          encode: { y: "date", x: "Android" },
          name: "Android",
          xAxisIndex: 0,
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
          crossStyle: {
            color: "#999999",
          },
          type: "cross",
        },
        show: true,
        trigger: "axis",
      },
      visualMap: null,
      xAxis: [
        {
          axisLabel: {
            formatter: valueFormatter,
          },
          name: "users",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          show: true,
          type: "value",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: categoryFormatter,
            interval: 0,
            rotate: 0,
          },
          name: "date",
          nameGap: 85,
          nameLocation: "center",
          nameTextStyle: {
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

describe("given 1 dimension and 2 aggregate metrics", () => {
  const chart = chartlib
    .create("bar")
    .addDimension({ index: 0, dataType: "datetime" })
    .addMetric({
      index: 1,
      color: color.LIME_200,
      aggregation: "count",
    })
    .addMetric({
      index: 2,
      color: color.DARK_BLUE,
      aggregation: "distinct",
    });
  it("can compile to a vertical bar chart", () => {
    expect(chart.compile("My chart", data["clickStreamEvents"])).toEqual({
      animation: true,
      backgroundColor: "#18181b",
      calendar: null,
      dataset: [
        {
          dimensions: ["date", "event", "user_id"],
          source: [
            ["2020-01-01", "click", "123"],
            ["2020-01-01", "pageview", "123"],
            ["2020-01-02", "pageview", "123"],
            ["2020-01-02", "pageview", "456"],
            ["2020-01-02", "click", "456"],
          ],
        },
        {
          id: "1::bar::1::event (count)::0",
          dimensions: ["date", "event"],
          source: [
            ["2020-01-01", 2],
            ["2020-01-02", 3],
          ],
        },
        {
          id: "2::bar::2::user_id (distinct)::1",
          dimensions: ["date", "user_id"],
          source: [
            ["2020-01-01", 1],
            ["2020-01-02", 2],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "12%",
        right: "9%",
        top: "8%",
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
        type: "scroll",
      },
      series: [
        {
          type: "bar",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { x: "date", y: "event" },
          name: "event (count)",
          yAxisIndex: 0,
        },
        {
          type: "bar",
          color: "#2f4b7c",
          datasetIndex: 2,
          encode: { x: "date", y: "user_id" },
          name: "user_id (distinct)",
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
          crossStyle: {
            color: "#999999",
          },
          type: "cross",
        },
        show: true,
        trigger: "axis",
      },
      visualMap: null,
      xAxis: [
        {
          axisLabel: {
            formatter: categoryFormatter,
            interval: 0,
            rotate: 0,
          },
          name: "date",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          show: true,
          type: "category",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: valueFormatter,
          },
          name: "",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          show: true,
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
  it("can compile to a horizontal bar chart", () => {
    chart.setStyleOption("orientation", "horizontal");
    expect(chart.compile("My chart", data["clickStreamEvents"])).toEqual({
      animation: true,
      backgroundColor: "#18181b",
      calendar: null,
      dataset: [
        {
          dimensions: ["date", "event", "user_id"],
          source: [
            ["2020-01-01", "click", "123"],
            ["2020-01-01", "pageview", "123"],
            ["2020-01-02", "pageview", "123"],
            ["2020-01-02", "pageview", "456"],
            ["2020-01-02", "click", "456"],
          ],
        },
        {
          id: "1::bar::1::event (count)::0",
          dimensions: ["date", "event"],
          source: [
            ["2020-01-01", 2],
            ["2020-01-02", 3],
          ],
        },
        {
          id: "2::bar::2::user_id (distinct)::1",
          dimensions: ["date", "user_id"],
          source: [
            ["2020-01-01", 1],
            ["2020-01-02", 2],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "15%",
        right: "9%",
        top: "8%",
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
        type: "scroll",
      },
      series: [
        {
          type: "bar",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { y: "date", x: "event" },
          name: "event (count)",
          xAxisIndex: 0,
          yAxisIndex: 0,
        },
        {
          type: "bar",
          color: "#2f4b7c",
          datasetIndex: 2,
          encode: { y: "date", x: "user_id" },
          name: "user_id (distinct)",
          xAxisIndex: 0,
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
          crossStyle: {
            color: "#999999",
          },
          type: "cross",
        },
        show: true,
        trigger: "axis",
      },
      visualMap: null,
      xAxis: [
        {
          axisLabel: {
            formatter: valueFormatter,
          },
          name: "",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          show: true,
          type: "value",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: categoryFormatter,
            interval: 0,
            rotate: 0,
          },
          name: "date",
          nameGap: 85,
          nameLocation: "center",
          nameTextStyle: {
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

describe("given 1 dimension and 2 aggregate metrics, each on different axes", () => {
  const chart = chartlib
    .create("bar")
    .addDimension({ index: 0, dataType: "datetime" })
    .addMetric({
      index: 1,
      color: color.LIME_200,
      aggregation: "count",
      axis: "left",
    })
    .addMetric({
      index: 2,
      color: color.DARK_BLUE,
      aggregation: "distinct",
      axis: "right",
    });
  it("can compile to a vertical bar chart", () => {
    expect(chart.compile("My chart", data["clickStreamEvents"])).toEqual({
      animation: true,
      backgroundColor: "#18181b",
      calendar: null,
      dataset: [
        {
          dimensions: ["date", "event", "user_id"],
          source: [
            ["2020-01-01", "click", "123"],
            ["2020-01-01", "pageview", "123"],
            ["2020-01-02", "pageview", "123"],
            ["2020-01-02", "pageview", "456"],
            ["2020-01-02", "click", "456"],
          ],
        },
        {
          id: "1::bar::1::event (count)::0",
          dimensions: ["date", "event"],
          source: [
            ["2020-01-01", 2],
            ["2020-01-02", 3],
          ],
        },
        {
          id: "2::bar::2::user_id (distinct)::1",
          dimensions: ["date", "user_id"],
          source: [
            ["2020-01-01", 1],
            ["2020-01-02", 2],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "12%",
        right: "12%",
        top: "8%",
        show: false,
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
        type: "scroll",
      },
      series: [
        {
          type: "bar",
          color: "#d9f99d",
          datasetIndex: 1,
          encode: { x: "date", y: "event" },
          name: "event (count)",
          yAxisIndex: 0,
        },
        {
          type: "bar",
          color: "#2f4b7c",
          datasetIndex: 2,
          encode: { x: "date", y: "user_id" },
          name: "user_id (distinct)",
          yAxisIndex: 1,
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
          crossStyle: {
            color: "#999999",
          },
          type: "cross",
        },
        show: true,
        trigger: "axis",
      },
      visualMap: null,
      xAxis: [
        {
          axisLabel: {
            formatter: categoryFormatter,
            interval: 0,
            rotate: 0,
          },
          name: "date",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          show: true,
          type: "category",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: valueFormatter,
          },
          name: "event",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          show: true,
          splitLine: {
            lineStyle: {
              color: "#27272a",
              type: "dashed",
            },
          },
          type: "value",
        },
        {
          axisLabel: {
            formatter: valueFormatter,
          },
          name: "user_id",
          nameGap: 50,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          show: true,
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
