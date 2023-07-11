import Chart from "./chart";
import { AutoChartFactory, ColumnOptions } from "./factory";
import type { ChartOptions, ChartType } from "./types";
import { LegacyOptions } from "./types/legacy";
import * as utils from "./utils";

export function create<T extends ChartType>(type: T): Chart<T> {
  return new Chart(type);
}

export function load<T extends ChartType>(opts: ChartOptions<T> | LegacyOptions<T>): Chart<T> {
  if ("chartType" in opts) {
    return Chart.load(opts);
  } else {
    return Chart.fromLegacy(opts); 
  }
}

export function* chartGenerator(columns: ColumnOptions[]) {
  let i = 0;
  const factory = new AutoChartFactory(columns);
  const charts = factory.generateAllCharts();
  while (true) {
    yield utils.array.unboundedReadItem(charts, i);
    i++;
  }
}
