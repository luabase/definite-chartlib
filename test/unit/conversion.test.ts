import { describe, expect, it } from "vitest";
import { Chart } from "../../src/chart";
import { color } from "../../src/constants";

describe("given a bar chart", () => {
  describe("with 1 dimension and 1 metric", () => {
    const chart = new Chart("bar");
    chart.addDimension({ index: 0, dataType: "category" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
    it("can convert to line chart", () => {
      expect(chart.convertTo("line").getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [{ id: 0, index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convertTo("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          {
            id: 0,
            index: 1,
            color: color.LIME_PALETTE,
            aggregation: "sum",
          },
        ],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convertTo("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 1, color: "#ffffff", aggregation: "none" },
          { id: 1, index: 1, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convertTo("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { id: 0, index: 0, dataType: "category" },
          { id: 1, index: 0, dataType: "category" },
        ],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "none" },
        ],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convertTo("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
  });
  describe("with 1 dimension and 2 metrics", () => {
    const chart = new Chart("bar");
    chart.addDimension({ index: 0, dataType: "category" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
    chart.addMetric({ index: 2, color: "#ffffff", aggregation: "sum" });
    it("can convert to line chart", () => {
      expect(chart.convertTo("line").getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 1, color: "#ffffff", aggregation: "sum" },
          { id: 1, index: 2, color: "#ffffff", aggregation: "sum" },
        ],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convertTo("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convertTo("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 1, color: "#ffffff", aggregation: "none" },
          { id: 1, index: 2, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convertTo("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { id: 0, index: 0, dataType: "category" },
          { id: 1, index: 0, dataType: "category" },
        ],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "none" },
        ],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convertTo("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
  });
  describe("with 2 dimensions and 1 metric", () => {
    const chart = new Chart("bar");
    chart.addDimension({ index: 0, dataType: "category" });
    chart.addDimension({ index: 2, dataType: "category" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
    it("can convert to line chart", () => {
      expect(chart.convertTo("line").getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [{ id: 0, index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convertTo("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convertTo("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 1, color: "#ffffff", aggregation: "none" },
          { id: 1, index: 1, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convertTo("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { id: 0, index: 0, dataType: "category" },
          { id: 1, index: 2, dataType: "category" },
        ],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "none" },
        ],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convertTo("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
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
      expect(chart.convertTo("bar").getOptions()).toEqual({
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [{ id: 0, index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convertTo("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convertTo("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: "#ffffff", aggregation: "none" },
          { id: 1, index: 1, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convertTo("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { id: 0, index: 0, dataType: "datetime" },
          { id: 1, index: 0, dataType: "datetime" },
        ],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "none" },
        ],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convertTo("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
  });
  describe("with 1 dimension and 2 metrics", () => {
    const chart = new Chart("line");
    chart.addDimension({ index: 0, dataType: "datetime" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
    chart.addMetric({ index: 2, color: "#ffffff", aggregation: "sum" });
    it("can convert to bar chart", () => {
      expect(chart.convertTo("bar").getOptions()).toEqual({
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: "#ffffff", aggregation: "sum" },
          { id: 1, index: 2, color: "#ffffff", aggregation: "sum" },
        ],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convertTo("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convertTo("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: "#ffffff", aggregation: "none" },
          { id: 1, index: 2, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convertTo("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { id: 0, index: 0, dataType: "datetime" },
          { id: 1, index: 0, dataType: "datetime" },
        ],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "none" },
        ],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convertTo("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
  });
  describe("with 2 dimensions and 1 metric", () => {
    const chart = new Chart("line");
    chart.addDimension({ index: 0, dataType: "datetime" });
    chart.addDimension({ index: 1, dataType: "category" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
    it("can convert to bar chart", () => {
      expect(chart.convertTo("bar").getOptions()).toEqual({
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [{ id: 0, index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convertTo("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convertTo("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: "#ffffff", aggregation: "none" },
          { id: 1, index: 1, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convertTo("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { id: 0, index: 0, dataType: "datetime" },
          { id: 1, index: 1, dataType: "category" },
        ],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "none" },
        ],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convertTo("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
  });
});

describe("given a pie chart", () => {
  describe("with 1 dimension and 1 metric", () => {
    const chart = new Chart("pie");
    chart.addDimension({ index: 0, dataType: "category" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
    it("can convert to bar chart", () => {
      expect(chart.convertTo("bar").getOptions()).toEqual({
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [{ id: 0, index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to line chart", () => {
      expect(chart.convertTo("line").getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [{ id: 0, index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convertTo("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 1, color: "#ffffff", aggregation: "none" },
          { id: 1, index: 1, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convertTo("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { id: 0, index: 0, dataType: "category" },
          { id: 1, index: 0, dataType: "category" },
        ],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "none" },
        ],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convertTo("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
  });
});

describe("given a scatter chart", () => {
  describe("with 1 dimension and 2 metrics", () => {
    const chart = new Chart("scatter");
    chart.addDimension({ index: 0, dataType: "category" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "none" });
    chart.addMetric({ index: 2, color: "#ffffff", aggregation: "none" });
    it("can convert to bar chart", () => {
      expect(chart.convertTo("bar").getOptions()).toEqual({
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
          { id: 0, index: 1, color: "#ffffff", aggregation: "sum" },
          { id: 1, index: 2, color: "#ffffff", aggregation: "sum" },
        ],
      });
    });
    it("can convert to line chart", () => {
      expect(chart.convertTo("line").getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 1, color: "#ffffff", aggregation: "sum" },
          { id: 1, index: 2, color: "#ffffff", aggregation: "sum" },
        ],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convertTo("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convertTo("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { id: 0, index: 0, dataType: "category" },
          { id: 1, index: 0, dataType: "category" },
        ],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "none" },
        ],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convertTo("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
  });
});

describe("given a heatmap chart", () => {
  describe("with 2 dimensions and 1 metric", () => {
    const chart = new Chart("heatmap");
    chart.addDimension({ index: 0, dataType: "category" });
    chart.addDimension({ index: 2, dataType: "category" });
    chart.addMetric({ index: 1, color: ["#ffffff"], aggregation: "none" });
    it("can convert to bar chart", () => {
      expect(chart.convertTo("bar").getOptions()).toEqual({
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [{ id: 0, index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to line chart", () => {
      expect(chart.convertTo("line").getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [{ id: 0, index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convertTo("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [{ id: 0, index: 1, color: ["#ffffff"], aggregation: "sum" }],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convertTo("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "category" }],
        metrics: [
          { id: 0, index: 1, color: "#ffffff", aggregation: "none" },
          { id: 1, index: 1, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convertTo("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [{ id: 0, index: 1, color: ["#ffffff"], aggregation: "sum" }],
      });
    });
  });
});

describe("given a calendar chart", () => {
  describe("with 1 dimension and 1 metric", () => {
    const chart = new Chart("calendar");
    chart.addDimension({ index: 0, dataType: "datetime" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
    it("can convert to bar chart", () => {
      expect(chart.convertTo("bar").getOptions()).toEqual({
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [{ id: 0, index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to line chart", () => {
      expect(chart.convertTo("line").getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [{ id: 0, index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convertTo("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convertTo("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: "#ffffff", aggregation: "none" },
          { id: 1, index: 1, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convertTo("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { id: 0, index: 0, dataType: "datetime" },
          { id: 1, index: 0, dataType: "datetime" },
        ],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "none" },
        ],
      });
    });
  });
  describe("with 1 dimension and 2 metrics", () => {
    const chart = new Chart("line");
    chart.addDimension({ index: 0, dataType: "datetime" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
    chart.addMetric({ index: 2, color: "#ffffff", aggregation: "sum" });
    it("can convert to bar chart", () => {
      expect(chart.convertTo("bar").getOptions()).toEqual({
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: "#ffffff", aggregation: "sum" },
          { id: 1, index: 2, color: "#ffffff", aggregation: "sum" },
        ],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convertTo("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convertTo("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: "#ffffff", aggregation: "none" },
          { id: 1, index: 2, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convertTo("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { id: 0, index: 0, dataType: "datetime" },
          { id: 1, index: 0, dataType: "datetime" },
        ],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "none" },
        ],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convertTo("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
  });
  describe("with 2 dimensions and 1 metric", () => {
    const chart = new Chart("line");
    chart.addDimension({ index: 0, dataType: "datetime" });
    chart.addDimension({ index: 1, dataType: "category" });
    chart.addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
    it("can convert to bar chart", () => {
      expect(chart.convertTo("bar").getOptions()).toEqual({
        chartType: "bar",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          barStyle: "grouped",
          orientation: "vertical",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [{ id: 0, index: 1, color: "#ffffff", aggregation: "sum" }],
      });
    });
    it("can convert to pie chart", () => {
      expect(chart.convertTo("pie").getOptions()).toEqual({
        chartType: "pie",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
    it("can convert to scatter chart", () => {
      expect(chart.convertTo("scatter").getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: "#ffffff", aggregation: "none" },
          { id: 1, index: 1, color: "#ffffff", aggregation: "none" },
        ],
      });
    });
    it("can convert to heatmap chart", () => {
      expect(chart.convertTo("heatmap").getOptions()).toEqual({
        chartType: "heatmap",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [
          { id: 0, index: 0, dataType: "datetime" },
          { id: 1, index: 1, dataType: "category" },
        ],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "none" },
        ],
      });
    });
    it("can convert to calendar chart", () => {
      expect(chart.convertTo("calendar").getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_PALETTE, aggregation: "sum" },
        ],
      });
    });
  });
});
