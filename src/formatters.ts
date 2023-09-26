export function categoryFormatter(value: string | number): string {
  return String(value).length > 13
    ? String(value).slice(0, 8) + "..." + String(value).slice(-2)
    : String(value);
}

export function valueFormatter(value: string | number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value));
}

export function percentFormatter(value: string | number): string {
  return Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(Number(value));
}

export function currencyFormatter(value: string | number): string {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export function calendarTooltipFormatter(params: any): string {
  return `
      <style>
        .value::before {
          content: "";
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: ${params.color};
          margin-right: 5px;
        }
      </style>
      <h4>${params.data[0]}</h4>
      <p>
        <span class='value'>${params.data[1]}<span>
      </p>`;
}
