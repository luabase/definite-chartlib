import { describe, it, expect } from "vitest";
import { convert, ChartType, color } from "../../../src";

describe("convert.config", () => {
  describe("given a vertical bar chart", () => {
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
    it("it can convert to line chart", () => {
      expect(convert.config(conf, ChartType.LINE)).toEqual({
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
      });
    });
    it("it can convert to pie chart", () => {
      expect(convert.config(conf, ChartType.PIE)).toEqual({
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
      });
    });
    it("it can convert to scatter chart", () => {
      expect(convert.config(conf, ChartType.SCATTER)).toEqual({
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
      });
    });
    it("it can convert to heatmap", () => {
      expect(convert.config(conf, ChartType.HEATMAP)).toEqual({
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
      });
    });
    it("it can convert to calendar chart", () => {
      expect(convert.config(conf, ChartType.CALENDAR)).toEqual({
        name: "My chart",
        type: ChartType.CALENDAR,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.CALENDAR, color: color.LIME_PALETTE },
            ],
          },
        ],
      });
    });
  });
  describe("given a horizontal bar chart", () => {
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
    it("it can convert to line chart", () => {
      expect(convert.config(conf, ChartType.LINE)).toEqual({
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
      });
    });
    it("it can convert to scatter chart", () => {
      expect(convert.config(conf, ChartType.SCATTER)).toEqual({
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
      });
    });
    it("it can convert to pie chart", () => {
      expect(convert.config(conf, ChartType.PIE)).toEqual({
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
      });
    });
    it("it can convert to heatmap", () => {
      expect(convert.config(conf, ChartType.HEATMAP)).toEqual({
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
      });
    });
    it("it can convert to calendar chart", () => {
      expect(convert.config(conf, ChartType.CALENDAR)).toEqual({
        name: "My chart",
        type: ChartType.CALENDAR,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.CALENDAR, color: color.LIME_PALETTE },
            ],
          },
        ],
      });
    });
  });
  describe("given a line chart", () => {
    const conf = {
      name: "My chart",
      type: ChartType.LINE,
      features: {},
      xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
      yAxis: [
        { columns: [{ index: 1, type: ChartType.LINE, color: "#2f4b7c" }] },
      ],
    };
    it("it can convert to vertical bar chart", () => {
      expect(convert.config(conf, ChartType.BAR)).toEqual({
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
      });
    });
    it("it can convert to pie chart", () => {
      expect(convert.config(conf, ChartType.PIE)).toEqual({
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
      });
    });
    it("it can convert to scatter chart", () => {
      expect(convert.config(conf, ChartType.SCATTER)).toEqual({
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
      });
    });
    it("it can convert to heatmap chart", () => {
      expect(convert.config(conf, ChartType.HEATMAP)).toEqual({
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
      });
    });
    it("it can convert to calendar chart", () => {
      expect(convert.config(conf, ChartType.CALENDAR)).toEqual({
        name: "My chart",
        type: ChartType.CALENDAR,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.CALENDAR, color: color.LIME_PALETTE },
            ],
          },
        ],
      });
    });
  });
  describe("given a pie chart", () => {
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
    it("it can convert to line chart", () => {
      expect(convert.config(conf, ChartType.LINE)).toEqual({
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
      });
    });
    it("it can convert to bar chart", () => {
      expect(convert.config(conf, ChartType.BAR)).toEqual({
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
      });
    });
    it("it can convert to scatter chart", () => {
      expect(convert.config(conf, ChartType.SCATTER)).toEqual({
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
      });
    });
    it("it can convert to heatmap chart", () => {
      expect(convert.config(conf, ChartType.HEATMAP)).toEqual({
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
      });
    });
    it("it can convert to calendar chart", () => {
      expect(convert.config(conf, ChartType.CALENDAR)).toEqual({
        name: "My chart",
        type: ChartType.CALENDAR,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.CALENDAR, color: color.LIME_PALETTE },
            ],
          },
        ],
      });
    });
  });
  describe("given a heatmap chart", () => {
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
    it("it can convert to line chart", () => {
      expect(convert.config(conf, ChartType.LINE)).toEqual({
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
      });
    });
    it("it can convert to bar chart", () => {
      expect(convert.config(conf, ChartType.BAR)).toEqual({
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
      });
    });
    it("it can convert to pie chart", () => {
      expect(convert.config(conf, ChartType.PIE)).toEqual({
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
      });
    });
    it("it can convert to scatter chart", () => {
      expect(convert.config(conf, ChartType.SCATTER)).toEqual({
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
      });
    });
    it("it can convert to calendar chart", () => {
      expect(convert.config(conf, ChartType.CALENDAR)).toEqual({
        name: "My chart",
        type: ChartType.CALENDAR,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.CALENDAR, color: color.LIME_PALETTE },
            ],
          },
        ],
      });
    });
  });
  describe("given a scatter chart", () => {
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
    it("it can convert to line chart", () => {
      expect(convert.config(conf, ChartType.LINE)).toEqual({
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
      });
    });
    it("it can convert to bar chart", () => {
      expect(convert.config(conf, ChartType.BAR)).toEqual({
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
      });
    });
    it("it can convert to pie chart", () => {
      expect(convert.config(conf, ChartType.PIE)).toEqual({
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
      });
    });
    it("it can convert to heatmap chart", () => {
      expect(convert.config(conf, ChartType.HEATMAP)).toEqual({
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
      });
    });
    it("it can convert to calendar chart", () => {
      expect(convert.config(conf, ChartType.CALENDAR)).toEqual({
        name: "My chart",
        type: ChartType.CALENDAR,
        features: {
          title: false,
          legend: false,
        },
        xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
        yAxis: [
          {
            columns: [
              { index: 1, type: ChartType.CALENDAR, color: color.LIME_PALETTE },
            ],
          },
        ],
      });
    });
  });
  describe("given a calendar chart", () => {
    const conf = {
      name: "My chart",
      type: ChartType.CALENDAR,
      features: {},
      xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
      yAxis: [
        {
          columns: [
            { index: 1, type: ChartType.CALENDAR, color: color.LIME_PALETTE },
          ],
        },
      ],
    };
    it("it can convert to line chart", () => {
      expect(convert.config(conf, ChartType.LINE)).toEqual({
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
      });
    });
    it("it can convert to bar chart", () => {
      expect(convert.config(conf, ChartType.BAR)).toEqual({
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
      });
    });
    it("it can convert to pie chart", () => {
      expect(convert.config(conf, ChartType.PIE)).toEqual({
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
      });
    });
    it("it can convert to heatmap chart", () => {
      expect(convert.config(conf, ChartType.HEATMAP)).toEqual({
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
      });
    });
    it("it can convert to scatter chart", () => {
      expect(convert.config(conf, ChartType.SCATTER)).toEqual({
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
      });
    });
  });
});
