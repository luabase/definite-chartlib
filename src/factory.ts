import { Chart } from "./chart";
import { ChartType, DataType } from "./types";
import { color } from "./constants";
import * as utils from "./utils";

export type ColumnOptions = {
  index: number;
  dataType: string;
  format?: "number" | "currency" | "percent";
};

type CreateChartMessage = {
  type: string;
  options: Array<ColumnOptions>;
};

const COLORS = color.COLOR_PALETTE;

// Map of column options to chart types, treated as unordered sets.
// Can match multiple
export type ChartMatchConfigOption = {
  column_type: string[];
  chart_types: string[];
};

const chartMatchConfig: ChartMatchConfigOption[] = [
  ...forAddValueColumnType(
    {
      column_type: ["category"],
      chart_types: ["bar"],
    },
    1,
    COLORS.length
  ),
  ...forAddValueColumnType(
    {
      column_type: ["datetime"],
      chart_types: ["line"],
    },
    1,
    COLORS.length
  ),
  {
    column_type: ["category", "value"],
    chart_types: ["pie", "kpi"],
  },
  {
    column_type: ["datetime", "value"],
    chart_types: ["calendar", "kpi"],
  },
  {
    column_type: ["category", "value", "value"],
    chart_types: ["scatter", "kpi"],
  },
  {
    column_type: ["datetime", "value", "value"],
    chart_types: ["scatter", "kpi"],
  },
  {
    column_type: ["category", "category", "value"],
    chart_types: ["bar", "heatmap", "kpi"],
  },
  {
    column_type: ["datetime", "category", "value"],
    chart_types: ["line", "heatmap", "kpi"],
  },
  {
    column_type: ["value"],
    chart_types: ["kpi"],
  },
];

function forAddValueColumnType(
  column_types: ChartMatchConfigOption,
  min: number,
  max: number
) {
  const entries = [];
  for (let i = min; i <= max; i++) {
    const newItem = JSON.parse(JSON.stringify(column_types)); // Deep copy the original item
    for (let j = 0; j < i; j++) {
      newItem.column_type.push("value");
    }
    entries.push(newItem);
  }
  return entries;
}

export class AutoChartFactory {
  private subsetQ: Array<Array<ColumnOptions>>;
  private createQ: Array<CreateChartMessage>;

  constructor(opts: Array<ColumnOptions>, subsets: boolean) {
    // Unordered.
    opts = opts.slice(0, 6);
    let min_subset_size = opts.length;
    if (subsets) {
      min_subset_size = 2;
    }
    this.subsetQ = utils.array.getAllSubsets(opts, min_subset_size);
    this.createQ = [];

    while (this.subsetQ.length > 0) {
      const subset = this.subsetQ.shift();
      if (subset) {
        this.addAllCreateChartMessagesToQueue(subset);
      }
    }
    this.createQ = utils.array.removeDuplicates(this.createQ);
  }

  private addAllCreateChartMessagesToQueue(opts: Array<ColumnOptions>) {
    const column_options = opts.map((opt) => opt.dataType);

    // Sort here to ignore order of columns.
    const matches = chartMatchConfig.filter(
      (config) =>
        (config.column_type.length === column_options.length &&
          config.column_type.sort().join() === column_options.sort().join()) ||
        (config.chart_types[0] === "kpi" && column_options.includes("value"))
    );

    if (matches.length > 0) {
      matches.forEach((match) => {
        match.chart_types.forEach((chartType) =>
          this.createQ.push({ type: chartType, options: opts })
        );
      });
    } else {
      return;
    }
  }

  private generateSingleChart(): Chart<ChartType> {
    const msg = this.createQ.shift();
    if (!msg) throw new Error("No more charts to generate");
    const chart = new Chart(<ChartType>msg.type);

    const valueOptions: ColumnOptions[] = msg.options.filter(
      (opt) => opt.dataType === "value"
    );
    const otherOptions: ColumnOptions[] = msg.options.filter(
      (opt) => opt.dataType !== "value"
    );

    otherOptions.forEach((opt) => {
      if (chart.canAddDimension()) {
        chart.addDimension({
          index: opt.index,
          dataType: <Exclude<DataType, "value">>opt.dataType,
          format: opt.format,
        });
      }
    });

    valueOptions.forEach((opt, i) => {
      const colorChoice = ["pie", "calendar", "heatmap", "kpi"].includes(
        msg.type
      )
        ? color.COLOR_PALETTE
        : utils.array.unboundedReadItem(COLORS, i);
      const aggregation = ["scatter", "heatmap", "kpi"].includes(msg.type)
        ? "none"
        : "sum";
      if (chart.canAddMetric()) {
        chart.addMetric({
          index: opt.index,
          color: colorChoice,
          aggregation: aggregation,
          format: opt.format,
        });
      }
    });
    return chart;
  }

  generateAllCharts(): Array<Chart<ChartType>> {
    let charts: Array<Chart<ChartType>> = [];
    while (this.createQ.length > 0) {
      const chart = this.generateSingleChart();
      charts.push(chart);
    }

    return charts;
  }
}
