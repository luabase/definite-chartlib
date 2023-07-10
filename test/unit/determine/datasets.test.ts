import { describe, expect, it } from "vitest";
import * as determine from "../../../src/determine";
import chartlib from "../../../src";
import { DataFrame } from "../../../src/dataframe";

describe("given a line chart and a dataframe with a datetime column of all year starts", () => {
  const chart = chartlib
    .create("line")
    .addDimension({ index: 0, dataType: "datetime" })
    .addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
  const df = new DataFrame([
    {
      date: "2020-01-01",
      value: 1,
    },
    {
      date: "2021-01-01",
      value: 2,
    },
    {
      date: "2022-01-01",
      value: 3,
    },
  ]);
  it("should format the datetime column as year", () => {
    expect(determine.datasets(chart, df)).toEqual([
      {
        dimensions: ["date", "value"],
        source: [
          ["2020-01-01", 1],
          ["2021-01-01", 2],
          ["2022-01-01", 3],
        ],
      },
      {
        id: "1::line::1::value",
        dimensions: ["date", "value"],
        source: [
          ["2020", 1],
          ["2021", 2],
          ["2022", 3],
        ],
      },
    ]);
  });
});

describe("given a line chart and a dataframe with a datetime column of all quarter starts", () => {
  const chart = chartlib
    .create("line")
    .addDimension({ index: 0, dataType: "datetime" })
    .addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
  const df = new DataFrame([
    {
      date: "2020-01-01",
      value: 1,
    },
    {
      date: "2020-04-01",
      value: 2,
    },
    {
      date: "2020-07-01",
      value: 3,
    },
    {
      date: "2020-10-01",
      value: 4,
    },
  ]);
  it("should format the datetime column as year", () => {
    expect(determine.datasets(chart, df)).toEqual([
      {
        dimensions: ["date", "value"],
        source: [
          ["2020-01-01", 1],
          ["2020-04-01", 2],
          ["2020-07-01", 3],
          ["2020-10-01", 4],
        ],
      },
      {
        id: "1::line::1::value",
        dimensions: ["date", "value"],
        source: [
          ["2020Q1", 1],
          ["2020Q2", 2],
          ["2020Q3", 3],
          ["2020Q4", 4],
        ],
      },
    ]);
  });
});

describe("given a line chart and a dataframe with a datetime column of all month starts", () => {
  const chart = chartlib
    .create("line")
    .addDimension({ index: 0, dataType: "datetime" })
    .addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
  const df = new DataFrame([
    {
      date: "2020-01-01",
      value: 1,
    },
    {
      date: "2020-02-01",
      value: 2,
    },
    {
      date: "2020-03-01",
      value: 3,
    },
    {
      date: "2020-04-01",
      value: 4,
    },
  ]);
  it("should format the datetime column as year", () => {
    expect(determine.datasets(chart, df)).toEqual([
      {
        dimensions: ["date", "value"],
        source: [
          ["2020-01-01", 1],
          ["2020-02-01", 2],
          ["2020-03-01", 3],
          ["2020-04-01", 4],
        ],
      },
      {
        id: "1::line::1::value",
        dimensions: ["date", "value"],
        source: [
          ["2020-01", 1],
          ["2020-02", 2],
          ["2020-03", 3],
          ["2020-04", 4],
        ],
      },
    ]);
  });
});

describe("given a line chart and a dataframe with a datetime column of non-special dates", () => {
  const chart = chartlib
    .create("line")
    .addDimension({ index: 0, dataType: "datetime" })
    .addMetric({ index: 1, color: "#ffffff", aggregation: "sum" });
  const df = new DataFrame([
    {
      date: "2020-01-01",
      value: 1,
    },
    {
      date: "2020-01-02",
      value: 2,
    },
    {
      date: "2020-01-03",
      value: 3,
    },
    {
      date: "2020-01-04",
      value: 4,
    },
  ]);
  it("should format the datetime column as year", () => {
    expect(determine.datasets(chart, df)).toEqual([
      {
        dimensions: ["date", "value"],
        source: [
          ["2020-01-01", 1],
          ["2020-01-02", 2],
          ["2020-01-03", 3],
          ["2020-01-04", 4],
        ],
      },
      {
        id: "1::line::1::value",
        dimensions: ["date", "value"],
        source: [
          ["2020-01-01", 1],
          ["2020-01-02", 2],
          ["2020-01-03", 3],
          ["2020-01-04", 4],
        ],
      },
    ]);
  });
});
