import { Option } from "./types/utility";

export class DataFrame {
  data: Array<Array<Option<number | string>>>;
  columns: Map<number, string>;
  shape: { height: number; width: number };
  constructor(rows: Array<{ [key: string]: Option<number | string> }>) {
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
}
