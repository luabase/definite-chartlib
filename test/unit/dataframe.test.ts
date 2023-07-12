import { describe, expect, it } from "vitest";
import { DataFrame } from "../../src/dataframe";

describe("DataFrame", () => {
  it("transforms array of objects to a matrix", () => {
    const df = new DataFrame([
      { a: "foo", b: 1 },
      { a: "bar", b: 2 },
      { a: "fizz", b: 3 },
      { a: "buzz", b: 4 },
    ]);
    expect(df.data).toEqual([
      ["foo", 1],
      ["bar", 2],
      ["fizz", 3],
      ["buzz", 4],
    ]);
  });
  it("transforms keys to column array", () => {
    const df = new DataFrame([
      { a: "foo", b: 1 },
      { a: "bar", b: 2 },
      { a: "fizz", b: 3 },
      { a: "buzz", b: 4 },
    ]);
    expect(df.columns).toEqual(
      new Map<number, string>([
        [0, "a"],
        [1, "b"],
      ])
    );
    expect(df.columns.get(0)).toEqual("a");
  });
  it("can sum data", () => {
    const df = new DataFrame([
      { a: "foo", b: 1 },
      { a: "foo", b: 2 },
      { a: "bar", b: 3 },
      { a: "bar", b: 4 },
    ]);
    expect(df.groupBy(1, 0, "sum").data).toEqual([
      ["foo", 3],
      ["bar", 7],
    ]);
  });
  it("can avg data", () => {
    const df = new DataFrame([
      { a: "foo", b: 1 },
      { a: "foo", b: 2 },
      { a: "bar", b: 3 },
      { a: "bar", b: 4 },
      { a: "bar", b: 4 },
      { a: "bar", b: 5 },
      { a: "bar", b: 3 },
    ]);
    expect(df.groupBy(1, 0, "avg").data).toEqual([
      ["foo", 1.5],
      ["bar", 3.8],
    ]);
  });
  it("can count data", () => {
    const df = new DataFrame([
      { a: "foo", b: 1 },
      { a: "foo", b: 2 },
      { a: "bar", b: 3 },
      { a: "bar", b: 4 },
    ]);
    expect(df.groupBy(1, 0, "count").data).toEqual([
      ["foo", 2],
      ["bar", 2],
    ]);
  });
  it("can distinct count data", () => {
    const df = new DataFrame([
      { a: "foo", b: 1 },
      { a: "foo", b: 1 },
      { a: "bar", b: 2 },
      { a: "bar", b: 2 },
    ]);
    expect(df.groupBy(1, 0, "distinct").data).toEqual([
      ["foo", 1],
      ["bar", 1],
    ]);
  });
  it("can min data", () => {
    const df = new DataFrame([
      { a: "foo", b: 1 },
      { a: "foo", b: 3 },
      { a: "bar", b: 2 },
      { a: "bar", b: 4 },
    ]);
    expect(df.groupBy(1, 0, "min").data).toEqual([
      ["foo", 1],
      ["bar", 2],
    ]);
  });
  it("can max data", () => {
    const df = new DataFrame([
      { a: "foo", b: 1 },
      { a: "foo", b: 3 },
      { a: "bar", b: 2 },
      { a: "bar", b: 4 },
    ]);
    expect(df.groupBy(1, 0, "max").data).toEqual([
      ["foo", 3],
      ["bar", 4],
    ]);
  });
  it("can filter data", () => {
    const df = new DataFrame([
      { a: "foo", b: 1 },
      { a: "foo", b: 2 },
      { a: "bar", b: 3 },
      { a: "bar", b: 4 },
    ]);
    expect(df.filter(0, (v) => v === "bar").data).toEqual([
      ["bar", 3],
      ["bar", 4],
    ]);
  });
  it("can be exported as ECDataset", () => {
    const df = new DataFrame([
      { a: "foo", b: 1 },
      { a: "bar", b: 2 },
      { a: "fizz", b: 3 },
      { a: "buzz", b: 4 },
    ]);
    expect(df.asDataSet()).toEqual({
      dimensions: ["a", "b"],
      source: [
        ["foo", 1],
        ["bar", 2],
        ["fizz", 3],
        ["buzz", 4],
      ],
    });
  });
  it("can pivot the dataframe", () => {
    const df = new DataFrame([
      { date: "2020-01-01", cat: "blue", val: 1 },
      { date: "2020-01-01", cat: "red", val: 3 },
      { date: "2020-01-01", cat: "red", val: 2 },
      { date: "2020-01-01", cat: "red", val: 1 },
      { date: "2020-01-02", cat: "blue", val: 1 },
      { date: "2020-01-03", cat: "blue", val: 1 },
      { date: "2020-01-03", cat: "blue", val: 2 },
      { date: "2020-01-03", cat: "red", val: 4 },
      { date: "2020-01-04", cat: "blue", val: 1 },
      { date: "2020-01-05", cat: "blue", val: 1 },
      { date: "2020-01-05", cat: "red", val: 2 },
    ]);
    expect(df.pivot(0, 1, 2, "sum").data).toEqual([
      ["2020-01-01", 1, 6],
      ["2020-01-02", 1, null],
      ["2020-01-03", 3, 4],
      ["2020-01-04", 1, null],
      ["2020-01-05", 1, 2],
    ]);
    expect(df.pivot(0, 1, 2, "avg").data).toEqual([
      ["2020-01-01", 1, 2],
      ["2020-01-02", 1, null],
      ["2020-01-03", 1.5, 4],
      ["2020-01-04", 1, null],
      ["2020-01-05", 1, 2],
    ]);
    expect(df.pivot(0, 1, 2, "min").data).toEqual([
      ["2020-01-01", 1, 1],
      ["2020-01-02", 1, null],
      ["2020-01-03", 1, 4],
      ["2020-01-04", 1, null],
      ["2020-01-05", 1, 2],
    ]);
    expect(df.pivot(0, 1, 2, "max").data).toEqual([
      ["2020-01-01", 1, 3],
      ["2020-01-02", 1, null],
      ["2020-01-03", 2, 4],
      ["2020-01-04", 1, null],
      ["2020-01-05", 1, 2],
    ]);
    expect(df.pivot(0, 1, 2, "count").data).toEqual([
      ["2020-01-01", 1, 3],
      ["2020-01-02", 1, null],
      ["2020-01-03", 2, 1],
      ["2020-01-04", 1, null],
      ["2020-01-05", 1, 1],
    ]);
    expect(df.pivot(0, 1, 2, "distinct").data).toEqual([
      ["2020-01-01", 1, 3],
      ["2020-01-02", 1, null],
      ["2020-01-03", 2, 1],
      ["2020-01-04", 1, null],
      ["2020-01-05", 1, 1],
    ]);
  });
  it("can select subset of columns", () => {
    const df = new DataFrame([
      { a: 1, b: 2, c: 3 },
      { a: 1, b: 2, c: 3 },
      { a: 1, b: 2, c: 3 },
    ]);
    expect(df.select([0, 2]).data).toEqual([
      [1, 3],
      [1, 3],
      [1, 3],
    ]);
  });
});
