import { describe, expect, it } from "vitest";
import { determine } from "../../src";
import { ChartOptions } from "../../src/types";
import { DataFrame } from "../../src/dataframe";
import { categoryFormatter } from "../../src/formatters";

describe("determine.xAxis", () => {
  describe("given a bar chart type", () => {
    const opts: ChartOptions<"bar"> = {
      chartType: "bar",
      style: {
        showTitle: true,
        showToolbox: false,
        showLegend: true,
        barStyle: "grouped",
        orientation: "vertical",
      },
      dimensions: [{ index: 0, dataType: "category" }],
      metrics: [],
    };
    const df = new DataFrame([
      { type: "blue", value: 30 },
      { type: "yellow", value: 30 },
      { type: "red", value: 30 },
    ]);
    describe("given a vertical orientation", () => {
      opts.style.orientation = "vertical";
      it("can determine xAxis", () => {
        expect(determine.xAxis(opts, df)).toEqual([
          {
            type: "category",
            show: true,
            name: "type",
            nameLocation: "center",
            nameGap: 30,
            nameTextStyle: {
              fontSize: 14,
            },
            axisLabel: {
              interval: 0,
              rotate: 0,
              formatter: categoryFormatter,
            },
          },
        ]);
      });
    });
  });
});
