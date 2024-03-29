import { Chart } from "../chart";
import { ChartType, Metric, echarts } from "../types";
import { color } from "../constants";
import * as utils from "../utils";
import { DataFrame } from "../dataframe";
import * as formatters from "../formatters";
import { stateAbbreviations } from "../constants";
import { findCountryOrStateIndices, findNumberIndex } from "./helpers";
import country from "country-list-js";
import { format, isValid, parseISO, getYear } from "date-fns";
import { categoryFormatter } from "../formatters";

// NOTE: dataset ID will be of this format:
// <metric index>::<chart type>::<dataset index>::<dataset name>::<metric id>

const funnelFormatter = (value: string) => {
  // First, define a function that tries to parse a string to a date and checks if it's valid
  function isValidDate(dateString: string) {
    const date = parseISO(dateString);
    return isValid(date);
  }

  // Check if the value can represent a valid date
  if (typeof value === "string" && isValidDate(value) && value.length > 6) {
    // It's a valid date string; format it
    const date = parseISO(value);
    return format(date, "yyyy-MM-dd"); // Customize as needed
  } else {
    // Not a valid date string; use categoryFormatter
    return categoryFormatter(value);
  }
};

export function series<T extends ChartType>(
  chart: Chart<T>,
  datasets: echarts.DataSet[],
  theme: string
): echarts.Series[] {
  const series: echarts.Series[] = [];
  const colors: string[] = [];
  if (chart.getChartType() === "kpi") {
    const metric = chart.getMetrics()[0];
    const format = metric.format ?? "number";
    let formatter = chart.getStyleShowLongNumber()
      ? formatters.longFormValueFormatter
      : formatters.valueFormatter;
    if (format === "percent") {
      formatter = formatters.percentFormatter;
    } else if (format === "currency") {
      formatter = chart.getStyleShowLongNumber()
        ? formatters.longFormCurrencyFormatter
        : formatters.currencyFormatter;
    }
    series.push({
      datasetIndex: 1,
      type: "gauge",
      radius: "0%",
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        show: false,
      },
      title: {
        show: false,
      },
      detail: {
        show: true,
        fontSize: 42,
        formatter,
      },
    });
    return series;
  }
  datasets.slice(1).forEach((dataset) => {
    if (!dataset.id) {
      throw new Error("Dataset for series must include ID");
    }
    let [mix, t, dix, name, mid] = dataset.id.split("::");
    const metric = chart.getMetric(
      (m) =>
        m.index === Number(mix) &&
        (m.chartType ?? chart.getChartType()) === t &&
        m.id === Number(mid)
    );
    if (!metric) throw new Error("Metric not found");
    const colorId = `${mid}-${metric.color}`;
    const c = colors.includes(colorId)
      ? utils.array.unboundedReadItem(color.COLOR_PALETTE, Number(dix) - 1)
      : metric.color;
    colors.push(colorId);
    t = t === "calendar" ? "heatmap" : t;
    const item: echarts.Series = {
      type: t,
      color: c,
      datasetIndex: Number(dix),
      name: name,
    };
    if (chart.getChartType() === "funnel") {
      item.label = {
        color: theme === "light" ? color.ZINC_900 : color.ZINC_100,
        show: true,
        position: "inside",
        backgroundColor: theme === "light" ? color.ZINC_100 : color.ZINC_900,
        padding: [1, 2],
        borderRadius: 2,
        formatter: (params) => funnelFormatter(params.name),
      };
      item.itemStyle = {
        borderWidth: 0,
      };
    } else if (chart.getStyleOrientation() === "horizontal") {
      item.xAxisIndex = 0;
      item.encode = { x: dataset.dimensions[1], y: dataset.dimensions[0] };
    } else if (chart.getChartType() === "pie") {
      item.encode = {
        itemName: dataset.dimensions[0],
        value: dataset.dimensions[1],
      };
      item.itemStyle = {
        borderColor: theme === "light" ? color.ZINC_100 : color.ZINC_900,
        borderRadius: 10,
        borderWidth: 2,
      };
      item.label = {
        color: theme === "light" ? color.ZINC_100 : color.ZINC_900,
        show: true,
      };
      item.yAxisIndex = 0;
      item.textStyle = {
        color: theme === "light" ? color.ZINC_100 : color.ZINC_900,
      };
      item.radius = ["40%", "70%"];
    } else if (chart.getChartType() === "scatter") {
      const metrics = chart.getMetrics();
      if (metrics.length === 2) {
        item.symbolSize = 15;
      } else if (metrics.length === 3) {
        item.symbolSize = (value: Array<number | string>) => {
          const number = Number(value[metrics[2].index]);
          const exponent = Math.floor(Math.log10(number)) + 1;
          return number / 10 ** (exponent - 2);
        };
      }
      item.encode = {
        x: dataset.dimensions[metrics[0].index],
        y: dataset.dimensions[metrics[1].index],
        tooltip: [
          dataset.dimensions[chart.getGroupByDimension()?.index ?? 0],
          dataset.dimensions[metrics[0].index],
          dataset.dimensions[metrics[1].index],
        ],
      };
    } else if (chart.getChartType() === "calendar") {
      const df = DataFrame.fromDataSet(dataset);
      Array.from(
        new Set(
          df
            .col(0)
            .map((v) => new Date(String(v)))
            .map((d) => d.getUTCFullYear())
            .sort()
        )
      ).forEach((_, i) => {
        series.push({
          type: "heatmap",
          coordinateSystem: "calendar",
          name: name,
          datasetIndex: 1,
          calendarIndex: i,
        });
      });
      return;
    } else if (chart.getChartType() === "heatmap") {
      delete item.color;
      const [dim1, dim2] = chart.getDimensions();
      item.datasetIndex = 1;
      item.encode = {
        x: dataset.dimensions[dim1.index],
        y: dataset.dimensions[dim2.index],
        value: dataset.dimensions[metric.index],
      };
      item.name = dataset.dimensions[metric.index];
    } else if (chart.getChartType() === "map") {
      item.roam = false;
      item.type = "map";
      item.label = { show: false };
      item.itemStyle = {
        // Color of the point.
        color: "rgba(0,0,0,0)",
      };
      const { stateIndex, countryIndex } = findCountryOrStateIndices(
        dataset.dimensions
      );

      const isCountries = countryIndex > -1;
      const isStates = stateIndex > -1;

      item.map = isCountries ? "Countries" : "USA";

      const { numberIndex } = findNumberIndex(dataset.source);
      item.name = dataset.dimensions[numberIndex];

      const data = [];

      dataset.source.forEach((sourceItem) => {
        const region =
          (isCountries ? sourceItem[countryIndex] : sourceItem[stateIndex]) ||
          "";

        let regionFullName = "";

        if (isCountries) {
          regionFullName =
            region.length === 2
              ? country.findByIso2(region)?.name || ""
              : region;
        } else if (isStates) {
          regionFullName =
            region.length === 2
              ? stateAbbreviations?.[sourceItem?.[stateIndex]] || ""
              : sourceItem[stateIndex];
        }

        data.push({
          name: regionFullName,
          value: sourceItem[numberIndex],
        });
      });
      item.data = data;
    } else {
      item.yAxisIndex = 0;
      item.encode = { x: dataset.dimensions[0], y: dataset.dimensions[1] };
    }
    if (
      chart.getStyleBarStyle() === "stacked" ||
      chart.getStyleLineStyle() === "area"
    ) {
      item.stack = "total";
      if (chart.getChartType() === "line") {
        item.areaStyle = {};
      }
      if (chart.getChartType() === "bar" && t === "line") {
        item.stack = "";
      }
    }
    if (["bar", "line"].includes(chart.getChartType())) {
      item.yAxisIndex =
        (metric as Metric<"bar" | "line">).axis === "right" ? 1 : 0;
    }
    if (chart.getChartType() === "funnel") {
      // Funnel chart type
    }
    series.push(item);
  });

  return series;
}
