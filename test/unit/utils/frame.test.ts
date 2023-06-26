import { describe, it, expect } from "vitest";
import { frame } from "../../../src/utils";
import { TFConfig } from "../../../src/types";

describe("transpose", () => {
  it("can turn row-oriented matrix to column-oriented", () => {
    expect(
      frame.transpose([
        ["foo", 1],
        ["bar", 2],
      ])
    ).toEqual([
      ["foo", "bar"],
      [1, 2],
    ]);
  });
});

describe("formatValues", () => {
  it("will format dates if all dates are start/end of year", () => {
    const matrix = [
      ["2020-01-01", 1],
      ["2021-01-01", 2],
    ];
    expect(frame.formatValues(matrix)).toEqual([
      ["2020", 1],
      ["2021", 2],
    ]);
  });
  it("will format dates if all dates are start/end of quarter", () => {
    const matrix = [
      ["2020-01-01", 1],
      ["2020-04-01", 2],
    ];
    expect(frame.formatValues(matrix)).toEqual([
      ["2020Q1", 1],
      ["2020Q2", 2],
    ]);
  });
  it("will format dates if all dates are start/end of month", () => {
    const matrix = [
      ["2020-01-01", 1],
      ["2020-02-01", 1],
      ["2020-03-01", 2],
      ["2020-04-01", 2],
    ];
    expect(frame.formatValues(matrix)).toEqual([
      ["2020-01", 1],
      ["2020-02", 1],
      ["2020-03", 2],
      ["2020-04", 2],
    ]);
  });
  it("will cast values to numbers if possible", () => {
    const matrix = [
      ["1", 1],
      ["1", 1],
      ["1", 1],
    ];
    expect(frame.formatValues(matrix)).toEqual([
      [1, 1],
      [1, 1],
      [1, 1],
    ]);
  });
});

describe("select", () => {
  it("will only return series matching given indices", () => {
    const matrix = [
      ["a", "b", "c"],
      ["a", "b", "c"],
    ];
    expect(frame.select(matrix, [2, 0])).toEqual([
      ["c", "a"],
      ["c", "a"],
    ]);
  });
});

describe("filter", () => {
  it("will remove all rows in frame where target column passes filter condition", () => {
    const matrix = [
      ["a", "b", 1],
      ["a", "b", 1],
      ["c", "d", 2],
      ["c", "d", 2],
      ["e", "f", 3],
      ["e", "f", 3],
    ];
    expect(frame.filter(matrix, 0, "=", "a")).toEqual([
      ["a", "b", 1],
      ["a", "b", 1],
    ]);
    expect(frame.filter(matrix, 1, "!=", "b")).toEqual([
      ["c", "d", 2],
      ["c", "d", 2],
      ["e", "f", 3],
      ["e", "f", 3],
    ]);
    expect(frame.filter(matrix, 2, "<", 3)).toEqual([
      ["a", "b", 1],
      ["a", "b", 1],
      ["c", "d", 2],
      ["c", "d", 2],
    ]);
    expect(frame.filter(matrix, 2, "<=", 2)).toEqual([
      ["a", "b", 1],
      ["a", "b", 1],
      ["c", "d", 2],
      ["c", "d", 2],
    ]);
    expect(frame.filter(matrix, 2, ">", 1)).toEqual([
      ["c", "d", 2],
      ["c", "d", 2],
      ["e", "f", 3],
      ["e", "f", 3],
    ]);
    expect(frame.filter(matrix, 2, ">=", 2)).toEqual([
      ["c", "d", 2],
      ["c", "d", 2],
      ["e", "f", 3],
      ["e", "f", 3],
    ]);
  });
  describe("given a datetime parser", () => {
    const matrix = [
      ["2020-01-01", 1],
      ["2020-01-02", 1],
      ["2020-01-03", 2],
      ["2020-01-04", 2],
    ];
    it("will correctly filter values as datetime objects", () => {
      expect(frame.filter(matrix, 0, "<", "2020-01-04", "datetime")).toEqual([
        ["2020-01-01", 1],
        ["2020-01-02", 1],
        ["2020-01-03", 2],
      ]);
    });
  });
});

describe("aggregate", () => {
  it("will reduce rows to the appropriate aggregation grain", () => {
    const matrix = [
      ["a", "b", 1],
      ["a", "b", 1],
      ["a", "d", 2],
      ["a", "d", 2],
      ["a", "f", 3],
      ["a", "f", 3],
    ];
    expect(frame.aggregate(matrix, 2, "avg", 0)).toEqual([["a", 2]]);
    expect(frame.aggregate(matrix, 2, "avg", 1)).toEqual([
      ["b", 1],
      ["d", 2],
      ["f", 3],
    ]);
    expect(frame.aggregate(matrix, 2, "count", 0)).toEqual([["a", 6]]);
    expect(frame.aggregate(matrix, 2, "count", 1)).toEqual([
      ["b", 2],
      ["d", 2],
      ["f", 2],
    ]);
    expect(frame.aggregate(matrix, 2, "sum", 0)).toEqual([["a", 12]]);
    expect(frame.aggregate(matrix, 2, "sum", 1)).toEqual([
      ["b", 2],
      ["d", 4],
      ["f", 6],
    ]);
  });
});

describe("sort", () => {
  it("will return the frame in sorted order by target value", () => {
    const matrix = [
      ["a", "b", 1],
      ["a", "b", 1],
      ["a", "d", 2],
      ["a", "d", 2],
      ["a", "f", 3],
      ["a", "f", 3],
    ];
    expect(frame.sort(matrix, 0, "asc")).toEqual([
      ["a", "b", 1],
      ["a", "b", 1],
      ["a", "d", 2],
      ["a", "d", 2],
      ["a", "f", 3],
      ["a", "f", 3],
    ]);
    expect(frame.sort(matrix, 0, "desc")).toEqual([
      ["a", "b", 1],
      ["a", "b", 1],
      ["a", "d", 2],
      ["a", "d", 2],
      ["a", "f", 3],
      ["a", "f", 3],
    ]);
    expect(frame.sort(matrix, 1, "asc")).toEqual([
      ["a", "b", 1],
      ["a", "b", 1],
      ["a", "d", 2],
      ["a", "d", 2],
      ["a", "f", 3],
      ["a", "f", 3],
    ]);
    expect(frame.sort(matrix, 1, "desc")).toEqual([
      ["a", "f", 3],
      ["a", "f", 3],
      ["a", "d", 2],
      ["a", "d", 2],
      ["a", "b", 1],
      ["a", "b", 1],
    ]);
    expect(frame.sort(matrix, 2, "asc")).toEqual([
      ["a", "b", 1],
      ["a", "b", 1],
      ["a", "d", 2],
      ["a", "d", 2],
      ["a", "f", 3],
      ["a", "f", 3],
    ]);
    expect(frame.sort(matrix, 2, "desc")).toEqual([
      ["a", "f", 3],
      ["a", "f", 3],
      ["a", "d", 2],
      ["a", "d", 2],
      ["a", "b", 1],
      ["a", "b", 1],
    ]);
  });
  describe("given a frame with datetime values", () => {
    const matrix = [
      ["2020-01-01", 1],
      ["2020-01-04", 2],
      ["2020-01-03", 2],
      ["2020-01-02", 1],
    ];
    it("will correctly sort the dates", () => {
      expect(frame.sort(matrix, 0, "asc", "datetime")).toEqual([
        ["2020-01-01", 1],
        ["2020-01-02", 1],
        ["2020-01-03", 2],
        ["2020-01-04", 2],
      ]);
    });
  });
});

describe("runTfPipeline", () => {
  describe("given a frame and transformation config", () => {
    const matrix = [
      ["2020-01-01", 1],
      ["2020-01-01", 2],
      ["2020-01-01", 3],
      ["2020-01-04", 2],
      ["2020-01-04", 2],
      ["2020-01-03", 2],
      ["2020-01-03", 2],
      ["2020-01-03", 2],
      ["2020-01-02", 1],
      ["2020-01-02", 1],
      ["2020-01-02", 1],
    ];
    const conf: TFConfig = {
      filter: [
        {
          index: 0,
          type: "<",
          value: "2020-01-04",
          parser: "datetime",
        },
      ],
      aggregate: [
        {
          index: 1,
          type: "sum",
          groupBy: 0,
        },
      ],
      sort: [
        {
          index: 0,
          order: "desc",
          parser: "datetime",
        },
      ],
    };
    it("will apply each transformation in the correct order", () => {
      expect(frame.runTfPipeline(matrix, conf)).toEqual([
        ["2020-01-03", 6],
        ["2020-01-02", 3],
        ["2020-01-01", 6],
      ]);
    });
  });
});
