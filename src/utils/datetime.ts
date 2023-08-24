export function getQuarter(d: Date): number {
  const month = d.getUTCMonth() + 1;
  if (month <= 3) {
    return 1;
  } else if (month <= 6) {
    return 2;
  } else if (month <= 9) {
    return 3;
  } else {
    return 4;
  }
}

export function isStartOrEndOfYear(d: Date): boolean {
  return (
    (d.getUTCMonth() === 0 && d.getUTCDate() === 1) ||
    (d.getUTCMonth() === 11 && d.getUTCDate() === 31)
  );
}

export function isStartOrEndOfQuarter(d: Date): boolean {
  return (
    (d.getUTCMonth() + 1 === 1 && d.getUTCDate() === 1) || // Jan 1
    (d.getUTCMonth() + 1 === 3 && d.getUTCDate() === 31) || // Mar 31
    (d.getUTCMonth() + 1 === 4 && d.getUTCDate() === 1) || // Apr 1
    (d.getUTCMonth() + 1 === 6 && d.getUTCDate() === 30) || // Jun 30
    (d.getUTCMonth() + 1 === 7 && d.getUTCDate() === 1) || // Jul 1
    (d.getUTCMonth() + 1 === 9 && d.getUTCDate() === 30) || // Sep 30
    (d.getUTCMonth() + 1 === 10 && d.getUTCDate() === 1) || // Oct 1
    (d.getUTCMonth() + 1 === 12 && d.getUTCDate() === 31) // Dec 31
  );
}

export function isStartOrEndOfMonth(d: Date): boolean {
  return (
    ([1, 3, 5, 7, 8, 10, 12].includes(d.getUTCMonth() + 1) &&
      [1, 31].includes(d.getUTCDate())) ||
    ([4, 6, 9, 11].includes(d.getUTCMonth() + 1) &&
      [1, 30].includes(d.getUTCDate())) ||
    (d.getUTCMonth() + 1 === 2 && [1, 28, 29].includes(d.getUTCDate())) // FIXME: leap year
  );
}

export function strftime(d: Date, fmt: string): string {
  let str = "";
  fmt.split("").forEach((t) => {
    switch (t) {
      case "y":
        str += d.getUTCFullYear();
        break;
      case "q":
        str += getQuarter(d);
        break;
      case "m":
        str +=
          d.getUTCMonth() + 1 > 9
            ? d.getUTCMonth() + 1
            : `0${d.getUTCMonth() + 1}`;
        break;
      case "d":
        str += d.getUTCDate() > 9 ? d.getUTCDate() : `0${d.getUTCDate()}`;
        break;
      default:
        str += t;
        break;
    }
  });
  return str;
}
