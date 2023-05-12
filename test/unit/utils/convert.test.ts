import { describe, it, expect } from "vitest";
import { convert, ChartType, color } from "../../../src";

describe("convert.config", () => {
  it("can convert bar to line", () => {
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
  it("can convert horizontal bar to line", () => {
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
  it("can convert line to bar", () => {
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
  it("can convert line to pie", () => {
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
  it("can bar line to pie", () => {
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
});
