import { describe, expect, it } from "vitest";
import chartlib from "../../src";
import { color } from "../../src/constants";

describe("given an array of column metadata", () => {
  const data = [
    {
      index: 0,
      dataType: "datetime",
    },
    {
      index: 1,
      dataType: "value",
    },
    {
      index: 2,
      dataType: "value",
    },
  ];
  describe("when passed to chart generator", () => {
    const generator = chartlib.chartGenerator(data);
    it("can infinitely shuffle through all chart options", () => {
      expect(generator.next().value).toEqual({
        chartType: "line",
        style: {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 1, color: color.LIME_200, aggregation: "sum" }],
      });
      expect(generator.next().value).toEqual({
        chartType: "calendar",
        style: {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 1, color: color.LIME_PALETTE, aggregation: "sum" }],
      });
      expect(generator.next().value).toEqual({
        chartType: "line",
        style: {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 2, color: color.LIME_200, aggregation: "sum" }],
      });
      expect(generator.next().value).toEqual({
        chartType: "calendar",
        style: {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 2, color: color.LIME_PALETTE, aggregation: "sum" }],
      });
      expect(generator.next().value).toEqual({
        chartType: "line",
        style: {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [
          { index: 1, color: color.LIME_200, aggregation: "sum" },
          { index: 2, color: color.DARK_BLUE, aggregation: "sum" },
        ],
      });
      expect(generator.next().value).toEqual({
        chartType: "scatter",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [
          { index: 1, color: color.LIME_200, aggregation: "none" },
          { index: 2, color: color.DARK_BLUE, aggregation: "none" },
        ],
      });
      // will revolve back to the beginning of the options
      expect(generator.next().value).toEqual({
        chartType: "line",
        style: {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 1, color: color.LIME_200, aggregation: "sum" }],
      });
      expect(generator.next().value).toEqual({
        chartType: "calendar",
        style: {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 1, color: color.LIME_PALETTE, aggregation: "sum" }],
      });
      expect(generator.next().value).toEqual({
        chartType: "line",
        style: {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 2, color: color.LIME_200, aggregation: "sum" }],
      });
      expect(generator.next().value).toEqual({
        chartType: "calendar",
        style: {
          showTitle: true,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [{ index: 2, color: color.LIME_PALETTE, aggregation: "sum" }],
      });
      expect(generator.next().value).toEqual({
        chartType: "line",
        style: {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [
          { index: 1, color: color.LIME_200, aggregation: "sum" },
          { index: 2, color: color.DARK_BLUE, aggregation: "sum" },
        ],
      });
      expect(generator.next().value).toEqual({
        chartType: "scatter",
        style: {
          showTitle: true,
          showToolbox: false,
        },
        dimensions: [{ index: 0, dataType: "datetime" }],
        metrics: [
          { index: 1, color: color.LIME_200, aggregation: "none" },
          { index: 2, color: color.DARK_BLUE, aggregation: "none" },
        ],
      });
    });
  });
});
