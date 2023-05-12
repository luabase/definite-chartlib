import { Value } from "./alias";

export interface LegacyAdditionalSeries {
  type?: string;
  color?: string;
  column?: string;
}

export interface BlockDetails {
  name: string;
  type?: string;
  xAxis?: string;
  yAxis?: string;
  chartType?: string;
  series?: LegacyAdditionalSeries[];
}

export interface BlockResults {
  rows: Record<string, Value>[];
  schema: { name: string; type: string }[];
}
