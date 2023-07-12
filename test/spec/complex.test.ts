import { describe, expect, it } from "vitest";
import chartlib from "../../src";
import data from "../fixtures";
import { color } from "../../src/constants";
import { DataFrame } from "../../src/dataframe";

describe("given a larger dataset with 2 dimensions (1 datetime, 1 category) and 1 metric", () => {
  it("should be able to compile to a line chart with 3 lines all having matching indices", () => {
    const chart = chartlib
      .create("line")
      .addDimension({ index: 0, dataType: "datetime" })
      .addDimension({ index: 1, dataType: "category" })
      .addMetric({ index: 2, color: color.LIME_200, aggregation: "sum" });
    const ecOption = chart.compile("My Chart", data["filteredCitiBike"]);
    const datasets = ecOption.dataset.slice(1);
    const indices = datasets.map((d) => DataFrame.transpose(d.source)[0]);
    expect(indices[0]).toEqual(indices[1]);
    expect(indices[1]).toEqual(indices[2]);
  });
});
