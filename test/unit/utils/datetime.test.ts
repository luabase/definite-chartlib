import { describe, it, expect } from "vitest";
import { datetime } from "../../../src/utils";

describe("isStartOrEndOfYear", () => {
  it("returns true if date is the first or last day of the year", () => {
    expect(datetime.isStartOrEndOfYear("2020-01-01")).toEqual(true);
    expect(datetime.isStartOrEndOfYear("2020-12-31")).toEqual(true);
  });
});

describe("isStartOrEndOfQuarter", () => {
  it("returns true if date is the first or last day of the quarter", () => {
    expect(datetime.isStartOrEndOfQuarter("2020-01-01")).toEqual(true);
    expect(datetime.isStartOrEndOfQuarter("2020-03-31")).toEqual(true);
    expect(datetime.isStartOrEndOfQuarter("2020-04-01")).toEqual(true);
    expect(datetime.isStartOrEndOfQuarter("2020-06-30")).toEqual(true);
    expect(datetime.isStartOrEndOfQuarter("2020-07-01")).toEqual(true);
    expect(datetime.isStartOrEndOfQuarter("2020-09-30")).toEqual(true);
    expect(datetime.isStartOrEndOfQuarter("2020-10-01")).toEqual(true);
    expect(datetime.isStartOrEndOfQuarter("2020-12-31")).toEqual(true);
  });
});

describe("isStartOrEndOfMonth", () => {
  it("returns true if date is the first or last day of the month", () => {
    expect(datetime.isStartOrEndOfMonth("2020-01-01")).toEqual(true);
    expect(datetime.isStartOrEndOfMonth("2020-01-31")).toEqual(true);
    expect(datetime.isStartOrEndOfMonth("2020-06-01")).toEqual(true);
    expect(datetime.isStartOrEndOfMonth("2020-06-30")).toEqual(true);
  });
});

describe("strftime", () => {
  it("can convert date to string in desired format", () => {
    expect(datetime.strftime("2020-01-01", "y")).toEqual("2020");
    expect(datetime.strftime("2020-01-01", "y-m")).toEqual("2020-01");
    expect(datetime.strftime("2020-01-01", "y-m-d")).toEqual("2020-01-01");
    expect(datetime.strftime("2020-01-01", "yQq")).toEqual("2020Q1");
  });
});
