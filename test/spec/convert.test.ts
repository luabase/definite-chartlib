import { describe, expect, it } from "vitest";
import chartlib from "../../src";
import { color } from "../../src/constants";

describe("given an initial bar chart", () => {
  // state 0
  const chart = chartlib
    .create("bar")
    .addDimension({ index: 0, dataType: "category" })
    .addMetric({ index: 1, color: color.LIME_200, aggregation: "sum" });
  let newChart;
  it("can be converted to a line chart", () => {
    // state 1
    newChart = chart.convertTo("line");
    expect(newChart.getChartType()).toEqual("line");
    expect(newChart.getBreakdownDimension()).toBeUndefined();
    expect(newChart.canAddDimension()).toBe(true);
    expect(newChart.canAddMetric()).toBe(true);
    expect(newChart.getStyleShowTitle()).toBe(false);
    expect(newChart.getStyleShowLegend()).toBe(true);
    expect(newChart.getStyleLineStyle()).toEqual("point");
  });
  it("can then be converted to a pie chart", () => {
    // state 2
    newChart = newChart!.convertTo("pie");
    expect(newChart.getChartType()).toEqual("pie");
    expect(newChart.getBreakdownDimension()).toBeUndefined();
    expect(newChart.canAddDimension()).toBe(false);
    expect(newChart.canAddMetric()).toBe(false);
    expect(newChart.getStyleShowTitle()).toBe(false);
  });
  it("can then be converted to a scatter chart", () => {
    // state 3
    newChart = newChart!.convertTo("scatter");
    expect(newChart.getChartType()).toEqual("scatter");
    expect(newChart.getBreakdownDimension()).toBeUndefined();
    expect(newChart.canAddDimension()).toBe(true);
    expect(newChart.canAddMetric()).toBe(true); // user can add a metric to control symbol size
    expect(newChart.getStyleShowTitle()).toBe(false);
  });
  it("can then be converted to a heatmap chart", () => {
    // state 4
    newChart = newChart!.convertTo("heatmap");
    expect(newChart.getChartType()).toEqual("heatmap");
    expect(newChart.getBreakdownDimension()).toBeUndefined();
    expect(newChart.canAddDimension()).toBe(false);
    expect(newChart.canAddMetric()).toBe(false);
    expect(newChart.getStyleShowTitle()).toBe(false);
    expect(newChart.getStyleColorGrouping()).toEqual("continuous");
  });
  it("can then be converted to a calendar chart", () => {
    // state 5
    newChart = newChart!.convertTo("calendar");
    expect(newChart.getChartType()).toEqual("calendar");
    expect(newChart.getBreakdownDimension()).toBeUndefined();
    expect(newChart.canAddDimension()).toBe(false);
    expect(newChart.canAddMetric()).toBe(false);
    expect(newChart.getStyleShowTitle()).toBe(false);
    expect(newChart.getStyleColorGrouping()).toEqual("continuous");
  });
  it("can be converted back to a bar chart", () => {
    // state 6
    newChart = newChart!.convertTo("bar");
    expect(newChart.getChartType()).toEqual("bar");
    expect(newChart.getBreakdownDimension()).toBeUndefined();
    expect(newChart.canAddDimension()).toBe(true);
    expect(newChart.canAddMetric()).toBe(true);
    expect(newChart.getStyleShowTitle()).toBe(false);
    expect(newChart.getStyleShowLegend()).toBe(true);
    expect(newChart.getStyleBarStyle()).toEqual("grouped");
  });
});
