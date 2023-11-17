import { Option } from "./utility";

export type RowOriented = Array<{
  [key: string]: Option<number | string | boolean>;
}>;
