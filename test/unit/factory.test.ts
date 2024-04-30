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
        dimensions: [
          {
            dataType: "category",
            format: undefined,
            id: 0,
            index: 0,
          },
        ],
        metrics: [
          {
            aggregation: "sum",
            color: "#d9f99d",
            format: undefined,
            id: 0,
            index: 4,
          },
        ],
        style: {
          barStyle: "grouped",
          orientation: "vertical",
          showLegend: true,
          showTitle: false,
          showToolbox: false,
        },
      },
      {
        chartType: "pie",
        dimensions: [
          {
            dataType: "category",
            format: undefined,
            id: 0,
            index: 0,
          },
        ],
        metrics: [
          {
            aggregation: "sum",
            color: [
              "#d9f99d",
              "#bef264",
              "#a3e635",
              "#84cc16",
              "#65a30d",
              "#4d7c0f",
              "#3f6212",
              "#365314",
            ],
            format: undefined,
            id: 0,
            index: 4,
          },
        ],
        style: {
          showTitle: false,
          showToolbox: false,
        },
      },
      {
        chartType: "bar",
        dimensions: [
          {
            dataType: "category",
            format: undefined,
            id: 0,
            index: 0,
          },
        ],
        metrics: [
          {
            aggregation: "sum",
            color: "#d9f99d",
            format: undefined,
            id: 0,
            index: 5,
          },
        ],
        style: {
          barStyle: "grouped",
          orientation: "vertical",
          showLegend: true,
          showTitle: false,
          showToolbox: false,
        },
      },
      {
        chartType: "pie",
        dimensions: [
          {
            dataType: "category",
            format: undefined,
            id: 0,
            index: 0,
          },
        ],
        metrics: [
          {
            aggregation: "sum",
            color: [
              "#d9f99d",
              "#bef264",
              "#a3e635",
              "#84cc16",
              "#65a30d",
              "#4d7c0f",
              "#3f6212",
              "#365314",
            ],
            format: undefined,
            id: 0,
            index: 5,
          },
        ],
        style: {
          showTitle: false,
          showToolbox: false,
        },
      },
      {
        chartType: "kpi",
        dimensions: [],
        metrics: [
          {
            aggregation: "none",
            color: "#d9f99d",
            format: undefined,
            id: 0,
            index: 4,
          },
        ],
        style: {
          showLongNumber: false,
          showTitle: true,
          showToolbox: false,
        },
      },
      {
        chartType: "bar",
        dimensions: [
          {
            dataType: "category",
            format: undefined,
            id: 0,
            index: 0,
          },
        ],
        metrics: [
          {
            aggregation: "sum",
            color: "#d9f99d",
            format: undefined,
            id: 0,
            index: 6,
          },
        ],
        style: {
          barStyle: "grouped",
          orientation: "vertical",
          showLegend: true,
          showTitle: false,
          showToolbox: false,
        },
      },
      {
        chartType: "pie",
        dimensions: [
          {
            dataType: "category",
            format: undefined,
            id: 0,
            index: 0,
          },
        ],
        metrics: [
          {
            aggregation: "sum",
            color: [
              "#d9f99d",
              "#bef264",
              "#a3e635",
              "#84cc16",
              "#65a30d",
              "#4d7c0f",
              "#3f6212",
              "#365314",
            ],
            format: undefined,
            id: 0,
            index: 6,
          },
        ],
        style: {
          showTitle: false,
          showToolbox: false,
        },
      },
      {
        chartType: "kpi",
        dimensions: [],
        metrics: [
          {
            aggregation: "none",
            color: "#d9f99d",
            format: undefined,
            id: 0,
            index: 4,
          },
        ],
        style: {
          showLongNumber: false,
          showTitle: true,
          showToolbox: false,
        },
      },
      {
        chartType: "kpi",
        dimensions: [],
        metrics: [
          {
            aggregation: "none",
            color: "#d9f99d",
            format: undefined,
            id: 0,
            index: 5,
          },
        ],
        style: {
          showLongNumber: false,
          showTitle: true,
          showToolbox: false,
        },
      },
      {
        chartType: "bar",
        dimensions: [
          {
            dataType: "category",
            format: undefined,
            id: 0,
            index: 0,
          },
        ],
        metrics: [
          {
            aggregation: "sum",
            color: "#d9f99d",
            format: undefined,
            id: 0,
            index: 4,
          },
          {
            aggregation: "sum",
            color: "#2f4b7c",
            format: undefined,
            id: 1,
            index: 5,
          },
        ],
        style: {
          barStyle: "grouped",
          orientation: "vertical",
          showLegend: true,
          showTitle: false,
          showToolbox: false,
        },
      },
      {
        chartType: "scatter",
        dimensions: [
          {
            dataType: "category",
            format: undefined,
            id: 0,
            index: 0,
          },
        ],
        metrics: [
          {
            aggregation: "none",
            color: "#d9f99d",
            format: undefined,
            id: 0,
            index: 4,
          },
          {
            aggregation: "none",
            color: "#2f4b7c",
            format: undefined,
            id: 1,
            index: 5,
          },
        ],
        style: {
          showTitle: false,
          showToolbox: false,
        },
      },
      {
        chartType: "bar",
        dimensions: [
          {
            dataType: "category",
            format: undefined,
            id: 0,
            index: 0,
          },
        ],
        metrics: [
          {
            aggregation: "sum",
            color: "#d9f99d",
            format: undefined,
            id: 0,
            index: 4,
          },
          {
            aggregation: "sum",
            color: "#2f4b7c",
            format: undefined,
            id: 1,
            index: 6,
          },
        ],
        style: {
          barStyle: "grouped",
          orientation: "vertical",
          showLegend: true,
          showTitle: false,
          showToolbox: false,
        },
      },
      {
        chartType: "scatter",
        dimensions: [
          {
            dataType: "category",
            format: undefined,
            id: 0,
            index: 0,
          },
        ],
        metrics: [
          {
            aggregation: "none",
            color: "#d9f99d",
            format: undefined,
            id: 0,
            index: 4,
          },
          {
            aggregation: "none",
            color: "#2f4b7c",
            format: undefined,
            id: 1,
            index: 6,
          },
        ],
        style: {
          showTitle: false,
          showToolbox: false,
        },
      },
      {
        chartType: "bar",
        dimensions: [
          {
            dataType: "category",
            format: undefined,
            id: 0,
            index: 0,
          },
        ],
        metrics: [
          {
            aggregation: "sum",
            color: "#d9f99d",
            format: undefined,
            id: 0,
            index: 5,
          },
          {
            aggregation: "sum",
            color: "#2f4b7c",
            format: undefined,
            id: 1,
            index: 6,
          },
        ],
        style: {
          barStyle: "grouped",
          orientation: "vertical",
          showLegend: true,
          showTitle: false,
          showToolbox: false,
        },
      },
      {
        chartType: "scatter",
        dimensions: [
          {
            dataType: "category",
            format: undefined,
            id: 0,
            index: 0,
          },
        ],
        metrics: [
          {
            aggregation: "none",
            color: "#d9f99d",
            format: undefined,
            id: 0,
            index: 5,
          },
          {
            aggregation: "none",
            color: "#2f4b7c",
            format: undefined,
            id: 1,
            index: 6,
          },
        ],
        style: {
          showTitle: false,
          showToolbox: false,
        },
      },
      {
        chartType: "kpi",
        dimensions: [],
        metrics: [
          {
            aggregation: "none",
            color: "#d9f99d",
            format: undefined,
            id: 0,
            index: 4,
          },
        ],
        style: {
          showLongNumber: false,
          showTitle: true,
          showToolbox: false,
        },
      },
      {
        chartType: "bar",
        dimensions: [
          {
            dataType: "category",
            format: undefined,
            id: 0,
            index: 0,
          },
        ],
        metrics: [
          {
            aggregation: "sum",
            color: "#d9f99d",
            format: undefined,
            id: 0,
            index: 4,
          },
          {
            aggregation: "sum",
            color: "#2f4b7c",
            format: undefined,
            id: 1,
            index: 5,
          },
          {
            aggregation: "sum",
            color: "#665191",
            format: undefined,
            id: 2,
            index: 6,
          },
        ],
        style: {
          barStyle: "grouped",
          orientation: "vertical",
          showLegend: true,
          showTitle: false,
          showToolbox: false,
        },
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
  const singleColOpt = [{ index: 0, dataType: "category" }];
  it("cannot generate single category charts", () => {
    const factory = new AutoChartFactory(singleColOpt, false);
    const charts = factory
      .generateAllCharts()
      .map((chart) => chart.getOptions());
    expect(charts).toEqual([]);
  });
  it("can generate single value charts", () => {
    const factory = new AutoChartFactory(
      [
        { index: 0, dataType: "value" },
        { index: 1, dataType: "value" },
        { index: 2, dataType: "value" },
      ],
      false
    );
    const charts = factory
      .generateAllCharts()
      .map((chart) => chart.getOptions());
    expect(charts).toEqual([
      {
        chartType: "kpi",
        style: {
          showTitle: true,
          showToolbox: false,
          showLongNumber: false,
        },
        dimensions: [],
        metrics: [
          { id: 0, index: 0, color: color.LIME_200, aggregation: "none" },
        ],
      },
    ]);
  });
});
