import { Option } from "../utility";

export default interface DataSet {
  dimensions: string[];
  source: Array<Array<Option<number | string>>>;
}
