import { Chart } from "../chart";
import { ChartType, Metric, echarts } from "../types";
import { DataFrame } from "../dataframe";
import {
  categoryFormatter,
  valueFormatter,
  percentFormatter,
  percentageCalculator,
  currencyFormatter,
  axisFormatter,
  tooltipFormatter,
  determineFormatter,
} from "../formatters";
import { DS_BORDER_COLORS, DS_TEXT_COLORS } from "../constants/color";
import * as utils from "../utils";
import { isValid, parseISO } from "date-fns";

const MAX_INTERVAL = 3;

function isDateValue(value: string) {
  return isValid(parseISO(value));
}

export function axis<T extends ChartType>(
  chart: Chart<T>,
  datasets: echarts.DataSet[],
  kind: "x" | "y",
  theme: string
): echarts.Axis[] {
  if (chart.getChartType() === "kpi") {
    return [];
  }
  const df = DataFrame.fromDataSet(datasets[0]);
  const isLarge = utils.datasets.containsLargeData(datasets);
  const axes: echarts.Axis[] = [];
  const isPercentageStyle = chart.getStyleValueStyle() === "percentage";
  if (isDimensionalAxis(chart, kind)) {
    const ix = chart.getChartType() === "heatmap" && kind === "y" ? 1 : 0;
    const name = df.columns.get(chart.getDimensions()[ix].index) ?? "";
    const firstValue = df.col(chart.getDimensions()[ix].index)[0];
    const isDate = typeof firstValue === "string" && isDateValue(firstValue);

    const totalPoints = df.shape.height;
    const chartWidth = 500;
    const labelWidth = 20; // Average label width
    const maxLabels = Math.floor(chartWidth / labelWidth);
    const interval = Math.ceil(totalPoints / maxLabels);

    const totals = datasets.reduce((acc, dataset) => {
      dataset.source.forEach((row: any, idx: number) => {
        acc[idx] = (acc[idx] || 0) + (row[ix] ?? 0);
      });
      return acc;
    }, [] as number[]);

    const item: echarts.Axis = {
      show: chart.isCartesian(),
      type: "category",
      name: utils.string.truncate(name, 42),
      nameGap: kind === "y" || isDate ? 45 : 30,
      nameTextStyle: {
        color:
          theme === "light"
            ? DS_TEXT_COLORS.light.secondary
            : DS_TEXT_COLORS.dark.secondary,
      },
      axisLabel: {
        color:
          theme === "light"
            ? DS_TEXT_COLORS.light.secondary
            : DS_TEXT_COLORS.dark.secondary,
        interval: isDate ? interval * 2 : interval,
        rotate: isLarge ? 30 : 0,
        formatter: (params, index) => {
          const value = Number(params);
          if (chart.getStyleValueStyle === "percentage" && totals[index]) {
            return percentageCalculator(value, totals[index]);
          }
          return axisFormatter(params);
        },
      },
      axisLine: {
        lineStyle: {
          color:
            theme === "light"
              ? DS_BORDER_COLORS.light.primary
              : DS_BORDER_COLORS.dark.primary,
        },
      },
      axisPointer: {
        label: {
          formatter: (params) => {
            return tooltipFormatter(params.value);
          },
        },
      },
    };
    axes.push(
      addCommonFeatures(
        chart.getChartType(),
        item,
        kind,
        theme,
        isPercentageStyle
      )
    );
  } else {
    const isPercentageStyle = chart.getStyleValueStyle() === "percentage";
    const map = getMapOfValueAxes(chart);
    const keys = Array.from(map.keys());
    keys
      .sort() // ensures order is "left", "right"
      .forEach((k) => {
        let metrics = <Metric<T>[]>map.get(k);
        if (chart.getChartType() === "scatter") {
          metrics = kind === "x" ? [metrics[0]] : [metrics[1]];
        }
        const name =
          metrics.length > 1 ? "" : df.columns.get(metrics[0].index) ?? "";
        const firstValue = df.col(metrics[0]?.index)?.[0] ?? null;
        const isDate =
          typeof firstValue === "string" && isDateValue(firstValue);

        const item: echarts.Axis = {
          show: chart.isCartesian(),
          type: "value",
          name: utils.string.truncate(name, 42),
          nameGap: kind === "x" ? (isDate ? 45 : 30) : 45,
          nameTextStyle: {
            color:
              theme === "light"
                ? DS_TEXT_COLORS.light.secondary
                : DS_TEXT_COLORS.dark.secondary,
          },
          axisLine: {
            color:
              theme === "light"
                ? DS_BORDER_COLORS.light.primary
                : DS_BORDER_COLORS.dark.primary,
          },
          axisLabel: {
            formatter: isPercentageStyle
              ? percentFormatter
              : determineFormatter(chart, k),
            color:
              theme === "light"
                ? DS_TEXT_COLORS.light.secondary
                : DS_TEXT_COLORS.dark.secondary,
          },
        };
        if (metrics[0].min !== undefined && String(metrics[0].min) !== "") {
          item.min = metrics[0].min;
        }
        if (metrics[0].max !== undefined && String(metrics[0].max) !== "") {
          item.max = metrics[0].max;
        }
        const formatter = determineFormatter(chart, "left");
        axes.push(
          addCommonFeatures(
            chart.getChartType(),
            item,
            kind,
            theme,
            formatter,
            isPercentageStyle
          )
        );
      });
  }
  return axes;
}

function isDimensionalAxis<T extends ChartType>(
  chart: Chart<T>,
  kind: "x" | "y"
) {
  let dim = kind === "x";
  if (chart.getChartType() === "heatmap") {
    dim = true;
  } else if (chart.getChartType() === "scatter") {
    dim = false;
  } else if (chart.getStyleOrientation() === "horizontal") {
    dim = !dim;
  }
  return dim;
}

function addCommonFeatures(
  chartType: ChartType,
  item: echarts.Axis,
  kind: "x" | "y",
  theme: string,
  formatter?: any,
  isPercentageStyle?: boolean
) {
  item.nameLocation = "center";
  item.nameTextStyle = {
    fontSize: 14,
    color:
      theme === "light"
        ? DS_TEXT_COLORS.light.secondary
        : DS_TEXT_COLORS.dark.secondary,
  };
  if (kind === "y" || chartType === "scatter") {
    item.splitLine = {
      lineStyle: {
        type: "dashed",
        color:
          theme === "light"
            ? DS_BORDER_COLORS.light.secondary
            : DS_BORDER_COLORS.dark.secondary,
      },
    };
    if (typeof formatter === "function") {
      item.axisPointer = {
        label: {
          formatter: (params) => {
            return isPercentageStyle
              ? percentFormatter(params.value)
              : formatter(params.value);
          },
        },
      };
    }
  }
  return item;
}

function getMapOfValueAxes<T extends ChartType>(chart: Chart<T>) {
  const map = new Map<"left" | "right", Metric<T>[]>();
  if (["bar", "line"].includes(chart.getChartType())) {
    return chart.getMetrics().reduce((acc, m: Metric<T>) => {
      const axis = (<Metric<"bar">>m).axis ?? "left";
      if (acc.has(axis)) {
        acc.get(axis)?.push(m);
      } else {
        acc.set(axis, [m]);
      }
      return acc;
    }, map);
  } else {
    map.set("left", chart.getMetrics());
  }
  return map;
}
