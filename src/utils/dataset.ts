import * as frame from "./frame";
import { Frame, Series, BlockResults, echarts as ec } from "../types";

// TODO - group by category
export const fromBlockResult = (results: BlockResults): ec.DataSet => {
  const dimensions = results.schema.map((col) => col.name);
  // NOTE: row keys can be out of order from schema
  const source: Frame = [];
  results.rows.forEach((r, i) => {
    const row: Series = [];
    Object.entries(r).map(([k, v]) => (row[dimensions.indexOf(k)] = v));
    source[i] = row;
  });
  return { dimensions: dimensions, source: frame.formatValues(source) };
};
