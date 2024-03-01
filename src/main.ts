import { Chart } from "./chart";
import { AutoChartFactory, ColumnOptions } from "./factory";
import type { ChartOptions, ChartType } from "./types";
import { LegacyOptions } from "./types/legacy";
import * as utils from "./utils";

function create<T extends ChartType>(type: T) {
  return new Chart(type);
}

function load<T extends ChartType>(opts: ChartOptions<T> | LegacyOptions<T>) {
  return "chartType" in opts ? Chart.load(opts) : Chart.fromLegacy(opts);
}

function* chartGenerator(
  columns: Array<ColumnOptions>,
  subsets: boolean,
  theme: string
) {
  let i = 0;
  const factory = new AutoChartFactory(columns, subsets);
  const charts = factory.generateAllCharts();
  while (true) {
    yield utils.array.unboundedReadItem(charts, i);
    i++;
  }
}

export { create, load, chartGenerator };
