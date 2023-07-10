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

describe("given a legacy pie chart config", () => {
  const legacy: LegacyOptions<"pie"> = {
    name: "",
    type: "pie",
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
            color: ["#ffffff"],
            type: "pie",
          },
        ],
      },
    ],
  };
  it("can load as chart object", () => {
    expect(Chart.fromLegacy(legacy).getOptions()).toEqual({
      chartType: "pie",
      style: {
        showTitle: false,
        showToolbox: false,
      },
      dimensions: [{ index: 0, dataType: "category" }],
      metrics: [{ index: 1, color: ["#ffffff"], aggregation: "sum" }],
    });
  });
});

describe("given a legacy scatter chart config", () => {
  const legacy: LegacyOptions<"scatter"> = {
    name: "",
    type: "scatter",
    features: {},
    xAxis: [
      {
        columns: [
          {
            index: 0,
            color: "#ffffff",
            type: "scatter",
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
            type: "scatter",
          },
        ],
      },
    ],
  };
  it("can load as chart object", () => {
    expect(Chart.fromLegacy(legacy).getOptions()).toEqual({
      chartType: "scatter",
      style: {
        showTitle: false,
        showToolbox: false,
      },
      dimensions: [{ index: 0, dataType: "category" }],
      metrics: [
        { index: 0, color: "#ffffff", aggregation: "none" },
        { index: 1, color: "#ffffff", aggregation: "none" },
      ],
    });
  });
});

describe("given a legacy heatmap chart config", () => {
  const legacy: LegacyOptions<"heatmap"> = {
    name: "",
    type: "heatmap",
    features: {
      piecewise: true,
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
            color: null,
            type: "heatmap",
          },
        ],
      },
    ],
    zAxis: [
      {
        columns: [
          {
            index: 2,
            color: ["#ffffff"],
            type: "heatmap",
          },
        ],
      },
    ],
  };
  it("can load as chart object", () => {
    expect(Chart.fromLegacy(legacy).getOptions()).toEqual({
      chartType: "heatmap",
      style: {
        showTitle: false,
        showToolbox: false,
        colorGrouping: "piecewise",
      },
      dimensions: [
        { index: 0, dataType: "category" },
        { index: 1, dataType: "category" },
      ],
      metrics: [{ index: 2, color: ["#ffffff"], aggregation: "none" }],
    });
  });
});

describe("given a legacy calendar chart config", () => {
  const legacy: LegacyOptions<"calendar"> = {
    name: "",
    type: "calendar",
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
            color: ["#ffffff"],
            type: "calendar",
          },
        ],
      },
    ],
  };
  it("can load as chart object", () => {
    expect(Chart.fromLegacy(legacy).getOptions()).toEqual({
      chartType: "calendar",
      style: {
        showTitle: false,
        showToolbox: false,
        colorGrouping: "continuous",
      },
      dimensions: [{ index: 0, dataType: "datetime" }],
      metrics: [{ index: 1, color: ["#ffffff"], aggregation: "sum" }],
    });
  });
});
