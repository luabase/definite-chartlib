import { describe, expect, it } from "vitest";
import * as datetime from "../../../src/utils/datetime";

describe("given an array of dates", () => {
  const dates = [
    "2020-01-01",
    "2020-01-02",
    "2020-04-01",
    "2020-07-01",
    "2020-10-01",
    "2021-01-01",
    "2021-04-01",
    "2021-07-01",
    "2021-10-01",
  ].map((d) => new Date(String(d)));
  it("should return true if the date is the start or end of a year", () => {
    expect(dates.map(datetime.isStartOrEndOfYear)).toEqual([
      true,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
    ]);
  });
  it("should return true if the date is the start or end of a quarter", () => {
    expect(dates.map(datetime.isStartOrEndOfQuarter)).toEqual([
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ]);
  });
  it("should return true if the date is the start or end of a month", () => {
    expect(dates.map(datetime.isStartOrEndOfMonth)).toEqual([
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ]);
  });
});

describe("given a date and a format string", () => {
  const date = new Date("2020-01-01");
  it("should return a string", () => {
    expect(datetime.strftime(date, "y")).toEqual("2020");
    expect(datetime.strftime(date, "yQq")).toEqual("2020Q1");
    expect(datetime.strftime(date, "y-m-d")).toEqual("2020-01-01");
    expect(datetime.strftime(date, "y/m/d")).toEqual("2020/01/01");
  });
});

describe("given a date", () => {
  it("should return the quarter number", () => {
    expect(datetime.getQuarter(new Date("2020-01-01"))).toEqual(1);
    expect(datetime.getQuarter(new Date("2020-04-01"))).toEqual(2);
    expect(datetime.getQuarter(new Date("2020-07-01"))).toEqual(3);
    expect(datetime.getQuarter(new Date("2020-10-01"))).toEqual(4);
  });
});

describe("given a month-like dates", () => {
  it("should format the date as a month", () => {
    expect(datetime.strftime(new Date("2023-04-01 00:00:00"), "y-m")).toEqual(
      "2023-04"
    );
    expect(datetime.strftime(new Date("2023-05-01 00:00:00"), "y-m")).toEqual(
      "2023-05"
    );
  });
});
