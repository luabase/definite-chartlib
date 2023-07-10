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
    // { index: 5, dataType: "value" },
    // { index: 6, dataType: "value" },
  ];
  it("can provide a list of charts that can be created", () => {
    const factory = new AutoChartFactory(colOpts);
    const charts = factory
      .generateAllCharts()
      .map((chart) => chart.getOptions());
    expect(charts).toEqual([
      {
        chartType: "bar",
        style: {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ index: 0, dataType: "category" }],
        metrics: [{ index: 4, color: color.LIME_200, aggregation: "sum" }],
      },
      {
        chartType: "pie",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [{ index: 0, dataType: "category" }],
        metrics: [{ index: 4, color: color.LIME_200, aggregation: "sum" }],
      },
    ]);
  });
});
