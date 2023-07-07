import { describe, expect, it } from "vitest";
import Chart from "../../src/chart";

describe("given a bar chart", () => {
  describe("with 1 dimension and 1 metric", () => {
    const chart = new Chart("bar");
    chart.addDimension({ index: 0, dataType: "category" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
    it("can convert to line chart", () => {
      expect(chart.convert("line").getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ index: 0, dataType: "category" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convert("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [{ index: 0, dataType: "category" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convert("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [{ index: 0, dataType: "category" }],
        metrics: [
          { index: 1, color: "#ffffff", aggregation: "none" },
          { index: 1, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convert("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { index: 0, dataType: "category" },
          { index: 0, dataType: "category" },
        ],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "none" }],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convert("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
  });
  describe("with 1 dimension and 2 metrics", () => {
    const chart = new Chart("bar");
    chart.addDimension({ index: 0, dataType: "category" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
    chart.addMetric({ index: 2, color: "#ffffff", aggregation: "sum" });
    it("can convert to line chart", () => {
      expect(chart.convert("line").getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ index: 0, dataType: "category" }],
        metrics: [
          { index: 1, color: "#ffffff", aggregation: "sum" },
          { index: 2, color: "#ffffff", aggregation: "sum" },
        ],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convert("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [{ index: 0, dataType: "category" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convert("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [{ index: 0, dataType: "category" }],
        metrics: [
          { index: 1, color: "#ffffff", aggregation: "none" },
          { index: 2, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convert("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { index: 0, dataType: "category" },
          { index: 0, dataType: "category" },
        ],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "none" }],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convert("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
  });
  describe("with 2 dimensions and 1 metric", () => {
    const chart = new Chart("bar");
    chart.addDimension({ index: 0, dataType: "category" });
    chart.addDimension({ index: 2, dataType: "category" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
    it("can convert to line chart", () => {
      expect(chart.convert("line").getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ index: 0, dataType: "category" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convert("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [{ index: 0, dataType: "category" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convert("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [{ index: 0, dataType: "category" }],
        metrics: [
          { index: 1, color: "#ffffff", aggregation: "none" },
          { index: 1, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convert("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { index: 0, dataType: "category" },
          { index: 2, dataType: "category" },
        ],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "none" }],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convert("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
  });
});

describe("given a line chart", () => {
  describe("with 1 dimension and 1 metric", () => {
    const chart = new Chart("line");
    chart.addDimension({ index: 0, dataType: "datetime" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
    it("can convert to bar chart", () => {
      expect(chart.convert("bar").getOptions()).toEqual({
        chartType: "bar",
        style: {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convert("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convert("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [
          { index: 1, color: "#ffffff", aggregation: "none" },
          { index: 1, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convert("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { index: 0, dataType: "datetime" },
          { index: 0, dataType: "datetime" },
        ],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "none" }],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convert("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
  });
  describe("with 1 dimension and 2 metrics", () => {
    const chart = new Chart("line");
    chart.addDimension({ index: 0, dataType: "datetime" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
    chart.addMetric({ index: 2, color: "#ffffff", aggregation: "sum" });
    it("can convert to bar chart", () => {
      expect(chart.convert("bar").getOptions()).toEqual({
        chartType: "bar",
        style: {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [
          { index: 1, color: "#ffffff", aggregation: "sum" },
          { index: 2, color: "#ffffff", aggregation: "sum" },
        ],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convert("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convert("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [
          { index: 1, color: "#ffffff", aggregation: "none" },
          { index: 2, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convert("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { index: 0, dataType: "datetime" },
          { index: 0, dataType: "datetime" },
        ],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "none" }],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convert("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
  });
  describe("with 2 dimensions and 1 metric", () => {
    const chart = new Chart("line");
    chart.addDimension({ index: 0, dataType: "datetime" });
    chart.addDimension({ index: 1, dataType: "category" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
    it("can convert to bar chart", () => {
      expect(chart.convert("bar").getOptions()).toEqual({
        chartType: "bar",
        style: {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convert("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convert("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [
          { index: 1, color: "#ffffff", aggregation: "none" },
          { index: 1, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convert("heatmap").getOptions()).toEqual({
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
        metrics: [{ index: 1, color: "#ffffff", aggregation: "none" }],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convert("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
  });
});
