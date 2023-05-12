import { describe, it, expect } from "vitest";
import chartlib, { ChartType } from "../../src";

describe("given a dataset with 1 categorical and 1 value column", () => {
  it("can create a pie chart", () => {
    const conf = {
      name: "My chart",
      type: ChartType.PIE,
      features: {},
      xAxis: [{ columns: [{ index: 0, type: null, color: null }] }],
      yAxis: [
        {
          columns: [
            {
              index: 1,
              type: ChartType.PIE,
              color: [
                "#f7fee7",
                "#ecfccb",
                "#d9f99d",
                "#bef264",
                "#a3e635",
                "#84cc16",
                "#65a30d",
                "#4d7c0f",
                "#3f6212",
                "#365314",
              ],
            },
          ],
        },
      ],
    };
    const dataset = {
      dimensions: ["cat", "val"],
      source: [
        ["cat1", 3],
        ["cat2", 4],
        ["cat3", 5],
      ],
    };
    const ecOption = chartlib.ecOptionFromDataset(conf, dataset);
    expect(ecOption).toEqual({
      title: {
        show: false,
        text: "My chart",
        left: "auto",
      },
      legend: {
        show: false,
        type: "scroll",
        left: "center",
      },
      grid: { show: false, containLabel: false, bottom: 50, left: 50 },
      xAxis: [],
      yAxis: [],
      tooltip: {
        show: true,
        trigger: "item",
        formatter: "<b>{b}</b><br/>{c} ({d}%)",
      },
      toolbox: {
        show: false,
      },
      dataset: {
        dimensions: ["cat", "val"],
        source: [
          ["cat1", 3],
          ["cat2", 4],
          ["cat3", 5],
        ],
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          color: [
            "#f7fee7",
            "#ecfccb",
            "#d9f99d",
            "#bef264",
            "#a3e635",
            "#84cc16",
            "#65a30d",
            "#4d7c0f",
            "#3f6212",
            "#365314",
          ],
          itemStyle: {
            borderColor: "#18181b",
            borderRadius: 10,
            borderWidth: 2,
          },
          textStyle: {
            color: "#71717a",
          },
          label: {
            show: true,
            color: "#71717a",
          },
          name: "val",
        },
      ],
      backgroundColor: "#18181b",
      animation: true,
    });
  });
});
