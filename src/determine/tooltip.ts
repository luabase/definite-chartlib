import { Chart } from "../chart";
import { ChartType, echarts } from "../types";
import { calendarTooltipFormatter } from "../formatters";
import { color } from "../constants";

export function tooltip<T extends ChartType>(
  chart: Chart<T>,
  theme: string
): echarts.ToolTip {
  const isBarOrLine = ["bar", "line"].includes(chart.getChartType());
  const item: echarts.ToolTip = {
    confine: true,
    backgroundColor: theme === "light" ? color.ZINC_100 : color.ZINC_900,
    borderColor: theme === "light" ? color.ZINC_300 : color.ZINC_500,
    textStyle: {
      color: theme === "light" ? color.ZINC_900 : color.ZINC_300,
    },
    show: true,
    trigger: !isBarOrLine ? "item" : "axis",
    axisPointer: {
      label: {
        backgroundColor: color.ZINC_500,
      },
    },
  };
  if (isBarOrLine) {
    item.axisPointer = {
      type: "cross",
      label: {
        backgroundColor: color.ZINC_500,
      },
      crossStyle: { color: "#999999" },
    };
  } else if (chart.getChartType() === "calendar") {
    item.formatter = calendarTooltipFormatter;
  }
  return item;
}
