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
