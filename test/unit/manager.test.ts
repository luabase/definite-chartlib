import { describe, expect, it } from "vitest";
import { ChartConfigManager } from "../../src/manager";

describe("ChartManager", () => {
  it("can set style option", () => {
    const barChartManager = new ChartConfigManager("bar");
    barChartManager.setStyleOption("showTitle", false);
    expect(barChartManager.getOptions()).toEqual({
      chartType: "bar",
      style: {
        showTitle: false,
        showToolbox: false,
        showLegend: true,
        barStyle: "grouped",
        orientation: "vertical",
      },
      dimensions: [],
      metrics: [],
    });
    // @ts-expect-error
    barChartManager.setStyleOption("foo", true);
  });
  it("can add dimension", () => {
    const barChartManager = new ChartConfigManager("bar");
    barChartManager.addDimension({ index: 0, dataType: "category" });
    expect(barChartManager.getOptions()).toEqual({
      chartType: "bar",
      style: {
        showTitle: true,
        showToolbox: false,
        showLegend: true,
        barStyle: "grouped",
        orientation: "vertical",
      },
      dimensions: [{ index: 0, dataType: "category" }],
      metrics: [],
    });
  });
  it("can update dimension", () => {
    const barChartManager = new ChartConfigManager("bar");
    barChartManager.addDimension({ index: 0, dataType: "category" });
    barChartManager.updateDimension((d) => d.index === 0, "index", 1);
    expect(barChartManager.getOptions()).toEqual({
      chartType: "bar",
      style: {
        showTitle: true,
        showToolbox: false,
        showLegend: true,
        barStyle: "grouped",
        orientation: "vertical",
      },
      dimensions: [{ index: 1, dataType: "category" }],
      metrics: [],
    });
  });
  it("can delete dimension", () => {
    const barChartManager = new ChartConfigManager("bar");
    barChartManager.addDimension({ index: 0, dataType: "category" });
    barChartManager.deleteDimension((d) => d.index === 0);
    expect(barChartManager.getOptions()).toEqual({
      chartType: "bar",
      style: {
        showTitle: true,
        showToolbox: false,
        showLegend: true,
        barStyle: "grouped",
        orientation: "vertical",
      },
      dimensions: [],
      metrics: [],
    });
  });
  it("can add metric", () => {
    const barChartManager = new ChartConfigManager("bar");
    barChartManager.addMetric({
      index: 0,
      dataType: "value",
      color: "#ffffff",
      aggregation: "sum",
      axis: "left",
    });
    expect(barChartManager.getOptions()).toEqual({
      chartType: "bar",
      style: {
        showTitle: true,
        showToolbox: false,
        showLegend: true,
        barStyle: "grouped",
        orientation: "vertical",
      },
      dimensions: [],
      metrics: [
        {
          index: 0,
          dataType: "value",
          color: "#ffffff",
          aggregation: "sum",
          axis: "left",
        },
      ],
    });
  });
  it("can update metric", () => {
    const barChartManager = new ChartConfigManager("bar");
    barChartManager.addMetric({
      index: 0,
      dataType: "value",
      color: "#ffffff",
      aggregation: "sum",
    });
    barChartManager.updateMetric((m) => m.index === 0, "aggregation", "avg");
    barChartManager.updateMetric((m) => m.index === 0, "color", "#000000");
    expect(barChartManager.getOptions()).toEqual({
      chartType: "bar",
      style: {
        showTitle: true,
        showToolbox: false,
        showLegend: true,
        barStyle: "grouped",
        orientation: "vertical",
      },
      dimensions: [],
      metrics: [
        {
          index: 0,
          dataType: "value",
          color: "#000000",
          aggregation: "avg",
        },
      ],
    });
  });
  it("can delete metric", () => {
    const barChartManager = new ChartConfigManager("bar");
    barChartManager.addMetric({
      index: 0,
      dataType: "value",
      color: "#ffffff",
      aggregation: "sum",
    });
    barChartManager.deleteMetric((m) => m.index === 0);
    expect(barChartManager.getOptions()).toEqual({
      chartType: "bar",
      style: {
        showTitle: true,
        showToolbox: false,
        showLegend: true,
        barStyle: "grouped",
        orientation: "vertical",
      },
      dimensions: [],
      metrics: [],
    });
  });
});
