import { describe, expect, it } from "vitest";
import Chart from "../../src/chart";

describe("Chart", () => {
  it("can set style option", () => {
    const barChart = new Chart("bar");
    barChart.setStyleOption("showTitle", false);
    expect(barChart.getOptions()).toEqual({
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
    barChart.setStyleOption("foo", true);
  });
  it("can add dimension", () => {
    const barChart = new Chart("bar");
    barChart.addDimension({ index: 0, dataType: "category" });
    expect(barChart.getOptions()).toEqual({
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
    const barChart = new Chart("bar");
    barChart.addDimension({ index: 0, dataType: "category" });
    barChart.updateDimension((d) => d.index === 0, "index", 1);
    expect(barChart.getOptions()).toEqual({
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
    const barChart = new Chart("bar");
    barChart.addDimension({ index: 0, dataType: "category" });
    barChart.deleteDimension((d) => d.index === 0);
    expect(barChart.getOptions()).toEqual({
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
    const barChart = new Chart("bar");
    barChart.addMetric({
      index: 0,
      dataType: "value",
      color: "#ffffff",
      aggregation: "sum",
      axis: "left",
    });
    expect(barChart.getOptions()).toEqual({
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
    const barChart = new Chart("bar");
    barChart.addMetric({
      index: 0,
      dataType: "value",
      color: "#ffffff",
      aggregation: "sum",
    });
    barChart.updateMetric((m) => m.index === 0, "aggregation", "avg");
    barChart.updateMetric((m) => m.index === 0, "color", "#000000");
    expect(barChart.getOptions()).toEqual({
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
    const barChart = new Chart("bar");
    barChart.addMetric({
      index: 0,
      dataType: "value",
      color: "#ffffff",
      aggregation: "sum",
    });
    barChart.deleteMetric((m) => m.index === 0);
    expect(barChart.getOptions()).toEqual({
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
  it("can determine if can add a dimension", () => {
    const barChart = new Chart("bar");
    expect(barChart.canAddDimension()).toEqual(true);
    barChart.addDimension({ index: 0, dataType: "category" });
    expect(barChart.canAddDimension()).toEqual(true);
    barChart.addDimension({ index: 1, dataType: "category" });
    expect(barChart.canAddDimension()).toEqual(false);
    barChart.deleteDimension((dim) => dim.index === 1);
    barChart.addMetric({ index: 2, color: "#ffffff", aggregation: "sum" });
    expect(barChart.canAddDimension()).toEqual(true);
    barChart.addMetric({ index: 3, color: "#ffffff", aggregation: "sum" });
    expect(barChart.canAddDimension()).toEqual(false);
  });
  it("can determine if user can add metric", () => {
    const barChart = new Chart("bar");
    expect(barChart.canAddMetric()).toEqual(true);
    barChart.addDimension({ index: 0, dataType: "category" });
    barChart.addMetric({ index: 2, color: "#ffffff", aggregation: "sum" });
    expect(barChart.canAddMetric()).toEqual(true);
    barChart.addDimension({ index: 1, dataType: "category" });
    expect(barChart.canAddMetric()).toEqual(false);
    barChart.deleteDimension((dim) => dim.index === 1);
    barChart.addMetric({ index: 3, color: "#ffffff", aggregation: "sum" });
    expect(barChart.canAddMetric()).toEqual(true);
    barChart.addMetric({ index: 4, color: "#ffffff", aggregation: "sum" });
    expect(barChart.canAddMetric()).toEqual(true);
  });
});
