import { Option } from "./types/utility";

export const categoryFormatter = (value: string | number): string =>
  String(value).length > 15
    ? String(value).slice(0, 11) + "..." + String(value).slice(-4)
    : String(value);
