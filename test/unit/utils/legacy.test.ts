import { describe, it, expect } from "vitest";
import { legacy } from "../../../src/utils";
import { color } from "../../../src/constants";

describe("legacy.toChartConfig", () => {
  it("can convert legacy block details to chart config for chart", () => {
    const legacyDetails = {
      type: "viz",
      name: "Onboarding Stages by year week Chart",
      xAxis: "YEAR_WEEK",
      yAxis: "SIGNED_UP",
      chartType: "bar",
    };
    const results = {
      rows: [],
      schema: [
        {
          name: "YEAR_WEEK",
          type: "string",
        },
        {
          name: "SIGNED_UP",
          type: "string",
        },
      ],
    };
    expect(legacy.toChartConfig(legacyDetails, results)).toEqual({
      name: "Onboarding Stages by year week Chart",
      type: "bar",
      features: {},
      xAxis: [
        {
          columns: [{ index: 0, type: null, color: null }],
        },
      ],
      yAxis: [
        {
          columns: [{ index: 1, type: "bar", color: "#d9f99d" }],
        },
      ],
    });
  });
  it("can convert legacy block details to chart config for chart with additional series", () => {
    const legacyDetails = {
      type: "viz",
      name: "Onboarding Stages by year week Chart",
      xAxis: "YEAR_WEEK",
      yAxis: "SIGNED_UP",
      chartType: "bar",
      series: [
        {
          type: "bar",
          color: "#2f4b7c",
          column: "INTEGRATED",
        },
        {
          type: "bar",
          color: "#665191",
          column: "INTEGRATED_DEMO",
        },
      ],
    };
    const results = {
      rows: [],
      schema: [
        {
          name: "YEAR_WEEK",
          type: "string",
        },
        {
          name: "SIGNED_UP",
          type: "string",
        },
        {
          name: "INTEGRATED_DEMO",
          type: "string",
        },
        {
          name: "INTEGRATED",
          type: "string",
        },
      ],
    };
    expect(legacy.toChartConfig(legacyDetails, results)).toEqual({
      name: "Onboarding Stages by year week Chart",
      type: "bar",
      features: {},
      xAxis: [
        {
          columns: [{ index: 0, type: null, color: null }],
        },
      ],
      yAxis: [
        {
          columns: [
            { index: 1, type: "bar", color: "#d9f99d" },
            { index: 3, type: "bar", color: "#2f4b7c" },
            { index: 2, type: "bar", color: "#665191" },
          ],
        },
      ],
    });
  });
  it("can convert legacy block details to chart config for pie chart", () => {
    const legacyDetails = {
      type: "viz",
      name: "Cost By Project",
      xAxis: "project_id",
      yAxis: "total_cost",
      chartType: "pie",
    };
    const results = {
      rows: [
        { project_id: "luabase-staging", total_cost: "964.71" },
        { project_id: null, total_cost: "0.00" },
        { project_id: "definite-371419", total_cost: "1586.63" },
      ],
      schema: [
        {
          name: "project_id",
          type: "string",
        },
        {
          name: "total_cost",
          type: "string",
        },
      ],
    };
    expect(legacy.toChartConfig(legacyDetails, results)).toEqual({
      name: "Cost By Project",
      type: "pie",
      features: {},
      xAxis: [
        {
          columns: [{ index: 0, type: null, color: null }],
        },
      ],
      yAxis: [
        {
          columns: [
            { index: 1, type: "pie", color: color.LIME_PALETTE },
          ],
        },
      ],
    });
  });
  it("can convert legacy block details to chart config with out of order rows", () => {
    const legacyDetails = {
      type: "viz",
      name: "Onboarding Stages by year week Chart",
      xAxis: "YEAR_WEEK",
      yAxis: "SIGNED_UP",
      chartType: "bar",
    };
    const results = {
      rows: [],
      schema: [
        {
          name: "YEAR_WEEK",
          type: "string",
        },
        {
          name: "SIGNED_UP",
          type: "string",
        },
      ],
    };
    expect(legacy.toChartConfig(legacyDetails, results)).toEqual({
      name: "Onboarding Stages by year week Chart",
      type: "bar",
      features: {},
      xAxis: [
        {
          columns: [{ index: 0, type: null, color: null }],
        },
      ],
      yAxis: [
        {
          columns: [{ index: 1, type: "bar", color: "#d9f99d" }],
        },
      ],
    });
  });
});
