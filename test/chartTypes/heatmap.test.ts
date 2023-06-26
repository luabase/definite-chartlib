import { describe, it, expect } from "vitest";
import chartlib, { ChartConfig, ChartType, color } from "../../src";

describe("given a dataset with 2 categorical and 1 value columns", () => {
  it("can create a grid heatmap chart", () => {
    const conf = {
      name: "My chart",
      type: ChartType.HEATMAP,
      features: {
        labels: true,
      },
      xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
      yAxis: [
        { columns: [{ index: 1, type: ChartType.HEATMAP, color: null }] },
      ],
      zAxis: [
        {
          columns: [
            { index: 2, type: ChartType.HEATMAP, color: color.LIME_PALETTE },
          ],
        },
      ],
    };
    const dataset = {
      dimensions: ["Date", "Hour", "Value"],
      source: [
        ["2021-01-01", "1am", 0],
        ["2021-01-01", "2am", 1],
        ["2021-01-01", "3am", 2],
        ["2021-01-02", "1am", 3],
        ["2021-01-02", "2am", 4],
        ["2021-01-02", "3am", 5],
        ["2021-01-03", "1am", 6],
        ["2021-01-03", "2am", 7],
        ["2021-01-03", "3am", 8],
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
        right: "11%",
      },
      xAxis: [
        {
          type: "category",
          show: true,
          name: "Date",
          nameLocation: "center",
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
          },
        },
      ],
      yAxis: [
        {
          type: "category",
          show: true,
          name: "Hour",
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
        },
      ],
      tooltip: {
        show: true,
        trigger: "item",
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
        dimensions: ["Date", "Hour", "Value"],
        source: [
          ["2021-01-01", "1am", 0],
          ["2021-01-01", "2am", 1],
          ["2021-01-01", "3am", 2],
          ["2021-01-02", "1am", 3],
          ["2021-01-02", "2am", 4],
          ["2021-01-02", "3am", 5],
          ["2021-01-03", "1am", 6],
          ["2021-01-03", "2am", 7],
          ["2021-01-03", "3am", 8],
        ],
      },
      series: [
        {
          type: "heatmap",
          label: {
            show: true,
          },
          encode: {
            x: "Date",
            y: "Hour",
            value: "Value",
          },
          name: "Value",
        },
      ],
      visualMap: {
        min: 0,
        max: 8,
        calculable: true,
        type: "continuous",
        orient: "vertical",
        left: "right",
        top: "center",
        inRange: {
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
        },
      },
      calendar: null,
      backgroundColor: "#18181b",
      animation: true,
    });
  });
  it("can create a grid heatmap chart with piecewise data", () => {
    const conf = {
      name: "My chart",
      type: ChartType.HEATMAP,
      features: {
        title: true,
        legend: true, // just to make sure that this can't be toggle on for heatmap
        labels: true,
        piecewise: true,
      },
      xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
      yAxis: [
        { columns: [{ index: 1, type: ChartType.HEATMAP, color: null }] },
      ],
      zAxis: [
        {
          columns: [
            { index: 2, type: ChartType.HEATMAP, color: color.COLOR_PALETTE },
          ],
        },
      ],
    };
    const dataset = {
      dimensions: ["Date", "Hour", "Value"],
      source: [
        ["2021-01-01", "1am", 1],
        ["2021-01-01", "2am", 1],
        ["2021-01-01", "3am", 2],
        ["2021-01-02", "1am", 3],
        ["2021-01-02", "2am", 4],
        ["2021-01-02", "3am", 5],
        ["2021-01-03", "1am", 6],
        ["2021-01-03", "2am", 7],
        ["2021-01-03", "3am", 8],
        ["2021-01-04", "1am", 9],
        ["2021-01-04", "2am", 10],
        ["2021-01-04", "3am", 11],
      ],
    };
    const ecOption = chartlib.ecOptionFromDataset(conf, dataset);
    expect(ecOption).toEqual({
      title: {
        show: true,
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
        right: "15%",
      },
      xAxis: [
        {
          type: "category",
          show: true,
          name: "Date",
          nameLocation: "center",
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
          },
        },
      ],
      yAxis: [
        {
          type: "category",
          show: true,
          name: "Hour",
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
        },
      ],
      tooltip: {
        show: true,
        trigger: "item",
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
        dimensions: ["Date", "Hour", "Value"],
        source: [
          ["2021-01-01", "1am", 1],
          ["2021-01-01", "2am", 1],
          ["2021-01-01", "3am", 2],
          ["2021-01-02", "1am", 3],
          ["2021-01-02", "2am", 4],
          ["2021-01-02", "3am", 5],
          ["2021-01-03", "1am", 6],
          ["2021-01-03", "2am", 7],
          ["2021-01-03", "3am", 8],
          ["2021-01-04", "1am", 9],
          ["2021-01-04", "2am", 10],
          ["2021-01-04", "3am", 11],
        ],
      },
      series: [
        {
          type: "heatmap",
          label: {
            show: true,
          },
          encode: {
            x: "Date",
            y: "Hour",
            value: "Value",
          },
          name: "Value",
        },
      ],
      visualMap: {
        min: 1,
        max: 11,
        calculable: true,
        type: "piecewise",
        orient: "vertical",
        left: "right",
        top: "center",
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
      calendar: null,
      backgroundColor: "#18181b",
      animation: true,
    });
  });
  describe("given transformations", () => {
    it("can create a transformed heatmap", () => {
      const conf: ChartConfig = {
        name: "My chart",
        type: ChartType.HEATMAP,
        features: {
          title: true,
          legend: true, // just to make sure that this can't be toggle on for heatmap
          labels: true,
          piecewise: true,
        },
        transform: {
          filter: [
            {
              index: 0,
              type: ">",
              value: "2021-01-01",
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
          { columns: [{ index: 1, type: ChartType.HEATMAP, color: null }] },
        ],
        zAxis: [
          {
            columns: [
              { index: 2, type: ChartType.HEATMAP, color: color.COLOR_PALETTE },
            ],
          },
        ],
      };
      const dataset = {
        dimensions: ["Date", "Hour", "Value"],
        source: [
          ["2021-01-01", "1am", 1],
          ["2021-01-01", "2am", 1],
          ["2021-01-01", "3am", 2],
          ["2021-01-02", "1am", 3],
          ["2021-01-02", "2am", 4],
          ["2021-01-02", "3am", 5],
          ["2021-01-03", "1am", 6],
          ["2021-01-03", "2am", 7],
          ["2021-01-03", "3am", 8],
          ["2021-01-04", "1am", 9],
          ["2021-01-04", "2am", 10],
          ["2021-01-04", "3am", 11],
        ],
      };
      const ecOption = chartlib.ecOptionFromDataset(conf, dataset);
      expect(ecOption).toEqual({
        title: {
          show: true,
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
          right: "15%",
        },
        xAxis: [
          {
            type: "category",
            show: true,
            name: "Date",
            nameLocation: "center",
            nameGap: 30,
            nameTextStyle: {
              fontSize: 14,
            },
          },
        ],
        yAxis: [
          {
            type: "category",
            show: true,
            name: "Hour",
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
          },
        ],
        tooltip: {
          show: true,
          trigger: "item",
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
          dimensions: ["Date", "Hour", "Value"],
          source: [
            ["2021-01-04", "1am", 9],
            ["2021-01-04", "2am", 10],
            ["2021-01-04", "3am", 11],
            ["2021-01-03", "1am", 6],
            ["2021-01-03", "2am", 7],
            ["2021-01-03", "3am", 8],
            ["2021-01-02", "1am", 3],
            ["2021-01-02", "2am", 4],
            ["2021-01-02", "3am", 5],
          ],
        },
        series: [
          {
            type: "heatmap",
            label: {
              show: true,
            },
            encode: {
              x: "Date",
              y: "Hour",
              value: "Value",
            },
            name: "Value",
          },
        ],
        visualMap: {
          min: 3,
          max: 11,
          calculable: true,
          type: "piecewise",
          orient: "vertical",
          left: "right",
          top: "center",
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
        calendar: null,
        backgroundColor: "#18181b",
        animation: true,
      });
    });
  });
});
