import { describe, expect, it } from "vitest";
import * as determine from "../../../src/determine";
import { ChartConfigOptions } from "../../../src/types";
import { DataFrame } from "../../../src/dataframe";
import { categoryFormatter, valueFormatter } from "../../../src/formatters";

describe("given a bar chart type", () => {
  describe("given a vertical orientation", () => {
    const opts: ChartConfigOptions<"bar"> = {
      chartType: "bar",
      style: {
        showTitle: true,
        showToolbox: false,
        showLegend: true,
        barStyle: "grouped",
        orientation: "vertical",
      },
      dimensions: [{ index: 0, dataType: "category" }],
      metrics: [
        { index: 1, dataType: "value", color: "#ffffff", aggregation: "sum" },
      ],
    };
    const df = new DataFrame([
      { type: "blue", value: 30 },
      { type: "yellow", value: 30 },
      { type: "red", value: 30 },
    ]);
    it("can determine xAxis", () => {
      expect(determine.xAxis(opts, df)).toEqual([
        {
          type: "category",
          show: true,
          name: "type",
          nameLocation: "center",
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
          },
          axisLabel: {
            interval: 0,
            rotate: 0,
            formatter: categoryFormatter,
          },
        },
      ]);
    });
    describe("given a larger dataframe", () => {
      const df = new DataFrame([
        { type: "red", value: 30 },
        { type: "orange", value: 30 },
        { type: "yellow", value: 30 },
        { type: "green", value: 30 },
        { type: "blue", value: 30 },
        { type: "indigo", value: 30 },
        { type: "violet", value: 30 },
      ]);
      it("rotates the axis label", () => {
        expect(determine.xAxis(opts, df)).toEqual([
          {
            type: "category",
            show: true,
            name: "type",
            nameLocation: "center",
            nameGap: 55,
            nameTextStyle: {
              fontSize: 14,
            },
            axisLabel: {
              interval: 0,
              rotate: 30,
              formatter: categoryFormatter,
            },
          },
        ]);
      });
    });
  });
  describe("given a horizontal orientation", () => {
    const opts: ChartConfigOptions<"bar"> = {
      chartType: "bar",
      style: {
        showTitle: true,
        showToolbox: false,
        showLegend: true,
        barStyle: "grouped",
        orientation: "horizontal",
      },
      dimensions: [{ index: 0, dataType: "category" }],
      metrics: [
        { index: 1, dataType: "value", color: "#ffffff", aggregation: "sum" },
      ],
    };
    const df = new DataFrame([
      { type: "blue", value: 30 },
      { type: "yellow", value: 30 },
      { type: "red", value: 30 },
    ]);
    it("can determine xAxis", () => {
      expect(determine.xAxis(opts, df)).toEqual([
        {
          type: "value",
          show: true,
          name: "value",
          nameLocation: "center",
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
          },
          axisLabel: {
            formatter: valueFormatter,
          },
        },
      ]);
    });
  });
});

describe("given a line chart type", () => {
  const opts: ChartConfigOptions<"line"> = {
    chartType: "line",
    style: {
      showTitle: true,
      showToolbox: false,
      showLegend: true,
      lineStyle: "point",
      showArea: false,
    },
    dimensions: [{ index: 0, dataType: "datetime" }],
    metrics: [
      { index: 1, dataType: "value", color: "#ffffff", aggregation: "sum" },
    ],
  };
  const df = new DataFrame([
    { date: "2020-01-01", value: 30 },
    { date: "2020-01-01", value: 30 },
    { date: "2020-01-01", value: 30 },
  ]);
  it("can determine xAxis", () => {
    expect(determine.xAxis(opts, df)).toEqual([
      {
        type: "category",
        show: true,
        name: "date",
        nameLocation: "center",
        nameGap: 30,
        nameTextStyle: {
          fontSize: 14,
        },
      },
    ]);
  });
});

describe("given a pie chart type", () => {
  const opts: ChartConfigOptions<"pie"> = {
    chartType: "pie",
    style: {
      showTitle: true,
      showToolbox: false,
    },
    dimensions: [{ index: 0, dataType: "category" }],
    metrics: [
      { index: 1, dataType: "value", color: "#ffffff", aggregation: "sum" },
    ],
  };
  const df = new DataFrame([
    { label: "fruit", value: 30 },
    { label: "vegetable", value: 30 },
  ]);
  it("can determine xAxis", () => {
    expect(determine.xAxis(opts, df)).toEqual([
      {
        type: "category",
        show: false,
        name: "label",
        nameLocation: "center",
        nameGap: 30,
        nameTextStyle: {
          fontSize: 14,
        },
      },
    ]);
  });
});

describe("given a scatter chart type", () => {
  const opts: ChartConfigOptions<"scatter"> = {
    chartType: "scatter",
    style: {
      showTitle: true,
      showToolbox: false,
    },
    dimensions: [],
    metrics: [
      { index: 0, dataType: "value", color: "#ffffff", aggregation: "none" },
      { index: 1, dataType: "value", color: "#ffffff", aggregation: "none" },
    ],
  };
  const df = new DataFrame([
    { height_cm: 180, weight_kg: 80 },
    { height_cm: 160, weight_kg: 60 },
  ]);
  it("can determine xAxis", () => {
    expect(determine.xAxis(opts, df)).toEqual([
      {
        type: "value",
        show: true,
        name: "height_cm",
        nameLocation: "center",
        nameGap: 30,
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
        axisLabel: {
          formatter: valueFormatter,
        },
      },
    ]);
  });
});

describe("given a heatmap chart type", () => {
  const opts: ChartConfigOptions<"heatmap"> = {
    chartType: "heatmap",
    style: {
      showTitle: true,
      showToolbox: false,
      colorGrouping: "continuous",
    },
    dimensions: [
      { index: 0, dataType: "datetime" },
      { index: 1, dataType: "category" },
    ],
    metrics: [
      { index: 2, dataType: "value", color: "#ffffff", aggregation: "none" },
    ],
  };
  const df = new DataFrame([
    { date: "2020-01-01", hour: "1am", value: 30 },
    { date: "2020-01-01", hour: "1am", value: 30 },
    { date: "2020-01-01", hour: "1am", value: 30 },
  ]);
  it("can determine xAxis", () => {
    expect(determine.xAxis(opts, df)).toEqual([
      {
        type: "category",
        show: true,
        name: "date",
        nameLocation: "center",
        nameGap: 30,
        nameTextStyle: {
          fontSize: 14,
        },
      },
    ]);
  });
});

describe("given a calendar chart type", () => {
  const opts: ChartConfigOptions<"calendar"> = {
    chartType: "calendar",
    style: {
      showTitle: true,
      showToolbox: false,
      colorGrouping: "continuous",
    },
    dimensions: [{ index: 0, dataType: "datetime" }],
    metrics: [
      { index: 2, dataType: "value", color: "#ffffff", aggregation: "sum" },
    ],
  };
  const df = new DataFrame([
    { date: "2020-01-01", value: 30 },
    { date: "2020-01-01", value: 30 },
    { date: "2020-01-01", value: 30 },
  ]);
  it("can determine xAxis", () => {
    expect(determine.xAxis(opts, df)).toEqual([
      {
        type: "category",
        show: false,
        name: "date",
        nameLocation: "center",
        nameGap: 30,
        nameTextStyle: {
          fontSize: 14,
        },
      },
    ]);
  });
});
