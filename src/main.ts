import { Chart } from "./manager";
import type { ChartType } from "./types/literals";
import type { ChartOptions, echarts } from "./types";
import { DataFrame } from "./dataframe";
import type { Option } from "./types/utility";
import { color } from "./constants";
import * as determine from "./determine";

export function create<T extends ChartType>(type: T): Chart<T> {
  return new Chart(type);
}

export function load<T extends ChartType>(opts: ChartOptions<T>): Chart<T> {
  return Chart.load(opts);
}

export function compile<T extends ChartType>(
  title: string,
  chart: Chart<T>,
  data: Array<{ [key: string]: Option<number | string> }>
): echarts.ECOption {
  chart.assertIsValid();
  const df = new DataFrame(data);
  return {
    animation: true,
    backgroundColor: color.ZINC_900,
    calendar: determine.calendar(chart, df),
    dataset: [{ dimensions: [], source: [] }], // TODO
    grid: determine.grid(chart, df),
    legend: determine.legend(chart),
    series: [], // TODO
    title: determine.title(chart, title),
    toolbox: determine.toolbox(chart),
    tooltip: determine.tooltip(chart),
    visualMap: determine.visualMap(chart, df),
    xAxis: determine.axis(chart, df, "x"),
    yAxis: determine.axis(chart, df, "y"),
  };
}
