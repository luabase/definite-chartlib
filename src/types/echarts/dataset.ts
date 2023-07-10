import { Option } from "../utility";

export default interface DataSet {
  /** Composite ID ({{ METRIC INDEX }}::{{ CHART TYPE }}::{{ DATASET INDEX }}::{{ NAME }}) */
  id?: string;
  dimensions: string[];
  source: Array<Array<Option<number | string>>>;
}
