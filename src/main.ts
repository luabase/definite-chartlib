import { Chart } from "./manager";
import type { ChartOptions, ChartType } from "./types";

export function create<T extends ChartType>(type: T): Chart<T> {
  return new Chart(type);
}

export function load<T extends ChartType>(opts: ChartOptions<T>): Chart<T> {
  return Chart.load(opts);
}
