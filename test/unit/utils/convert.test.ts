import { describe, it, expect } from "vitest";
import { convert, ChartType, color } from "../../../src";

describe("convert.config", () => {
  describe("given a vertical bar chart", () => {
    it("it can convert to line chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.BAR,
        features: {
          title: false,
          legend: true,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.BAR, color: "#2f4b7c" }] },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.LINE,
        features: {
          title: false,
          legend: true,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.LINE, color: "#2f4b7c" }] },
        ],
      };
      expect(convert.config(conf, ChartType.LINE)).toEqual(converted);
    });
    it("it can convert to pie chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.BAR,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.BAR, color: "#2f4b7c" }] },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.PIE,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.PIE, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      expect(convert.config(conf, ChartType.PIE)).toEqual(converted);
    });
    it("it can convert to scatter chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.BAR,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.BAR, color: "#2f4b7c" }] },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.SCATTER,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [{ index: 1, type: ChartType.SCATTER, color: "#2f4b7c" }],
          },
        ],
      };
      expect(convert.config(conf, ChartType.SCATTER)).toEqual(converted);
    });
    it("it can convert to heatmap", () => {
      const conf = {
        name: "My chart",
        type: ChartType.BAR,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.BAR, color: "#2f4b7c" }] },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.HEATMAP,
        features: {
          title: false,
          legend: false,
          labels: true,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        zAxis: [
          {
            columns: [
              { index: 1, type: ChartType.HEATMAP, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      expect(convert.config(conf, ChartType.HEATMAP)).toEqual(converted);
    });
  });
  describe("given a horizontal bar chart", () => {
    it("it can convert to line chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.BAR,
        features: {
          orientation: "horizontal",
        },
        xAxis: [
          { columns: [{ index: 1, type: ChartType.BAR, color: "#2f4b7c" }] },
        ],
        yAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
      };
      const converted = {
        name: "My chart",
        type: ChartType.LINE,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.LINE, color: "#2f4b7c" }] },
        ],
      };
      expect(convert.config(conf, ChartType.LINE)).toEqual(converted);
    });
    it("it can convert to scatter chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.BAR,
        features: {
          orientation: "horizontal",
        },
        xAxis: [
          { columns: [{ index: 1, type: ChartType.BAR, color: "#2f4b7c" }] },
        ],
        yAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
      };
      const converted = {
        name: "My chart",
        type: ChartType.SCATTER,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [{ index: 1, type: ChartType.SCATTER, color: "#2f4b7c" }],
          },
        ],
      };
      expect(convert.config(conf, ChartType.SCATTER)).toEqual(converted);
    });
    it("it can convert to pie chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.BAR,
        features: {
          orientation: "horizontal",
        },
        xAxis: [
          { columns: [{ index: 1, type: ChartType.BAR, color: "#2f4b7c" }] },
        ],
        yAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
      };
      const converted = {
        name: "My chart",
        type: ChartType.PIE,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.PIE, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      expect(convert.config(conf, ChartType.PIE)).toEqual(converted);
    });
    it("it can convert to heatmap", () => {
      const conf = {
        name: "My chart",
        type: ChartType.BAR,
        features: {
          orientation: "horizontal",
        },
        xAxis: [
          { columns: [{ index: 1, type: ChartType.BAR, color: "#2f4b7c" }] },
        ],
        yAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
      };
      const converted = {
        name: "My chart",
        type: ChartType.HEATMAP,
        features: {
          title: false,
          legend: false,
          labels: true,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        zAxis: [
          {
            columns: [
              { index: 1, type: ChartType.HEATMAP, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      expect(convert.config(conf, ChartType.HEATMAP)).toEqual(converted);
    });
  });
  describe("given a line chart", () => {
    it("it can convert to vertical bar chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.LINE,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.LINE, color: "#2f4b7c" }] },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.BAR,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.BAR, color: "#2f4b7c" }] },
        ],
      };
      expect(convert.config(conf, ChartType.BAR)).toEqual(converted);
    });
    it("it can convert to pie chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.LINE,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.LINE, color: "#2f4b7c" }] },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.PIE,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.PIE, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      expect(convert.config(conf, ChartType.PIE)).toEqual(converted);
    });
    it("it can convert to scatter chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.LINE,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.LINE, color: "#2f4b7c" }] },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.SCATTER,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [{ index: 1, type: ChartType.SCATTER, color: "#2f4b7c" }],
          },
        ],
      };
      expect(convert.config(conf, ChartType.SCATTER)).toEqual(converted);
    });
    it("it can convert to heatmap chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.LINE,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.LINE, color: "#2f4b7c" }] },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.HEATMAP,
        features: {
          title: false,
          legend: false,
          labels: true,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        zAxis: [
          {
            columns: [
              { index: 1, type: ChartType.HEATMAP, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      expect(convert.config(conf, ChartType.HEATMAP)).toEqual(converted);
    });
  });
  describe("given a pie chart", () => {
    it("it can convert to line chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.PIE,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.PIE, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.LINE,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.LINE, color: "#d9f99d" }] },
        ],
      };
      expect(convert.config(conf, ChartType.LINE)).toEqual(converted);
    });
    it("it can convert to bar chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.PIE,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.PIE, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.BAR,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.BAR, color: "#d9f99d" }] },
        ],
      };
      expect(convert.config(conf, ChartType.BAR)).toEqual(converted);
    });
    it("it can convert to scatter chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.PIE,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.PIE, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.SCATTER,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.SCATTER, color: color.LIME_200 },
            ],
          },
        ],
      };
      expect(convert.config(conf, ChartType.SCATTER)).toEqual(converted);
    });
    it("it can convert to heatmap chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.PIE,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.PIE, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.HEATMAP,
        features: {
          title: false,
          legend: false,
          labels: true,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        zAxis: [
          {
            columns: [
              { index: 1, type: ChartType.HEATMAP, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      expect(convert.config(conf, ChartType.HEATMAP)).toEqual(converted);
    });
  });
  describe("given a heatmap chart", () => {
    it("it can convert to line chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.HEATMAP,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        zAxis: [
          {
            columns: [
              { index: 1, type: ChartType.HEATMAP, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.LINE,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.LINE, color: color.LIME_200 },
            ],
          },
        ],
      };
      expect(convert.config(conf, ChartType.LINE)).toEqual(converted);
    });
    it("it can convert to bar chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.HEATMAP,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        zAxis: [
          {
            columns: [
              { index: 1, type: ChartType.HEATMAP, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.BAR,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [{ index: 1, type: ChartType.BAR, color: color.LIME_200 }],
          },
        ],
      };
      expect(convert.config(conf, ChartType.BAR)).toEqual(converted);
    });
    it("it can convert to pie chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.HEATMAP,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        zAxis: [
          {
            columns: [
              { index: 1, type: ChartType.HEATMAP, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.PIE,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.PIE, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      expect(convert.config(conf, ChartType.PIE)).toEqual(converted);
    });
    it("it can convert to line chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.HEATMAP,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        zAxis: [
          {
            columns: [
              { index: 1, type: ChartType.HEATMAP, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.SCATTER,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.SCATTER, color: color.LIME_200 },
            ],
          },
        ],
      };
      expect(convert.config(conf, ChartType.SCATTER)).toEqual(converted);
    });
  });
  describe("given a scatter chart", () => {
    it("it can convert to line chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.SCATTER,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [{ index: 1, type: ChartType.SCATTER, color: "#2f4b7c" }],
          },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.LINE,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.LINE, color: "#2f4b7c" }] },
        ],
      };
      expect(convert.config(conf, ChartType.LINE)).toEqual(converted);
    });
    it("it can convert to line chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.SCATTER,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [{ index: 1, type: ChartType.SCATTER, color: "#2f4b7c" }],
          },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.BAR,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          { columns: [{ index: 1, type: ChartType.BAR, color: "#2f4b7c" }] },
        ],
      };
      expect(convert.config(conf, ChartType.BAR)).toEqual(converted);
    });
    it("it can convert to pie chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.SCATTER,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [{ index: 1, type: ChartType.SCATTER, color: "#2f4b7c" }],
          },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.PIE,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.PIE, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      expect(convert.config(conf, ChartType.PIE)).toEqual(converted);
    });
    it("it can convert to heatmap chart", () => {
      const conf = {
        name: "My chart",
        type: ChartType.SCATTER,
        features: {},
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [{ index: 1, type: ChartType.SCATTER, color: "#2f4b7c" }],
          },
        ],
      };
      const converted = {
        name: "My chart",
        type: ChartType.HEATMAP,
        features: {
          title: false,
          legend: false,
          labels: true,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        zAxis: [
          {
            columns: [
              { index: 1, type: ChartType.HEATMAP, color: color.LIME_PALETTE },
            ],
          },
        ],
      };
      expect(convert.config(conf, ChartType.HEATMAP)).toEqual(converted);
    });
  });
});
