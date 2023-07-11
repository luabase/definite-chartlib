import { describe, expect, it } from "vitest";
import chartlib from "../../src";
import { perfData } from "../fixtures";

describe("given a large dataset with 2 dimensions and 1 metric", () => {
  const data = perfData["citiBike"];
  const chart = chartlib
    .create("bar")
    .addDimension({ index: 0, dataType: "datetime" })
    .addDimension({ index: 1, dataType: "category" })
    .addMetric({ index: 2, color: "#ffffff", aggregation: "sum" });
  it("can compile in a reasonable amount of time", () => {
    const start = Date.now();
    chart.compile("My chart", data);
    const end = Date.now();
    expect(end - start).toBeLessThan(100); // 0.1s
  });
});
