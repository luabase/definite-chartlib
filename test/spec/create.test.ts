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
  ];
  describe("when passed to chart generator", () => {
    const generator = chartlib.chartGenerator(data);
    it("should return a chart", () => {
      expect(generator.next().value!.getOptions()).toEqual({
        chartType: "line",
        style: {
          showTitle: true,
          showToolbox: false,
          showLegend: true,
          lineStyle: "point",
        },
        dimensions: [{ id: 0, index: 0, dataType: "datetime" }],
        metrics: [
          { id: 0, index: 1, color: color.LIME_200, aggregation: "sum" },
        ],
      });
    });
  });
});
