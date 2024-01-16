import { describe, expect, it } from "vitest";

import { AutoChartFactory } from "../../src/factory";
import { color } from "../../src/constants";

describe("given a list of column options", () => {
  const colOpts = [
    { index: 0, dataType: "category" },
    // { index: 1, dataType: "datetime" },
    // { index: 2, dataType: "category" },
    // { index: 3, dataType: "category" },
    { index: 4, dataType: "value" },
    { index: 5, dataType: "value" },
    { index: 6, dataType: "value" },
  ];
  it("can provide a list of charts with subsets that can be created", () => {
    const factory = new AutoChartFactory(colOpts, true);
    const charts = factory
      .generateAllCharts()
      .map((chart) => chart.getOptions());
    expect(charts).toEqual([
      {
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 4, color: color.LIME_200, aggregation: "sum" },
        ],
      },
      {
        chartType: "pie",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 4, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      },
      {
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 5, color: color.LIME_200, aggregation: "sum" },
        ],
      },
      {
        chartType: "pie",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 5, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      },
      {
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 6, color: color.LIME_200, aggregation: "sum" },
        ],
      },
      {
        chartType: "pie",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 6, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      },
      {
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 4, color: color.LIME_200, aggregation: "sum" },
          { id: 1, index: 5, color: color.DARK_BLUE, aggregation: "sum" },
        ],
      },
      {
        chartType: "scatter",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 4, color: color.LIME_200, aggregation: "none" },
          { id: 1, index: 5, color: color.DARK_BLUE, aggregation: "none" },
        ],
      },
      {
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 4, color: color.LIME_200, aggregation: "sum" },
          { id: 1, index: 6, color: color.DARK_BLUE, aggregation: "sum" },
        ],
      },
      {
        chartType: "scatter",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 4, color: color.LIME_200, aggregation: "none" },
          { id: 1, index: 6, color: color.DARK_BLUE, aggregation: "none" },
        ],
      },
      {
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 5, color: color.LIME_200, aggregation: "sum" },
          { id: 1, index: 6, color: color.DARK_BLUE, aggregation: "sum" },
        ],
      },
      {
        chartType: "scatter",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 5, color: color.LIME_200, aggregation: "none" },
          { id: 1, index: 6, color: color.DARK_BLUE, aggregation: "none" },
        ],
      },
      {
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 4, color: color.LIME_200, aggregation: "sum" },
          { id: 1, index: 5, color: color.DARK_BLUE, aggregation: "sum" },
          { id: 2, index: 6, color: color.DARK_PURPLE, aggregation: "sum" },
        ],
      },
    ]);
  });
  it("can provide a list of charts without subsets that can be created", () => {
    const factory = new AutoChartFactory(colOpts, false);
    const charts = factory
      .generateAllCharts()
      .map((chart) => chart.getOptions());
    expect(charts).toEqual([
      {
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 4, color: color.LIME_200, aggregation: "sum" },
          { id: 1, index: 5, color: color.DARK_BLUE, aggregation: "sum" },
          { id: 2, index: 6, color: color.DARK_PURPLE, aggregation: "sum" },
        ],
      },
    ]);
  });
  const singleColOpt = [
    { index: 0, dataType: "category" },
  ];
  it("cannot generate single category charts", () => {
    const factory = new AutoChartFactory(singleColOpt, false);
    const charts = factory
      .generateAllCharts()
      .map((chart) => chart.getOptions());
    expect(charts).toEqual([]);
  });
  it("can generate single value charts", () => {
    const factory = new AutoChartFactory([{ index: 0, dataType: "value" }], false);
    const charts = factory.generateAllCharts().map(chart => chart.getOptions())
    expect(charts).toEqual([
      {
        chartType: "kpi",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [],
        metrics: [
          { id: 0, index: 0, color: color.LIME_200, aggregation: "none" }
        ]
      }
    ]);
  })
});
