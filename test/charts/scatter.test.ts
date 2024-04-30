import { describe, expect, it } from "vitest";
import data from "../fixtures";

import chartlib from "../../src";
import { axisFormatter, valueFormatter } from "../../src/formatters";
import { color } from "../../src/constants";

describe("given 1 dimension and 2 non-aggregate metrics", () => {
  const chart = chartlib
    .create("scatter")
    .addDimension({ index: 0, dataType: "category" })
    .addMetric({
      index: 2,
      color: color.LIME_200,
      aggregation: "none",
    })
    .addMetric({
      index: 3,
      color: color.DARK_BLUE, // will be ignored for first color
      aggregation: "none",
    });
  it("can compile to scatter chart", () => {
    expect(chart.compile("My chart", data["economicData"]["2010"])).toEqual({
      animation: true,
      backgroundColor: "#18181b",
      calendar: null,
      dataset: [
        {
          dimensions: ["state", "year", "gdp", "avg_income"],
          source: [
            ["New York", 2010, 1223529700000, 46566],
            ["California", 2010, 1954092700000, 41773],
            ["Texas", 2010, 1245959400000, 41614],
          ],
        },
        {
          dimensions: ["state", "year", "gdp", "avg_income"],
          id: "2::scatter::1::::0",
          source: [
            ["New York", 2010, 1223529700000, 46566],
            ["California", 2010, 1954092700000, 41773],
            ["Texas", 2010, 1245959400000, 41614],
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
          color: "#d9f99d",
          datasetIndex: 1,
          encode: {
            tooltip: ["state", "gdp", "avg_income"],
            x: "gdp",
            y: "avg_income",
          },
          name: "",
          symbolSize: 15,
          type: "scatter",
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
            formatter: valueFormatter,
          },
          axisLine: {
            color: "#a1a1aa",
          },
          name: "gdp",
          nameGap: 30,
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
          type: "value",
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
          name: "avg_income",
          nameGap: 50,
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
          type: "value",
        },
      ],
    });
  });
});

describe("given 2 dimensions and 2 non-aggregate dimensions", () => {
  const chart = chartlib
    .create("scatter")
    .addDimension({ index: 0, dataType: "category" })
    .addDimension({ index: 1, dataType: "category" })
    .addMetric({
      index: 2,
      color: color.LIME_200,
      aggregation: "none",
    })
    .addMetric({
      index: 3,
      color: color.LIME_200,
      aggregation: "none",
    });
  it("can compile to scatter chart", () => {
    expect(
      chart.compile("My chart", [
        ...data["economicData"]["2010"],
        ...data["economicData"]["2020"],
      ])
    ).toEqual({
      animation: true,
      backgroundColor: "#18181b",
      calendar: null,
      dataset: [
        {
          dimensions: ["state", "year", "gdp", "avg_income"],
          source: [
            ["New York", 2010, 1223529700000, 46566],
            ["California", 2010, 1954092700000, 41773],
            ["Texas", 2010, 1245959400000, 41614],
            ["New York", 2020, 1740804700000, 58675],
            ["California", 2020, 3020173700000, 56973],
            ["Texas", 2020, 1789933400000, 50822],
          ],
        },
        {
          dimensions: ["state", "year", "gdp", "avg_income"],
          id: "2::scatter::1::2010::0",
          source: [
            ["New York", 2010, 1223529700000, 46566],
            ["California", 2010, 1954092700000, 41773],
            ["Texas", 2010, 1245959400000, 41614],
          ],
        },
        {
          dimensions: ["state", "year", "gdp", "avg_income"],
          id: "2::scatter::2::2020::0",
          source: [
            ["New York", 2020, 1740804700000, 58675],
            ["California", 2020, 3020173700000, 56973],
            ["Texas", 2020, 1789933400000, 50822],
          ],
        },
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "12%",
        right: "9%",
        show: false,
        top: "10%",
      },
      legend: {
        left: "center",
        show: true,
        textStyle: {
          color: "#d4d4d8",
        },
        top: "2%",
        type: "scroll",
      },
      series: [
        {
          color: "#d9f99d",
          datasetIndex: 1,
          encode: {
            tooltip: ["state", "gdp", "avg_income"],
            x: "gdp",
            y: "avg_income",
          },
          name: "2010",
          symbolSize: 15,
          type: "scatter",
        },
        {
          color: "#2f4b7c",
          datasetIndex: 2,
          encode: {
            tooltip: ["state", "gdp", "avg_income"],
            x: "gdp",
            y: "avg_income",
          },
          name: "2020",
          symbolSize: 15,
          type: "scatter",
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
            formatter: valueFormatter,
          },
          axisLine: {
            color: "#a1a1aa",
          },
          name: "gdp",
          nameGap: 30,
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
          type: "value",
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
          name: "avg_income",
          nameGap: 50,
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
          type: "value",
        },
      ],
    });
  });
});
