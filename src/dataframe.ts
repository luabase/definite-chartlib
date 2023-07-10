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

  @profile
  groupBy(
    col: number,
    by: number,
    aggregation: Exclude<AggregationType, "none">
  ): DataFrame {
    const map = this.aggregateMap(col, by);
    const result: Matrix = [];
    for (const [k, v] of map.entries()) {
      switch (aggregation) {
        case "sum":
          result.push([k, utils.array.sum(v)]);
          break;
        case "avg":
          result.push([k, utils.array.sum(v) / v.length]);
          break;
        case "count":
          result.push([k, v.length]);
          break;
        case "distinct":
          result.push([k, utils.array.removeDuplicates(v).length]);
          break;
        case "min":
          result.push([k, Math.min(...v.map(Number))]);
          break;
        case "max":
          result.push([k, Math.max(...v.map(Number))]);
          break;
        default:
          throw new Error(`Invalid aggregation ${aggregation}`);
      }
    }
    return DataFrame.load(
      result,
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
