import {
  AggregateType,
  FilterType,
  Series,
  SortOrder,
  TFConfig,
  Value,
} from "../types";
import { Frame } from "../types";
import * as datetime from "./datetime";

export const transpose = (frame: Frame): Frame => {
  if (frame.length === 0) return frame;
  return frame[0].map((_, i) => frame.map((row) => row[i]));
};

export const formatValues = (frame: Frame): Frame => {
  const transposed = transpose(frame); // to column-oriented
  const transformed: Frame = [];
  transposed.forEach((column, i) => {
    if (column.every((v) => datetime.isStartOrEndOfYear(v))) {
      transformed[i] = column.map((v) => datetime.strftime(v, "y"));
    } else if (column.every(datetime.isStartOrEndOfQuarter)) {
      transformed[i] = column.map((v) => datetime.strftime(v, "yQq"));
    } else if (column.every(datetime.isStartOrEndOfMonth)) {
      transformed[i] = column.map((v) => datetime.strftime(v, "y-m"));
    } else if (column.every((v) => !isNaN(Number(v)))) {
      transformed[i] = column.map((v) => Number(v));
    } else {
      transformed[i] = column;
    }
  });
  return transpose(transformed); // back to row-oriented
};

export const filter = (
  frame: Frame,
  col: number,
  type: FilterType,
  value: Value,
  parser?: "datetime"
): Frame => {
  const transposed = transpose(frame); // to column-oriented
  const keep: number[] = [];
  const filtered: Frame = [];
  const series = transposed[col];
  const convert = !parser
    ? (v: Value) => Number(v)
    : (v: Value) => Date.parse(String(v));
  series.forEach((v, i) => {
    switch (type) {
      case "<":
        if (convert(v) < convert(value)) {
          keep.push(i);
        }
        break;
      case "<=":
        if (convert(v) <= convert(value)) {
          keep.push(i);
        }
        break;
      case ">":
        if (convert(v) > convert(value)) {
          keep.push(i);
        }
        break;
      case ">=":
        if (convert(v) >= convert(value)) {
          keep.push(i);
        }
        break;
      case "=":
        if (v === value) {
          keep.push(i);
        }
        break;
      case "!=":
        if (v !== value) {
          keep.push(i);
        }
        break;
    }
  });
  frame.forEach((s, i) => {
    if (keep.includes(i)) {
      filtered.push(s);
    }
  });
  return filtered;
};

export const aggregate = (
  frame: Frame,
  col: number,
  type: AggregateType,
  groupBy: number
): Frame => {
  const selected = select(frame, [groupBy, col]);
  groupBy = 0;
  col = 1;
  const transposed = transpose(selected); // to column-oriented
  const map = new Map<Value, Series>();
  transposed[groupBy].forEach((v) => {
    if (!map.has(v)) {
      map.set(
        v,
        transposed[col].filter((_, j) => transposed[groupBy][j] === v)
      );
    }
  });
  const aggregated: Frame = [];
  for (const key of map.keys()) {
    const values = map.get(key);
    switch (type) {
      case "avg": {
        const avg = values?.reduce((acc: number, curr: Value) => {
          curr = Number(curr);
          return acc + curr;
        }, 0);
        if (avg) {
          aggregated.push([key, avg / (values?.length ?? 1)]);
        }
        break;
      }
      case "count": {
        aggregated.push([key, values?.length ?? 0]);
        break;
      }
      case "sum": {
        const sum = values?.reduce((acc: number, curr: Value) => {
          curr = Number(curr);
          return acc + curr;
        }, 0);
        if (sum) {
          aggregated.push([key, sum]);
        }
        break;
      }
    }
  }
  return aggregated;
};

export const select = (frame: Frame, cols: number[]): Frame => {
  const transposed = transpose(frame); // to column-oriented
  const selected: Frame = [];
  cols.forEach((i) => selected.push(transposed[i]));
  return transpose(selected); // back to row-oriented
};

export const sort = (
  frame: Frame,
  col: number,
  order: SortOrder,
  parser?: "datetime"
): Frame => {
  const transposed = transpose(frame); // to column-oriented
  if (parser) {
    // currently only expects `datetime`
    transposed[col] = transposed[col].map((v) => Date.parse(String(v)));
  }
  let values = [...transposed[col]]; // copy of
  values = values.sort();
  if (order === "desc") {
    values = values.reverse();
  }
  const sorted: Frame = [];
  values.forEach((v) => {
    const ix = transposed[col].indexOf(v);
    sorted.push(frame[ix]);
    delete transposed[col][ix];
  });
  return sorted;
};

export const runTfPipeline = (frame: Frame, conf: TFConfig): Frame => {
  // execution order => filter, aggregate, sort
  (conf.filter ?? []).forEach((fil) => {
    frame = filter(frame, fil.index, fil.type, fil.value, fil.parser);
  });
  (conf.aggregate ?? []).forEach((agg) => {
    frame = aggregate(frame, agg.index, agg.type, agg.groupBy);
  });
  (conf.sort ?? []).forEach((s) => {
    frame = sort(frame, s.index, s.order, s.parser);
  });
  return frame;
};
