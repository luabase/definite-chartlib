export function categoryFormatter(value: string | number): string {
  return String(value).length > 15
    ? String(value).slice(0, 11) + "..." + String(value).slice(-4)
    : String(value);
}

// TODO - datetime formatter

export function valueFormatter(value: string | number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value));
}
