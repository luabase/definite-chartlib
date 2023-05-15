import { Value } from "../types";

const isDate = (v: unknown): boolean => {
  if (v instanceof Date) return true;
  if (typeof v === "number") {
    // only accept years
    if (v >= 1970 && v <= 9999) {
      return true;
    }
  }
  if (typeof v === "string") {
    if (!isNaN(Date.parse(v)) && v.length >= 4 && v.length <= 10) {
      return true;
    }
  }
  return false;
};

const getQuarter = (d: Date): 1 | 2 | 3 | 4 => {
  if (d.getUTCMonth() + 1 < 4) return 1;
  if (d.getUTCMonth() + 1 < 7) return 2;
  if (d.getUTCMonth() + 1 < 10) return 3;
  return 4;
};

export const toDateUTC = (v: Value | Date): Date => {
  const date = v instanceof Date ? v : new Date(Date.parse(String(v)));
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  );
};

export const isStartOrEndOfYear = (v: Value): boolean => {
  if (!isDate(v)) return false;
  const date = toDateUTC(v);
  if (
    (date.getUTCMonth() === 0 && date.getUTCDate() === 1) ||
    (date.getUTCMonth() === 11 && date.getUTCDate() === 31)
  ) {
    return true;
  }
  return false;
};

export const isStartOrEndOfQuarter = (v: Value): boolean => {
  if (!isDate(v)) return false;
  const date = toDateUTC(v);
  if (
    (date.getUTCMonth() + 1 === 1 && date.getUTCDate() === 1) || // Jan 1
    (date.getUTCMonth() + 1 === 3 && date.getUTCDate() === 31) || // Mar 31
    (date.getUTCMonth() + 1 === 4 && date.getUTCDate() === 1) || // Apr 1
    (date.getUTCMonth() + 1 === 6 && date.getUTCDate() === 30) || // Jun 30
    (date.getUTCMonth() + 1 === 7 && date.getUTCDate() === 1) || // Jul 1
    (date.getUTCMonth() + 1 === 9 && date.getUTCDate() === 30) || // Sep 30
    (date.getUTCMonth() + 1 === 10 && date.getUTCDate() === 1) || // Oct 1
    (date.getUTCMonth() + 1 === 12 && date.getUTCDate() === 31) // Dec 31
  ) {
    return true;
  }
  return false;
};

export const isStartOrEndOfMonth = (v: Value): boolean => {
  if (!isDate(v)) return false;
  const date = toDateUTC(v);
  if (
    ([1, 3, 5, 7, 8, 10, 12].includes(date.getUTCMonth() + 1) &&
      [1, 31].includes(date.getUTCDate())) ||
    ([4, 6, 9, 11].includes(date.getUTCMonth() + 1) &&
      [1, 30].includes(date.getUTCDate())) ||
    (date.getUTCMonth() + 1 === 2 && [1, 28, 29].includes(date.getUTCDate())) // this is buggy
  ) {
    return true;
  }
  return false;
};

export const strftime = (v: Value | Date, fmt: string): string => {
  const date = toDateUTC(v);
  const tokens = fmt.split("");
  let str = "";
  tokens.forEach((t) => {
    switch (t) {
      case "y":
        str += String(date.getUTCFullYear());
        break;
      case "q":
        str += String(getQuarter(date));
        break;
      case "m":
        if (date.getUTCMonth() + 1 > 9) {
          str += String(date.getUTCMonth() + 1);
        } else {
          str += `0${String(date.getUTCMonth() + 1)}`;
        }
        break;
      case "d":
        if (date.getUTCDate() > 9) {
          str += String(date.getUTCDate());
        } else {
          str += `0${String(date.getUTCDate())}`;
        }
        break;
      default:
        str += t;
        break;
    }
  });
  return str;
};
