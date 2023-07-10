import { describe, expect, it } from "vitest";

import { array } from "../../../src/utils";

describe("given an array of numbers", () => {
  it("can return all subsets of the array", () => {
    // create tests for array.allCombinations
    const arr = [1, 2, 3, 4];
    expect(array.getAllSubsets(arr)).toEqual([
      [1],
      [2],
      [3],
      [4],
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 4],
      [2, 4],
      [3, 4],
      [1, 2, 3],
      [1, 2, 4],
      [1, 3, 4],
      [2, 3, 4],
      [1, 2, 3, 4],
    ]);
    expect(array.getAllSubsets(arr, 2)).toEqual([
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 4],
      [2, 4],
      [3, 4],
      [1, 2, 3],
      [1, 2, 4],
      [1, 3, 4],
      [2, 3, 4],
      [1, 2, 3, 4],
    ]);
    expect(array.getAllSubsets(arr, 3)).toEqual([
      [1, 2, 3],
      [1, 2, 4],
      [1, 3, 4],
      [2, 3, 4],
      [1, 2, 3, 4],
    ]);
    expect(array.getAllSubsets(arr, 4)).toEqual([[1, 2, 3, 4]]);
  });
});
