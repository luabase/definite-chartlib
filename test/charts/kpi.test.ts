import { describe, expect, it } from "vitest";

import chartlib from "../../src";
import { currencyFormatter } from "../../src/formatters";
import { color } from "../../src/constants";

describe("given 1 metric and no dimensions", () => {
  const chart = chartlib
    .create("kpi")
    .addMetric({
      index: 0,
      color: color.LIME_200,
      aggregation: "none",
      format: "currency"
    });
  it("can compile to a KPI chart", () => {
    expect(chart.compile("MRR", [{ mrr: 50000 }])).toEqual({
      animation: true,
      backgroundColor: "#18181b",
      calendar: null,
      dataset: [
        {
          dimensions: ["mrr"],
          source: [
            [50000]
          ]
        }
      ],
      grid: {
        bottom: "12%",
        containLabel: false,
        left: "12%",
        right: "9%",
        top: "10%",
        show: false,
      },
      legend: {
        left: "center",
        show: false,
        top: "8%",
        type: "scroll"
      },
      series: [{
        type: "gauge",
        datasetIndex: 0,
        radius: "0%",
        splitLine: {
          show: false
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false
        },
        pointer: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          show: true,
          fontSize: 42,
          formatter: currencyFormatter
        }
      }],
      title: {
        left: "left",
        show: true,
        text: "MRR",
        top: "2%",
      },
      toolbox: {
        feature: {
          dataView: {
            readOnly: true,
            show: true,
          },
          saveAsImage: {
            show: true,
            type: "png"
          }
        },
        show: false
      },
      tooltip: {
        backgroundColor: "rgb(24 24 27)",
        borderColor: "rgb(212 212 216)",
        confine: true,
        show: true,
        textStyle: {
          color: "rgb(212 212 216)",
        },
        trigger: "item"
      },
      visualMap: null,
      xAxis: [],
      yAxis: []
    })
  })
})
