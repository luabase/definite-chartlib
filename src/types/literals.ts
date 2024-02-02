export type ChartType =
  | "line"
  | "bar"
  | "calendar"
  | "heatmap"
  | "pie"
  | "scatter"
  | "kpi"
  | "map";

export type DataType = "category" | "datetime" | "value";

export type AggregationType =
  | "avg"
  | "count"
  | "distinct"
  | "sum"
  | "min"
  | "max"
  | "none";

export type AxisType = "left" | "right";

export type OrientationType = "vertical" | "horizontal";

export type BarStyleType = "grouped" | "stacked";

export type LineStyleType = "point" | "area";

export type ColorGroupingType = "continuous" | "piecewise";
