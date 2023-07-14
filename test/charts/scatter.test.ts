import { describe, expect, it } from "vitest";
import data from "../fixtures";

import chartlib from "../../src";
import { valueFormatter } from "../../src/formatters";
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
          id: "2::scatter::1::::0",
          dimensions: ["state", "year", "gdp", "avg_income"],
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
      },
      legend: {
        left: "center",
        show: false,
        top: "2%",
      },
      series: [
        {
          type: "scatter",
          color: "#d9f99d",
          datasetIndex: 1,
          symbolSize: 15,
          encode: {
            x: "gdp",
            y: "avg_income",
            tooltip: ["state", "gdp", "avg_income"],
          },
          name: "",
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
          axisLabel: {
            formatter: valueFormatter,
          },
          name: "gdp",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          splitLine: {
            lineStyle: {
              color: "#27272a",
              type: "dashed",
            },
          },
          show: true,
          type: "value",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: valueFormatter,
          },
          name: "avg_income",
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
          id: "2::scatter::1::2010::0",
          dimensions: ["state", "year", "gdp", "avg_income"],
          source: [
            ["New York", 2010, 1223529700000, 46566],
            ["California", 2010, 1954092700000, 41773],
            ["Texas", 2010, 1245959400000, 41614],
          ],
        },
        {
          id: "2::scatter::2::2020::0",
          dimensions: ["state", "year", "gdp", "avg_income"],
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
      },
      legend: {
        left: "center",
        show: true,
        top: "2%",
      },
      series: [
        {
          type: "scatter",
          color: "#d9f99d",
          datasetIndex: 1,
          symbolSize: 15,
          encode: {
            x: "gdp",
            y: "avg_income",
            tooltip: ["state", "gdp", "avg_income"],
          },
          name: "2010",
        },
        {
          type: "scatter",
          color: "#2f4b7c",
          datasetIndex: 2,
          symbolSize: 15,
          encode: {
            x: "gdp",
            y: "avg_income",
            tooltip: ["state", "gdp", "avg_income"],
          },
          name: "2020",
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
          axisLabel: {
            formatter: valueFormatter,
          },
          name: "gdp",
          nameGap: 30,
          nameLocation: "center",
          nameTextStyle: {
            fontSize: 14,
          },
          splitLine: {
            lineStyle: {
              color: "#27272a",
              type: "dashed",
            },
          },
          show: true,
          type: "value",
        },
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: valueFormatter,
          },
          name: "avg_income",
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
