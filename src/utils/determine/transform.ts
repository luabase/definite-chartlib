import * as ec from "../../types/echarts";
import { ChartConfig } from "../../types";
import { error } from "../../constants";

export const transform = (conf: ChartConfig): ec.TransformDataSet => {
  if (!conf.transforms) {
    throw error.TRANSFORMS_NOT_FOUND;
  }
  const transform: ec.TransformDataSet = [];
  if (conf.transforms.sorts) {
    transform.push({
      type: "sort",
      config: conf.transforms.sorts.map((s) => {
        return s.parser
          ? { dimension: s.index, order: s.order, parser: s.parser }
          : { dimension: s.index, order: s.order };
      }),
    });
  }
  if (conf.transforms.filters) {
    transform.push({
      type: "filter",
      config: {
        and: conf.transforms.filters.map((f) => {
          switch (f.type) {
            case "=":
              return { dimension: f.index, eq: f.value };
            case "!=":
              return { dimension: f.index, ne: f.value };
            case ">":
              return { dimension: f.index, gt: f.value };
            case ">=":
              return { dimension: f.index, gte: f.value };
            case "<":
              return { dimension: f.index, lt: f.value };
            case "<=":
              return { dimension: f.index, lte: f.value };
          }
        }),
      },
    });
  }
  return transform;
};
