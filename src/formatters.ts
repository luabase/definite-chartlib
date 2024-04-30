import { format, isValid, parseISO } from "date-fns";

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

export function longFormValueFormatter(value: string | number): string {
  return Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1, // Adjust this as needed for desired decimal places
  }).format(Number(value));
}

export function percentFormatter(value: string | number): string {
  return Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(Number(value));
}

// TODO: have different formatters for charts and KPI

export function longFormCurrencyFormatter(value: string | number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export function currencyFormatter(value: string | number): string {
  const shortened = valueFormatter(value);
  return "$" + shortened;
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

export const axisFormatter = (value: string) => {
  // First, define a function that tries to parse a string to a date and checks if it's valid
  function isValidDate(dateString: string) {
    const date = parseISO(dateString);
    return isValid(date);
  }

  // Check if the value can represent a valid date
  if (typeof value === "string" && isValidDate(value) && value.length > 6) {
    // It's a valid date string; format it
    const date = parseISO(value);
    return format(date, "yyyy-MM-dd"); // Customize as needed
  } else {
    // Not a valid date string; use categoryFormatter
    return categoryFormatter(value);
  }
};
