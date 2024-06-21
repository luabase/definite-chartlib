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
    const generator = chartlib.chartGenerator(data, true);
    it("can infinitely shuffle through all chart options", () => {
      expect(generator.next().value?.getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_200, aggregation: "sum" },
        ],
      });
      expect(generator.next().value?.getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.COLOR_PALETTE, aggregation: "sum" },
        ],
      });
      expect(generator.next().value?.getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 2, color: color.LIME_200, aggregation: "sum" },
        ],
      });
      expect(generator.next().value?.getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 2, color: color.COLOR_PALETTE, aggregation: "sum" },
        ],
      });

      expect(generator.next().value?.getOptions()).toEqual({
        chartType: "kpi",
        style: {
          showTitle: true,
          showToolbox: false,
          showLongNumber: false,
        },
        dimensions: [],
        metrics: [
          {
            id: 0,
            index: 1,
            color: color.LIME_200,
            aggregation: "none",
            format: undefined,
          },
        ],
      });

      expect(generator.next().value?.getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_200, aggregation: "sum" },
          { id: 1, index: 2, color: color.DARK_BLUE, aggregation: "sum" },
        ],
      });
      expect(generator.next().value?.getOptions()).toEqual({
        chartType: "scatter",
        style: {
          showTitle: false,
          showToolbox: false,
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_200, aggregation: "none" },
          { id: 1, index: 2, color: color.DARK_BLUE, aggregation: "none" },
        ],
      });
      // will revolve back to the beginning of the options
      expect(generator.next().value?.getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_200, aggregation: "sum" },
        ],
      });
      expect(generator.next().value?.getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.COLOR_PALETTE, aggregation: "sum" },
        ],
      });
      expect(generator.next().value?.getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: false,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 2, color: color.LIME_200, aggregation: "sum" },
        ],
      });
      expect(generator.next().value?.getOptions()).toEqual({
        chartType: "calendar",
        style: {
          showTitle: false,
          showToolbox: false,
          colorGrouping: "continuous",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 2, color: color.COLOR_PALETTE, aggregation: "sum" },
        ],
      });

      expect(generator.next().value?.getOptions()).toEqual({
        chartType: "kpi",
        style: {
          showTitle: true,
          showToolbox: false,
          showLongNumber: false,
        },
        dimensions: [],
        metrics: [
          {
            id: 0,
            index: 1,
            color: color.LIME_200,
            aggregation: "none",
            format: undefined,
          },
        ],
      });
    });
  });
});
