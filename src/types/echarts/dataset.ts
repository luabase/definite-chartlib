import { Frame, Value } from "../alias";

interface BaseConfig {
  dimension: number;
}

interface SortConfig extends BaseConfig {
  order: "asc" | "desc";
  parser?: "time";
}

interface ConditionalConfig extends BaseConfig {
  lt?: Value;
  lte?: Value;
  gt?: Value;
  gte?: Value;
  eq?: Value;
  ne?: Value;
}

interface FilterConfig extends BaseConfig {
  and: ConditionalConfig[];
}

export interface Transform {
  type: "filter" | "sort";
  config: SortConfig[] | FilterConfig;
}

export type TransformDataSet = Transform[];

export default interface DataSet {
  dimensions: string[];
  source: Frame;
}
