import { describe, it, expect } from "vitest";
import { frame } from "../../../src/utils";

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
