import { echarts } from "./types";
import { Option } from "./types/utility";

type Value = Option<number | string>;
type Series = Array<Value>;
type Matrix = Array<Series>;

export class DataFrame {
  data: Matrix;
  columns: Map<number, string>;
  shape: { height: number; width: number };
  constructor(rows: Array<{ [key: string]: Value }>) {
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

  col(ix: number) {
    return this.transposed()[ix];
  }

  sum(col: number, groupBy: number): DataFrame {
    const map = this.aggregateMap(col, groupBy);
    const result: Matrix = [];
    for (const [k, v] of map.entries()) {
      const sum = v.reduce((acc: number, curr: Value) => acc + Number(curr), 0);
      result.push([k, sum]);
    }
    return DataFrame.load(
      result,
      new Map<number, string>([
        [0, this.columns.get(groupBy) ?? ""],
        [1, this.columns.get(col) ?? ""],
      ])
    );
  }

  // TODO: avg
  // TODO: count
  // TODO: distinct
  // TODO: min
  // TODO: max
  // TODO: join

  private aggregateMap(col: number, groupBy: number): Map<Value, Series> {
    const map = new Map<Value, Series>();
    this.col(groupBy).forEach((v) => {
      if (!map.has(v)) {
        map.set(
          v,
          this.col(col).filter((_, i) => this.col(groupBy)[i] === v)
        );
      }
    });
    return map;
  }

  private transposed(): Matrix {
    if (this.isEmpty()) return this.data;
    return this.data[0].map((_, i) => this.data.map((row) => row[i]));
  }

  asDataset(): echarts.DataSet {
    return {
      dimensions: Array.from(this.columns.values()),
      source: this.data,
    };
  }
}
