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
      this.data.push(Object.values(row));
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

  isEmpty(): boolean {
    return this.shape.height === 0;
  }

  private static transpose(data: Matrix): Matrix {
    if (data.length === 0) return data;
    return data[0].map((_, i) => data.map((row) => row[i]));
  }

  private transposed(): Matrix {
    if (this.isEmpty()) return this.data;
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

  @profile
  splitBy(col: number): DataFrame[] {
    return utils.array
      .removeDuplicates(this.col(col))
      .map((v) => this.filter(col, (w) => w === v));
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
          acc = Math.min(Number(prev), Number(next));
        }
        return acc;
      case "max":
        if (!prev) {
          acc = Number(next);
        } else {
          acc = Math.max(Number(prev), Number(next));
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
}
