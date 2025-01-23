import { ChartType } from "./types";
import { Chart } from "./chart";
import { format, isValid, parseISO } from "date-fns";

export function categoryFormatter(value: string | number): string {
  return String(value).length > 13
    ? String(value).slice(0, 8) + "..." + String(value).slice(-2)
    : String(value);
}

function valueFormatter(value) {
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

export function currencyFormatter(
  value: string | number,
  currency_code: string
): string {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    notation: "compact",
    currency: currency_code || "USD",
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

function isValidDate(dateString: string) {
  const date = parseISO(dateString);
  return isValid(date);
}

export const axisFormatter = (value: string | number) => {
  // Check if the value can represent a valid date
  if (typeof value === "string" && isValidDate(value) && value.length > 6) {
    // It's a valid date string; format it
    const date = parseISO(value);
    return format(date, "yyyy-MM-dd"); // Customize as needed
  } else if (typeof value === "string" && !isNaN(parseFloat(value))) {
    return valueFormatter(parseFloat(value));
  } else {
    // Not a valid date string; use categoryFormatter
    return categoryFormatter(value);
  }
};

export const tooltipFormatter = (value: string) => {
  // Check if the value is a valid date string
  if (typeof value === "string" && isValidDate(value) && value.length > 6) {
    const date = parseISO(value); // Parse the ISO string to a date object
    return format(date, "yyyy-MM-dd"); // Format the date
  } else if (!isNaN(+value)) {
    // Check if value is a number
    return longFormValueFormatter(value); // Apply number formatter if it is a number
  } else {
    // If not a date and not a number, return the string value
    return String(value);
  }
};

export function determineFormatter<T extends ChartType>(
  chart: Chart<T>,
  axis: "left" | "right"
) {
  const metrics = chart.getMetrics();
  const firstMetric = metrics.find((m) => (m?.axis ?? "left") == axis);

  if (firstMetric?.format === "percent") {
    return percentFormatter;
  } else if (firstMetric?.format === "currency") {
    return (params) =>
      currencyFormatter(params, firstMetric.meta?.currency_code);
  } else {
    return (value: string | number) => {
      if (
        typeof value === "number" ||
        (typeof value === "string" && !isNaN(parseFloat(value)))
      ) {
        return valueFormatter(value);
      }
      return tooltipFormatter(value);
    };
  }
}

export function percentageCalculator(value: number, total: number): string {
  if (!total || total === 0) return "0%";
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(2)}%`; //
}
