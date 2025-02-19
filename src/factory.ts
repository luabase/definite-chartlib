import { Chart } from "./chart";
import { ChartType, DataType } from "./types";
import { color } from "./constants";
import { MetaType } from "./types";
import * as utils from "./utils";

export type ColumnOptions = {
  index: number;
  dataType: string;
  format?: "number" | "currency" | "percent";
  meta?: MetaType;
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

const getChartMatchConfig = (
  numberOfRows: number
): ChartMatchConfigOption[] => {
  // Determine default chart types based on row count
  const defaultValueChartTypes = numberOfRows > 10 ? ["bar", "line"] : ["kpi"];

  return [
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
      column_type: ["value"],
      chart_types: defaultValueChartTypes, // Dynamically choose bar/line or kpi
    },
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
  ];
};

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
  numberOfRows: number;

  constructor(
    opts: Array<ColumnOptions>,
    subsets: boolean,
    numberOfRows: number
  ) {
    this.numberOfRows = numberOfRows;
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
    const columnOptions = opts.map((opt) => opt.dataType);
    const columnSet = new Set(columnOptions); // Convert to set for flexible matching
    const configList = getChartMatchConfig(this.numberOfRows);

    // Count how many value and dimension (category/datetime) columns exist
    const valueOptions = opts.filter((opt) => opt.dataType === "value");
    const dimensionOptions = opts.filter(
      (opt) => opt.dataType === "category" || opt.dataType === "datetime"
    );

    // Find exact matches first
    let matches = configList.filter((config) => {
      return (
        new Set(config.column_type).size === columnSet.size &&
        config.column_type.every((type) => columnSet.has(type))
      );
    });

    if (matches.length === 0) {
      // No exact match? Find best match based on highest column overlap
      matches = configList
        .map((config) => ({
          config,
          matchScore: config.column_type.filter((type) => columnSet.has(type))
            .length,
          extraValues: config.column_type.filter((type) => type === "value")
            .length, // Count extra values
        }))
        .sort((a, b) => {
          if (b.matchScore !== a.matchScore) {
            return b.matchScore - a.matchScore; // Prioritize highest overlap
          }
          return a.extraValues - b.extraValues; // Prefer fewer additional "value" fields
        })
        .map((match) => match.config)
        .slice(0, 3); // Pick top 3 best-matching results
    }

    // ❌ Remove scatter charts if fewer than 2 value columns
    matches.forEach((match) => {
      if (match.chart_types.includes("scatter") && valueOptions.length < 2) {
        match.chart_types = match.chart_types.filter(
          (type) => type !== "scatter"
        );
      }

      // ❌ Remove heatmap if fewer than 2 dimension columns
      if (
        match.chart_types.includes("heatmap") &&
        dimensionOptions.length < 2
      ) {
        match.chart_types = match.chart_types.filter(
          (type) => type !== "heatmap"
        );
      }
    });

    // Reduce redundant configurations that have too many "value" columns
    const uniqueMatches: ChartMatchConfigOption[] = [];
    const seenChartTypes = new Set<string>();

    for (const match of matches) {
      const key = match.chart_types.join("-");
      if (!seenChartTypes.has(key)) {
        seenChartTypes.add(key);
        uniqueMatches.push(match);
      }
    }

    // Ensure at least one KPI fallback if no strong match is found
    if (uniqueMatches.length === 0 && columnOptions.includes("value")) {
      uniqueMatches.push(
        ...configList.filter((config) => config.chart_types.includes("kpi"))
      );
    }

    uniqueMatches.forEach((match) => {
      match.chart_types.forEach((chartType) =>
        this.createQ.push({ type: chartType, options: opts })
      );
    });
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

    if (otherOptions.length === 0 && valueOptions.length > 0) {
      // ✅ Randomly select one of the "value" columns to be a dimension
      const randomIndex = Math.floor(Math.random() * valueOptions.length);
      const randomValueAsDimension = valueOptions.splice(randomIndex, 1)[0]; // Remove and store the selected value

      if (randomValueAsDimension && chart.canAddDimension()) {
        chart.addDimension({
          index: randomValueAsDimension.index,
          dataType: "value" as Exclude<DataType, "value">, // Treat as categorical-like axis
          format: randomValueAsDimension.format,
        });
      }
    }

    // ✅ Add otherOptions as dimensions if available
    otherOptions.forEach((opt) => {
      if (chart.canAddDimension()) {
        chart.addDimension({
          index: opt.index,
          dataType: <Exclude<DataType, "value">>opt.dataType,
          format: opt.format,
        });
      }
    });

    // ✅ Add remaining valueOptions as metrics
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
          meta: opt.meta,
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
