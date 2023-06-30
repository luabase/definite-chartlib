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
});
