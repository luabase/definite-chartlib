import { echarts } from "../types";

export function containsLargeData(datasets: echarts.DataSet[]): boolean {
  return datasets[datasets.length - 1].source.length > 10;
}
