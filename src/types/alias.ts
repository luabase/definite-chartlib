export type Value = number | string | null;
export type Series = Value[];
export type Frame = Series[];

export type FilterType = "<" | "<=" | ">" | ">=" | "=" | "!=";
export type AggregateType = "avg" | "count" | "sum";
export type SortOrder = "asc" | "desc";
