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
  it("can split by column data", () => {
    const df = new DataFrame([
      { a: "foo", b: 1 },
      { a: "foo", b: 2 },
      { a: "bar", b: 3 },
      { a: "bar", b: 4 },
    ]);
    expect(df.splitBy(0).map((df) => df.data)).toEqual([
      [
        ["foo", 1],
        ["foo", 2],
      ],
      [
        ["bar", 3],
        ["bar", 4],
      ],
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
});
