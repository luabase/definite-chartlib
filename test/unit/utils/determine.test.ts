import { describe, it, expect } from "vitest";
import { determine } from "../../../src/utils";
import { ChartType } from "../../../src";

describe("determine.title", () => {
  it("does not show title if feature flag is not enabled", () => {
    const conf = {
      name: "My chart",
      type: ChartType.BAR,
      features: {},
      xAxis: [],
      yAxis: [],
    };
    expect(determine.title(conf).show).toEqual(false);
  });
  it("places title in left corner if enabled and legend is enabled", () => {
    const conf = {
      name: "My chart",
      type: ChartType.BAR,
      features: {
        title: true,
        legend: true,
      },
      xAxis: [],
      yAxis: [],
    };
    expect(determine.title(conf).show).toEqual(true);
    expect(determine.title(conf).left).toEqual("auto");
  });
});

describe("determine.axis", () => {
  describe("given no axes", () => {
    const conf = {
      name: "My chart",
      type: ChartType.BAR,
      features: {},
      xAxis: [],
      yAxis: [],
    };
    const dataset = {
      dimensions: ["year", "amount"],
      source: [
        ["2021", 2],
        ["2022", 3],
        ["2023", 5],
      ],
    };
    it("will return an empty eCharts axis config", () => {
      const actual = determine.axis(conf, dataset, "horizontal");
      expect(actual).toEqual([]);
    });
  });
  describe("given a single horizontal axis", () => {
    describe("given a single column", () => {
      const conf = {
        name: "My chart",
        type: ChartType.BAR,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [],
      };
      const dataset = {
        dimensions: ["year", "amount"],
        source: [
          ["2021", 2],
          ["2022", 3],
          ["2023", 5],
        ],
      };
      it("can correctly determine the corresponding eCharts axis config", () => {
        const actual = determine.axis(conf, dataset, "horizontal");
        expect(actual).toEqual([
          {
            show: true,
            type: "category",
            name: "year",
            nameLocation: "center",
            nameGap: 30,
            nameTextStyle: {
              fontSize: 14,
            },
            axisLabel: {
              interval: 0,
              rotate: 0,
            },
          },
        ]);
      });
    });
  });
  describe("given a single vertical axis", () => {
    describe("given a single column", () => {
      const conf = {
        name: "My chart",
        type: ChartType.LINE,
        features: {},
        xAxis: [],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.LINE, color: "#ffffff" }] },
        ],
      };
      const dataset = {
        dimensions: ["year", "amount"],
        source: [
          ["2021", 2],
          ["2022", 3],
          ["2023", 5],
        ],
      };
      it("can correctly determine the corresponding eCharts axis config", () => {
        const actual = determine.axis(conf, dataset, "vertical");
        expect(actual).toEqual([
          {
            show: true,
            type: "value",
            name: "amount",
            nameLocation: "center",
            nameGap: 50,
            nameTextStyle: {
              fontSize: 14,
            },
            splitLine: {
              show: true,
              lineStyle: { width: 1, type: "dashed", color: "#27272a" },
            },
          },
        ]);
      });
    });
    describe("given multiple columns", () => {
      const conf = {
        name: "My chart",
        type: ChartType.LINE,
        features: {},
        xAxis: [],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.LINE, color: "#ffffff" },
              { index: 2, type: ChartType.LINE, color: "#ffffff" },
            ],
          },
        ],
      };
      const dataset = {
        dimensions: ["year", "amount1", "amount2"],
        source: [
          ["2021", 2, 4],
          ["2022", 3, 6],
          ["2023", 5, 10],
        ],
      };
      it("can correctly determine the corresponding eCharts axis config", () => {
        const actual = determine.axis(conf, dataset, "vertical");
        expect(actual).toEqual([
          {
            show: true,
            type: "value",
            name: "amount1, amount2",
            nameLocation: "center",
            nameGap: 50,
            nameTextStyle: {
              fontSize: 14,
            },
            splitLine: {
              show: true,
              lineStyle: { width: 1, type: "dashed", color: "#27272a" },
            },
          },
        ]);
      });
    });
  });
  describe("given multiple vertical axes", () => {
    describe("each with only a single column", () => {
      const conf = {
        name: "My chart",
        type: ChartType.LINE,
        features: {},
        xAxis: [],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.LINE, color: "#ffffff" }] },
          { columns: [{ index: 2, type: ChartType.LINE, color: "#ffffff" }] },
        ],
      };
      const dataset = {
        dimensions: ["year", "temp", "rainfall"],
        source: [
          ["2021", 66, 13],
          ["2022", 68, 12],
          ["2023", 71, 11],
        ],
      };
      it("can correctly determine the corresponding eCharts axes config", () => {
        const actual = determine.axis(conf, dataset, "vertical");
        expect(actual).toEqual([
          {
            show: true,
            type: "value",
            name: "temp",
            nameLocation: "center",
            nameGap: 50,
            nameTextStyle: {
              fontSize: 14,
            },
            splitLine: {
              show: true,
              lineStyle: { width: 1, type: "dashed", color: "#27272a" },
            },
          },
          {
            show: true,
            type: "value",
            name: "rainfall",
            nameLocation: "center",
            nameGap: 50,
            nameTextStyle: {
              fontSize: 14,
            },
            splitLine: {
              show: true,
              lineStyle: { width: 1, type: "dashed", color: "#27272a" },
            },
          },
        ]);
      });
    });
    describe("each with multiple columns", () => {
      const conf = {
        name: "My chart",
        type: ChartType.LINE,
        features: {},
        xAxis: [],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.LINE, color: "#ffffff" },
              { index: 2, type: ChartType.LINE, color: "#ffffff" },
            ],
          },
          {
            columns: [
              { index: 3, type: ChartType.LINE, color: "#ffffff" },
              { index: 4, type: ChartType.LINE, color: "#ffffff" },
            ],
          },
        ],
      };
      const dataset = {
        dimensions: [
          "year",
          "high_temp",
          "low_temp",
          "high_rainfall",
          "low_rainfall",
        ],
        source: [
          ["2021", 66, 48, 13, 8],
          ["2022", 68, 46, 12, 5],
          ["2023", 71, 51, 11, 4],
        ],
      };
      it("can correctly determine the corresponding eCharts axes config", () => {
        const actual = determine.axis(conf, dataset, "vertical");
        expect(actual).toEqual([
          {
            show: true,
            type: "value",
            name: "high_temp, low_temp",
            nameLocation: "center",
            nameGap: 50,
            nameTextStyle: {
              fontSize: 14,
            },
            splitLine: {
              show: true,
              lineStyle: { width: 1, type: "dashed", color: "#27272a" },
            },
          },
          {
            show: true,
            type: "value",
            name: "high_rainfall, low_rainfall",
            nameLocation: "center",
            nameGap: 50,
            nameTextStyle: {
              fontSize: 14,
            },
            splitLine: {
              show: true,
              lineStyle: { width: 1, type: "dashed", color: "#27272a" },
            },
          },
        ]);
      });
    });
  });
});

describe("determine.series", () => {
  describe("given a single value axis", () => {
    describe("given a single column in the axis", () => {
      const dataset = {
        dimensions: ["year", "amount"],
        source: [
          ["2021", 2],
          ["2022", 3],
          ["2023", 5],
        ],
      };
      const conf = {
        name: "My chart",
        type: ChartType.LINE,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.LINE, color: "#ffffff" }] },
        ],
      };
      it("can correctly determine the eCharts series config", () => {
        const actual = determine.series(conf, dataset);
        expect(actual).toEqual([
          {
            type: "line",
            color: "#ffffff",
            yAxisIndex: 0,
            encode: { x: "year", y: "amount" },
            name: "amount",
          },
        ]);
      });
    });
    describe("given multiple columns in the axis", () => {
      const dataset = {
        dimensions: ["year", "rainfall", "temp"],
        source: [
          [2017, 13, 92],
          [2018, 11, 108],
        ],
      };
      const conf = {
        name: "My chart",
        type: ChartType.LINE,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.LINE, color: "#ffffff" }] },
          { columns: [{ index: 2, type: ChartType.LINE, color: "#ffffff" }] },
        ],
      };
      it("can correctly determine the eCharts series config", () => {
        const actual = determine.series(conf, dataset);
        expect(actual).toEqual([
          {
            type: "line",
            color: "#ffffff",
            yAxisIndex: 0,
            encode: { x: "year", y: "rainfall" },
            name: "rainfall",
          },
          {
            type: "line",
            color: "#ffffff",
            yAxisIndex: 1,
            encode: { x: "year", y: "temp" },
            name: "temp",
          },
        ]);
      });
    });
  });
  describe("given multiple value axes", () => {
    describe("given a single column in each axes", () => {
      const dataset = {
        dimensions: ["year", "rainfall", "temp"],
        source: [
          [2017, 13, 92],
          [2018, 11, 108],
        ],
      };
      const conf = {
        name: "My chart",
        type: ChartType.LINE,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.LINE, color: "#ffffff" }] },
          { columns: [{ index: 2, type: ChartType.LINE, color: "#ffffff" }] },
        ],
      };
      it("can correctly determine the eCharts series config", () => {
        const actual = determine.series(conf, dataset);
        expect(actual).toEqual([
          {
            type: "line",
            color: "#ffffff",
            yAxisIndex: 0,
            encode: { x: "year", y: "rainfall" },
            name: "rainfall",
          },
          {
            type: "line",
            color: "#ffffff",
            yAxisIndex: 1,
            encode: { x: "year", y: "temp" },
            name: "temp",
          },
        ]);
      });
    });
    describe("given a multiple columns in each axes", () => {
      const dataset = {
        dimensions: [
          "year",
          "high_rainfall",
          "low_rainfall",
          "high_temp",
          "low_temp",
        ],
        source: [
          [2017, 13, 8, 92, 68],
          [2018, 11, 4, 108, 73],
        ],
      };
      const conf = {
        name: "My chart",
        type: ChartType.LINE,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.LINE, color: "#ffffff" },
              { index: 2, type: ChartType.LINE, color: "#ffffff" },
            ],
          },
          {
            columns: [
              { index: 3, type: ChartType.LINE, color: "#ffffff" },
              { index: 4, type: ChartType.LINE, color: "#ffffff" },
            ],
          },
        ],
      };
      it("can correctly determine the eCharts series config", () => {
        const actual = determine.series(conf, dataset);
        expect(actual).toEqual([
          {
            type: "line",
            color: "#ffffff",
            yAxisIndex: 0,
            encode: { x: "year", y: "high_rainfall" },
            name: "high_rainfall",
          },
          {
            type: "line",
            color: "#ffffff",
            yAxisIndex: 0,
            encode: { x: "year", y: "low_rainfall" },
            name: "low_rainfall",
          },
          {
            type: "line",
            color: "#ffffff",
            yAxisIndex: 1,
            encode: { x: "year", y: "high_temp" },
            name: "high_temp",
          },
          {
            type: "line",
            color: "#ffffff",
            yAxisIndex: 1,
            encode: { x: "year", y: "low_temp" },
            name: "low_temp",
          },
        ]);
      });
    });
  });
  describe("feature toggles", () => {
    it("adds labels if enabled", () => {
      const dataset = {
        dimensions: ["year", "amount"],
        source: [
          ["2021", 2],
          ["2022", 3],
          ["2023", 5],
        ],
      };
      const conf = {
        name: "My chart",
        type: ChartType.BAR,
        features: {
          labels: true,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.BAR, color: "#ffffff" }] },
        ],
      };
      const actual = determine.series(conf, dataset);
      expect(actual).toEqual([
        {
          type: "bar",
          color: "#ffffff",
          yAxisIndex: 0,
          label: { show: true },
          encode: {
            x: "year",
            y: "amount",
          },
          name: "amount",
        },
      ]);
    });
    it("adds stacked if enabled", () => {
      const dataset = {
        dimensions: ["year", "amount"],
        source: [
          ["2021", 2],
          ["2022", 3],
          ["2023", 5],
        ],
      };
      const conf = {
        name: "My chart",
        type: ChartType.BAR,
        features: {
          stack: true,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.BAR, color: "#ffffff" }] },
        ],
      };
      const actual = determine.series(conf, dataset);
      expect(actual).toEqual([
        {
          type: "bar",
          color: "#ffffff",
          yAxisIndex: 0,
          stack: "total",
          encode: {
            x: "year",
            y: "amount",
          },
          name: "amount",
        },
      ]);
    });
    it("adds smoothed if enabled", () => {
      const dataset = {
        dimensions: ["year", "amount"],
        source: [
          ["2021", 2],
          ["2022", 3],
          ["2023", 5],
        ],
      };
      const conf = {
        name: "My chart",
        type: ChartType.LINE,
        features: {
          smooth: true,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.LINE, color: "#ffffff" }] },
        ],
      };
      const actual = determine.series(conf, dataset);
      expect(actual).toEqual([
        {
          type: "line",
          color: "#ffffff",
          yAxisIndex: 0,
          smooth: true,
          encode: {
            x: "year",
            y: "amount",
          },
          name: "amount",
        },
      ]);
    });
    it("adds area if enabled", () => {
      const dataset = {
        dimensions: ["year", "amount"],
        source: [
          ["2021", 2],
          ["2022", 3],
          ["2023", 5],
        ],
      };
      const conf = {
        name: "My chart",
        type: ChartType.LINE,
        features: {
          area: true,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.LINE, color: "#ffffff" }] },
        ],
      };
      const actual = determine.series(conf, dataset);
      expect(actual).toEqual([
        {
          type: "line",
          color: "#ffffff",
          yAxisIndex: 0,
          areaStyle: {},
          encode: {
            x: "year",
            y: "amount",
          },
          name: "amount",
        },
      ]);
    });
  });
});
