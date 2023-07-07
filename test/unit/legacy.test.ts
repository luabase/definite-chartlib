import { describe, expect, it } from "vitest";
import Chart from "../../src/chart";
import { LegacyOptions } from "../../src/types/legacy";

describe("given a legacy vertical bar chart config", () => {
  const legacy: LegacyOptions<"bar"> = {
    name: "",
    type: "bar",
    features: {},
    xAxis: [
      {
        columns: [
          {
            index: 0,
            color: null,
            type: null,
          },
        ],
      },
    ],
    yAxis: [
      {
        columns: [
          {
            index: 1,
            color: "#ffffff",
            type: "bar",
          },
        ],
      },
    ],
  };
  it("can load as chart object", () => {
    expect(Chart.fromLegacy(legacy).getOptions()).toEqual({
      chartType: "bar",
      style: {
        showTitle: false,
        showToolbox: false,
        showLegend: false,
        barStyle: "grouped",
        orientation: "vertical",
      },
      dimensions: [{ index: 0, dataType: "category" }],
      metrics: [
        { index: 1, color: "#ffffff", chartType: "bar", aggregation: "sum" },
      ],
    });
  });
});

describe("given a legacy horizontal bar chart config", () => {
  const legacy: LegacyOptions<"bar"> = {
    name: "",
    type: "bar",
    features: {
      title: true,
      legend: true,
      orientation: "horizontal",
    },
    xAxis: [
      {
        columns: [
          {
            index: 1,
            color: "#ffffff",
            type: "bar",
          },
        ],
      },
    ],
    yAxis: [
      {
        columns: [
          {
            index: 0,
            color: null,
            type: null,
          },
        ],
      },
    ],
  };
  it("can load as chart object", () => {
    expect(Chart.fromLegacy(legacy).getOptions()).toEqual({
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
        { index: 1, color: "#ffffff", chartType: "bar", aggregation: "sum" },
      ],
    });
  });
});

describe("given a legacy stacked bar chart config", () => {
  const legacy: LegacyOptions<"bar"> = {
    name: "",
    type: "bar",
    features: {
      stack: true,
    },
    xAxis: [
      {
        columns: [
          {
            index: 0,
            color: null,
            type: null,
          },
        ],
      },
    ],
    yAxis: [
      {
        columns: [
          {
            index: 1,
            color: "#ffffff",
            type: "bar",
          },
          {
            index: 2,
            color: "#ffffff",
            type: "bar",
          },
        ],
      },
    ],
  };
  it("can load as chart object", () => {
    expect(Chart.fromLegacy(legacy).getOptions()).toEqual({
      chartType: "bar",
      style: {
        showTitle: false,
        showToolbox: false,
        showLegend: false,
        barStyle: "stacked",
        orientation: "vertical",
      },
      dimensions: [{ index: 0, dataType: "category" }],
      metrics: [
        { index: 1, color: "#ffffff", chartType: "bar", aggregation: "sum" },
        { index: 2, color: "#ffffff", chartType: "bar", aggregation: "sum" },
      ],
    });
  });
});

describe("given a legacy line chart config", () => {
  const legacy: LegacyOptions<"line"> = {
    name: "",
    type: "line",
    features: {},
    xAxis: [
      {
        columns: [
          {
            index: 0,
            color: null,
            type: null,
          },
        ],
      },
    ],
    yAxis: [
      {
        columns: [
          {
            index: 1,
            color: "#ffffff",
            type: "line",
          },
        ],
      },
    ],
  };
  it("can load as chart object", () => {
    expect(Chart.fromLegacy(legacy).getOptions()).toEqual({
      chartType: "line",
      style: {
        showTitle: false,
        showToolbox: false,
        showLegend: false,
        lineStyle: "point",
      },
      dimensions: [{ index: 0, dataType: "category" }],
      metrics: [
        { index: 1, color: "#ffffff", chartType: "line", aggregation: "sum" },
      ],
    });
  });
});

describe("given a legacy area line chart config", () => {
  const legacy: LegacyOptions<"line"> = {
    name: "",
    type: "line",
    features: {
      area: true,
    },
    xAxis: [
      {
        columns: [
          {
            index: 0,
            color: null,
            type: null,
          },
        ],
      },
    ],
    yAxis: [
      {
        columns: [
          {
            index: 1,
            color: "#ffffff",
            type: "line",
          },
          {
            index: 2,
            color: "#ffffff",
            type: "line",
          },
        ],
      },
    ],
  };
  it("can load as chart object", () => {
    expect(Chart.fromLegacy(legacy).getOptions()).toEqual({
      chartType: "line",
      style: {
        showTitle: false,
        showToolbox: false,
        showLegend: false,
        lineStyle: "area",
      },
      dimensions: [{ index: 0, dataType: "category" }],
      metrics: [
        { index: 1, color: "#ffffff", chartType: "line", aggregation: "sum" },
        { index: 2, color: "#ffffff", chartType: "line", aggregation: "sum" },
      ],
    });
  });
});
