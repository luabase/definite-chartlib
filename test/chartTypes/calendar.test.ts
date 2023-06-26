import { describe, it, expect } from "vitest";
import chartlib, { ChartType, color } from "../../src";

describe("given a dataset with 1 categorical and 1 value column", () => {
  describe("given a range of only a single year", () => {
    it("can create a calendar chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.CALENDAR,
        features: {
          title: true,
          legend: true, // just to prove that it can't happen
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              {
                index: 2,
                type: ChartType.CALENDAR,
                color: color.COLOR_PALETTE,
              },
            ],
          },
        ],
      };
      const dataset = {
        dimensions: ["Date", "PRs", "Commits"],
        source: [
          ["2020-01-01", 0, 2],
          ["2020-01-02", 0, 0],
          ["2020-01-03", 0, 4],
          ["2020-01-04", 0, 2],
          ["2020-01-05", 0, 0],
          ["2020-01-06", 0, 0],
          ["2020-01-07", 1, 0],
          ["2020-01-08", 0, 1],
          ["2020-01-09", 0, 3],
          ["2020-01-10", 1, 5],
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
          right: "9%",
        },
        xAxis: [
          {
            type: "category",
            show: false,
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
            show: false,
            name: "Commits",
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
        },
        toolbox: {
          show: false,
        },
        dataset: {
          dimensions: ["Date", "Commits"],
          source: [
            ["2020-01-01", 2],
            ["2020-01-02", 0],
            ["2020-01-03", 4],
            ["2020-01-04", 2],
            ["2020-01-05", 0],
            ["2020-01-06", 0],
            ["2020-01-07", 0],
            ["2020-01-08", 1],
            ["2020-01-09", 3],
            ["2020-01-10", 5],
          ],
        },
        series: [
          {
            type: "heatmap",
            coordinateSystem: "calendar",
            calendarIndex: 0,
            name: "Commits",
          },
        ],
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
              show: true,
              lineStyle: {
                color: "#a1a1aa",
                width: 1,
                type: "solid",
              },
            },
          },
        ],
        visualMap: {
          min: 0,
          max: 5,
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
        animation: true,
        backgroundColor: "#18181b",
      });
    });
  });
  describe("given a range of multiple years", () => {
    it("can create a calendar chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.CALENDAR,
        features: {
          title: true,
          legend: true, // just to prove that it can't happen
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              {
                index: 2,
                type: ChartType.CALENDAR,
                color: color.COLOR_PALETTE,
              },
            ],
          },
        ],
      };
      const dataset = {
        dimensions: ["Date", "PRs", "Commits"],
        source: [
          ["2020-01-01", 0, 2],
          ["2020-01-02", 0, 0],
          ["2020-01-03", 0, 4],
          ["2020-01-04", 0, 2],
          ["2020-01-05", 0, 0],
          ["2020-01-06", 0, 0],
          ["2020-01-07", 1, 0],
          ["2020-01-08", 0, 1],
          ["2020-01-09", 0, 3],
          ["2020-01-10", 1, 5],
          ["2021-01-01", 0, 2],
          ["2021-01-02", 0, 0],
          ["2021-01-03", 0, 4],
          ["2021-01-04", 0, 2],
          ["2021-01-05", 0, 0],
          ["2021-01-06", 0, 0],
          ["2021-01-07", 1, 0],
          ["2021-01-08", 0, 1],
          ["2021-01-09", 0, 3],
          ["2021-01-10", 1, 5],
          ["2022-01-01", 0, 2],
          ["2022-01-02", 0, 0],
          ["2022-01-03", 0, 4],
          ["2022-01-04", 0, 2],
          ["2022-01-05", 0, 0],
          ["2022-01-06", 0, 0],
          ["2022-01-07", 1, 0],
          ["2022-01-08", 0, 1],
          ["2022-01-09", 0, 3],
          ["2022-01-10", 1, 5],
          ["2023-01-01", 0, 2],
          ["2023-01-02", 0, 0],
          ["2023-01-03", 0, 4],
          ["2023-01-04", 0, 2],
          ["2023-01-05", 0, 0],
          ["2023-01-06", 0, 0],
          ["2023-01-07", 1, 0],
          ["2023-01-08", 0, 1],
          ["2023-01-09", 0, 3],
          ["2023-01-10", 1, 5],
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
          right: "9%",
        },
        xAxis: [
          {
            type: "category",
            show: false,
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
            show: false,
            name: "Commits",
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
        },
        toolbox: {
          show: false,
        },
        dataset: {
          dimensions: ["Date", "Commits"],
          source: [
            ["2020-01-01", 2],
            ["2020-01-02", 0],
            ["2020-01-03", 4],
            ["2020-01-04", 2],
            ["2020-01-05", 0],
            ["2020-01-06", 0],
            ["2020-01-07", 0],
            ["2020-01-08", 1],
            ["2020-01-09", 3],
            ["2020-01-10", 5],
            ["2021-01-01", 2],
            ["2021-01-02", 0],
            ["2021-01-03", 4],
            ["2021-01-04", 2],
            ["2021-01-05", 0],
            ["2021-01-06", 0],
            ["2021-01-07", 0],
            ["2021-01-08", 1],
            ["2021-01-09", 3],
            ["2021-01-10", 5],
            ["2022-01-01", 2],
            ["2022-01-02", 0],
            ["2022-01-03", 4],
            ["2022-01-04", 2],
            ["2022-01-05", 0],
            ["2022-01-06", 0],
            ["2022-01-07", 0],
            ["2022-01-08", 1],
            ["2022-01-09", 3],
            ["2022-01-10", 5],
            ["2023-01-01", 2],
            ["2023-01-02", 0],
            ["2023-01-03", 4],
            ["2023-01-04", 2],
            ["2023-01-05", 0],
            ["2023-01-06", 0],
            ["2023-01-07", 0],
            ["2023-01-08", 1],
            ["2023-01-09", 3],
            ["2023-01-10", 5],
          ],
        },
        series: [
          {
            type: "heatmap",
            coordinateSystem: "calendar",
            calendarIndex: 0,
            name: "Commits",
          },
          {
            type: "heatmap",
            coordinateSystem: "calendar",
            calendarIndex: 1,
            name: "Commits",
          },
          {
            type: "heatmap",
            coordinateSystem: "calendar",
            calendarIndex: 2,
            name: "Commits",
          },
          {
            type: "heatmap",
            coordinateSystem: "calendar",
            calendarIndex: 3,
            name: "Commits",
          },
        ],
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
              show: true,
              lineStyle: {
                color: "#a1a1aa",
                width: 1,
                type: "solid",
              },
            },
          },
          {
            top: 90 + 130,
            right: 30,
            cellSize: ["auto", 13],
            range: "2021",
            itemStyle: {
              color: "#18181b",
              borderColor: "#71717a",
              borderWidth: 0.5,
            },
            orient: "horizontal",
            splitLine: {
              show: true,
              lineStyle: {
                color: "#a1a1aa",
                width: 1,
                type: "solid",
              },
            },
          },
          {
            top: 90 + 130 + 130,
            right: 30,
            cellSize: ["auto", 13],
            range: "2022",
            itemStyle: {
              color: "#18181b",
              borderColor: "#71717a",
              borderWidth: 0.5,
            },
            orient: "horizontal",
            splitLine: {
              show: true,
              lineStyle: {
                color: "#a1a1aa",
                width: 1,
                type: "solid",
              },
            },
          },
          {
            top: 90 + 130 + 130 + 130,
            right: 30,
            cellSize: ["auto", 13],
            range: "2023",
            itemStyle: {
              color: "#18181b",
              borderColor: "#71717a",
              borderWidth: 0.5,
            },
            orient: "horizontal",
            splitLine: {
              show: true,
              lineStyle: {
                color: "#a1a1aa",
                width: 1,
                type: "solid",
              },
            },
          },
        ],
        visualMap: {
          min: 0,
          max: 5,
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
        animation: true,
        backgroundColor: "#18181b",
      });
    });
  });
});
