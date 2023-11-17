import { AggregationType, RowOriented, echarts } from "./types";
import { Option, Predicate } from "./types/utility";
import * as utils from "./utils";
import { profile } from "./perf";

type Value = Option<number | string>;
type Series = Array<Value>;
type Matrix = Array<Series>;

export class DataFrame {
  data: Matrix;
  columns: Map<number, string>;
  shape: { height: number; width: number };

  constructor(rows: RowOriented) {
    this.data = [];
    this.columns = new Map();
    rows.forEach((row, i) => {
      if (i === 0) {
        Object.keys(row).forEach((k, i) => {
          if (!this.columns.has(i)) {
            this.columns.set(i, k);
          }
        });
      }
      // normalize boolean values to string
      const values = Object.values(row).map((v) =>
        typeof v === "boolean" ? String(v) : v
      );
      this.data.push(values);
    });
    this.shape = {
      height: this.data.length,
      width: Object.keys(this.columns).length,
    };
  }

  static load(data: Matrix, columns: Map<number, string>) {
    const df = new DataFrame([]);
    df.data = data;
    df.columns = columns;
    df.shape = {
      height: data.length,
      width: Array.from(columns.keys()).length,
    };
    return df;
  }

  static transpose(data: Matrix): Matrix {
    if (data.length === 0) return data;
    return data[0].map((_, i) => data.map((row) => row[i]));
  }

  private transposed(): Matrix {
    if (this.shape.height === 0) return this.data;
    return DataFrame.transpose(this.data);
  }

  col(ix: number) {
    return this.transposed()[ix];
  }

  asDataSet(): echarts.DataSet {
    return {
      dimensions: Array.from(this.columns.values()),
      source: this.data,
    };
  }

  static fromDataSet(dataset: echarts.DataSet): DataFrame {
    return DataFrame.load(
      dataset.source,
      new Map<number, string>(dataset.dimensions.map((s, i) => [i, s]))
    );
  }

  @profile
  filter(col: number, where: Predicate<Value>): DataFrame {
    const filtered = this.data.filter((row) => where(row[col]));
    return DataFrame.load(filtered, this.columns);
  }

  private aggregateValue(
    prev: Value | undefined,
    next: Value,
    acc: number,
    aggregation: AggregationType
  ): number {
    switch (aggregation) {
      case "sum":
      case "avg":
        acc += Number(next);
        return acc;
      case "count":
        acc++;
        return acc;
      case "distinct":
        if (prev !== next) {
          acc++;
        }
        return acc;
      case "min":
        if (!prev) {
          acc = Number(next);
        } else {
          acc = Math.min(acc, Number(next));
        }
        return acc;
      case "max":
        if (!prev) {
          acc = Number(next);
        } else {
          acc = Math.max(acc, Number(next));
        }
        return acc;
      default:
        throw new Error(`Invalid aggregation ${aggregation}`);
    }
  }

  @profile
  groupBy(
    col: number,
    by: number,
    aggregation: Exclude<AggregationType, "none">
  ): DataFrame {
    const map = new Map<Value, { acc: number; seen: number }>();
    for (let i = 0; i < this.data.length; i++) {
      const k = this.data[i][by];
      const v = this.data[i][col];
      if (!map.has(k)) {
        const acc = this.aggregateValue(undefined, v, 0, aggregation);
        map.set(k, { acc, seen: 1 });
      } else {
        let { acc, seen } = map.get(k) || { acc: 0, seen: 0 };
        acc = this.aggregateValue(this.data[i - 1][col], v, acc, aggregation);
        seen++;
        map.set(k, { acc, seen });
      }
    }

    if (aggregation === "avg") {
      for (const [k, v] of map.entries()) {
        map.set(k, { acc: v.acc / v.seen, seen: v.seen });
      }
    }

    return DataFrame.load(
      Array.from(map.entries()).map(([k, v]) => [k, v.acc]),
      new Map<number, string>([
        [0, this.columns.get(by) ?? ""],
        [1, this.columns.get(col) ?? ""],
      ])
    );
  }

  @profile
  map(col: number, fn: (v: Value) => Value): DataFrame {
    const transposed = this.transposed();
    transposed[col] = transposed[col].map(fn);
    this.data = DataFrame.transpose(transposed); // back to row-oriented
    return DataFrame.load(this.data, this.columns);
  }

  @profile
  pivot(
    index: number,
    columns: number,
    values: number,
    aggregation: AggregationType
  ): DataFrame {
    const map = new Map<Value, Map<Value, { acc: number; seen: number }>>();
    for (let i = 0; i < this.data.length; i++) {
      const row = this.data[i];
      const k = row[index];
      const cat = row[columns];
      const val = row[values];
      if (!map.has(k)) {
        const innerMap = new Map<Value, { acc: number; seen: number }>();
        const acc = this.aggregateValue(undefined, val, 0, aggregation);
        innerMap.set(cat, { acc, seen: 1 });
        map.set(k, innerMap);
      } else {
        const innerMap = map.get(k)!;
        if (!innerMap.has(cat)) {
          const acc = this.aggregateValue(undefined, val, 0, aggregation);
          innerMap.set(cat, { acc, seen: 1 });
        } else {
          let { acc, seen } = innerMap.get(cat) || { acc: 0, seen: 0 };
          acc = this.aggregateValue(
            this.data[i - 1][values],
            val,
            acc,
            aggregation
          );
          seen++;
          innerMap.set(cat, { acc, seen });
        }
        map.set(k, innerMap);
      }
    }
    const data: Matrix = [];
    const cols = new Map<number, string>([[0, this.columns.get(index) ?? ""]]);
    utils.array
      .removeDuplicates(this.col(columns))
      .map(String)
      .forEach((v, i) => {
        cols.set(i + 1, v);
      });
    for (const [outerK, innerMap] of map.entries()) {
      const row = [outerK];
      for (let i = 0; i < cols.size - 1; i++) {
        row.push(null);
      }
      for (const [innerK, v] of innerMap.entries()) {
        const ix = utils.map.getKeyByValue(cols, innerK)!;
        let { acc, seen } = v;
        if (aggregation === "avg") {
          acc = acc / seen;
        }
        row[ix] = acc;
      }
      data.push(row);
    }
    return DataFrame.load(data, cols);
  }

  @profile
  select(cols: number[]): DataFrame {
    let data = this.transposed().filter((_, i) => cols.includes(i));
    data = DataFrame.transpose(data);
    const columns = new Map<number, string>();
    this.columns.forEach((v, k) => {
      if (cols.includes(k)) {
        columns.set(columns.size, v);
      }
    });
    return DataFrame.load(data, columns);
  }
}
