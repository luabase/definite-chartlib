import { Chart } from "../chart";
import { ChartType, Metric, echarts } from "../types";
import { DS_SURFACE_PLATFORM_COLORS, DS_TEXT_COLORS } from "../constants/color"; // Update this import to the correct path
import * as utils from "../utils";
import { DataFrame } from "../dataframe";
import * as formatters from "../formatters";
import { stateAbbreviations } from "../constants";
import { findCountryOrStateIndices, findNumberIndex } from "./helpers";
import country from "country-list-js";
import { format, isValid, parseISO, getYear } from "date-fns";
import { categoryFormatter } from "../formatters";
import { color } from "../constants";
import { DS_BORDER_COLORS } from "../constants/color";

const funnelFormatter = (value: string) => {
  function isValidDate(dateString: string) {
    const date = parseISO(dateString);
    return isValid(date);
  }

  if (typeof value === "string" && isValidDate(value) && value.length > 6) {
    const date = parseISO(value);
    return format(date, "yyyy-MM-dd");
  } else {
    return categoryFormatter(value);
  }
};

export function series<T extends ChartType>(
  chart: Chart<T>,
  datasets: echarts.DataSet[],
  theme: string
): echarts.Series[] {
  // Handle sankey chart type first
  if (chart.getChartType() === "sankey") {
    return sankeyChart(chart as unknown as Chart<"sankey">, datasets, theme);
  }

  const series: echarts.Series[] = [];
  const colors: string[] = [];
  const formatter = formatters.determineFormatter(chart, "left");

  if (chart.getChartType() === "kpi") {
    const metric = chart.getMetrics()[0];
    const format = metric.format ?? "number";
    let formatter = chart.getStyleShowLongNumber()
      ? formatters.longFormValueFormatter
      : formatters.valueFormatter;
    if (format === "percent") {
      formatter = formatters.percentFormatter;
    } else if (format === "currency") {
      formatter = (
        chart.getStyleShowLongNumber()
          ? formatters.longFormCurrencyFormatter
          : formatters.currencyFormatter
      ) as (value: string | number) => string;
    }
    series.push({
      datasetIndex: 1,
      type: "gauge",
      radius: "0%",
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        show: false,
      },
      title: {
        show: false,
      },
      detail: {
        show: true,
        fontSize: 42,
        formatter,
      },
    });
    return series;
  }
  datasets.slice(1).forEach((dataset) => {
    if (!dataset.id) {
      throw new Error("Dataset for series must include ID");
    }
    let [mix, t, dix, name, mid] = dataset.id.split("::");
    const metric = chart.getMetric(
      (m) =>
        m.index === Number(mix) &&
        (m.chartType ?? chart.getChartType()) === t &&
        m.id == mid
    );
    if (!metric) throw new Error("Metric not found");
    const colorId = `${mid}-${metric.color}`;
    const c = colors.includes(colorId)
      ? utils.array.unboundedReadItem(color.COLOR_PALETTE, Number(dix) - 1)
      : metric.color;
    colors.push(colorId);
    t = t === "calendar" ? "heatmap" : t;
    const item: echarts.Series = {
      type: t,
      color: c,
      datasetIndex: Number(dix),
      name: name,
    };
    if (chart.getChartType() === "funnel") {
      item.label = {
        color:
          theme === "light"
            ? DS_TEXT_COLORS.light.primary
            : DS_TEXT_COLORS.dark.primary,
        show: true,
        position: "inside" as "left" | "right" | "top" | "bottom",
        backgroundColor:
          theme === "light"
            ? DS_SURFACE_PLATFORM_COLORS.light.card
            : DS_SURFACE_PLATFORM_COLORS.dark.card,
        padding: [1, 2],
        borderRadius: 2,
        formatter: (params: any) => funnelFormatter(params.name),
      };
      item.itemStyle = {
        borderWidth: 0,
      };
    } else if (chart.getStyleOrientation() === "horizontal") {
      item.xAxisIndex = 0;
      item.encode = { x: dataset.dimensions[1], y: dataset.dimensions[0] };
    } else if (chart.getChartType() === "pie") {
      item.encode = {
        itemName: dataset.dimensions[0],
        value: dataset.dimensions[1],
      };
      item.itemStyle = {
        borderColor:
          theme === "light"
            ? DS_BORDER_COLORS.light.secondary
            : DS_BORDER_COLORS.dark.secondary,
        borderRadius: 10,
        borderWidth: 2,
      };
      item.label = {
        color:
          theme === "light"
            ? DS_TEXT_COLORS.light.primary
            : DS_TEXT_COLORS.dark.primary,
        show: true,
        formatter: function (params) {
          return (
            params.name +
            ": " +
            (typeof params.value === "number"
              ? formatter(params.value)
              : formatter(params.value[1])) +
            " (" +
            formatters.percentFormatter(params.percent / 100) +
            ")"
          );
        },
      };
      item.yAxisIndex = 0;
      item.textStyle = {
        color:
          theme === "light"
            ? DS_SURFACE_PLATFORM_COLORS.light.card
            : DS_SURFACE_PLATFORM_COLORS.dark.card,
      };
      item.radius = ["40%", "70%"];
    } else if (chart.getChartType() === "scatter") {
      const metrics = chart.getMetrics();
      if (metrics.length === 2) {
        item.symbolSize = 15;
      } else if (metrics.length === 3) {
        item.symbolSize = (value: Array<number | string>) => {
          const number = Number(value[metrics[2].index]);
          const exponent = Math.floor(Math.log10(number)) + 1;
          return number / 10 ** (exponent - 2);
        };
      }
      item.encode = {
        x: dataset.dimensions[metrics[0].index],
        y: dataset.dimensions[metrics[1].index],
        tooltip: [
          dataset.dimensions[chart.getGroupByDimension()?.index ?? 0],
          dataset.dimensions[metrics[0].index],
          dataset.dimensions[metrics[1].index],
        ],
      };
    } else if (chart.getChartType() === "calendar") {
      const df = DataFrame.fromDataSet(dataset);
      Array.from(
        new Set(
          df
            .col(0)
            .map((v) => new Date(String(v)))
            .map((d) => d.getUTCFullYear())
            .sort()
        )
      ).forEach((_, i) => {
        series.push({
          type: "heatmap",
          coordinateSystem: "calendar",
          name: name,
          datasetIndex: 1,
          calendarIndex: i,
        });
      });
      return;
    } else if (chart.getChartType() === "heatmap") {
      delete item.color;
      const [dim1, dim2] = chart.getDimensions();
      item.datasetIndex = 1;
      item.encode = {
        x: dataset.dimensions[dim1.index],
        y: dataset.dimensions[dim2.index],
        value: dataset.dimensions[metric.index],
      };
      item.name = dataset.dimensions[metric.index];
    } else if (chart.getChartType() === "map") {
      item.roam = false;
      item.type = "map";
      item.label = { show: false };
      item.itemStyle = {
        color: "rgba(0,0,0,0)",
      };
      const { stateIndex, countryIndex } = findCountryOrStateIndices(
        dataset.dimensions
      );

      const isCountries = countryIndex > -1;
      const isStates = stateIndex > -1;

      (item as any).map = isCountries ? "Countries" : "USA";

      const { numberIndex } = findNumberIndex(dataset.source);
      item.name = dataset.dimensions[numberIndex];

      const data: Array<{ name: string; value: any }> = [];

      dataset.source.forEach((sourceItem) => {
        const region =
          (isCountries ? sourceItem[countryIndex] : sourceItem[stateIndex]) ||
          "";

        let regionFullName = "";

        if (isCountries) {
          regionFullName =
            typeof region === "string" && region.length === 2
              ? country.findByIso2(region)?.name || ""
              : String(region);
        } else if (isStates) {
          regionFullName =
            typeof region === "string" && region.length === 2
              ? stateAbbreviations[region as keyof typeof stateAbbreviations] ||
                ""
              : String(sourceItem[stateIndex]);
        }

        data.push({
          name: regionFullName,
          value: sourceItem[numberIndex],
        });
      });
      (item as any).data = data;
    } else {
      item.yAxisIndex = 0;
      item.encode = { x: dataset.dimensions[0], y: dataset.dimensions[1] };
    }
    if (
      chart.getStyleBarStyle() === "stacked" ||
      chart.getStyleLineStyle() === "area"
    ) {
      item.stack = "total";
      if (chart.getChartType() === "line") {
        item.areaStyle = {};
      }
      if (chart.getChartType() === "bar" && t === "line") {
        item.stack = "";
      }
    }
    if (["bar", "line"].includes(chart.getChartType())) {
      item.yAxisIndex =
        (metric as Metric<"bar" | "line">).axis === "right" ? 1 : 0;
    }
    if (chart.getChartType() === "funnel") {
      // Funnel chart type
    }
    series.push(item);
  });

  return series;
}

// Fix the type definitions for sankeyChart function
function sankeyChart(
  chart: Chart<"sankey">,
  datasets: echarts.DataSet[],
  theme: string
): echarts.Series[] {
  const dimensions = chart.getDimensions();
  const metrics = chart.getMetrics();
  const valueDimIndex = metrics[0].index;

  // Extract links from the dataset
  const rawLinks = [];

  // If there are more than 2 dimensions, create links between consecutive dimensions
  // For each row in the dataset
  datasets[0].source.forEach((row: any) => {
    // Create links between consecutive dimensions
    for (let i = 0; i < dimensions.length - 1; i++) {
      const sourceDimIndex = dimensions[i].index;
      const targetDimIndex = dimensions[i + 1].index;

      rawLinks.push({
        source: row[sourceDimIndex],
        target: row[targetDimIndex],
        value: row[valueDimIndex],
      });
    }
  });

  // Detect and remove cycles
  const links = removeCycles(rawLinks);

  // Create nodes from the filtered links
  const nodes = links.reduce((acc: Array<{ name: string }>, link) => {
    // Check if source node already exists in the accumulator
    if (!acc.some((node) => node.name === link.source)) {
      acc.push({ name: link.source });
    }

    // Check if target node already exists in the accumulator
    if (!acc.some((node) => node.name === link.target)) {
      acc.push({ name: link.target });
    }

    return acc;
  }, []);

  // Create the series configuration for Sankey chart
  return [
    {
      type: "sankey",
      data: nodes,
      links: links,
      emphasis: {
        focus: "adjacency",
      },
      lineStyle: {
        color: "gradient",
        curveness: 0.5,
      },
      // Use the metric color for the nodes
      itemStyle: {
        color: Array.isArray(metrics[0].color)
          ? metrics[0].color[0]
          : metrics[0].color,
      },
      label: {
        color: theme === "dark" ? "#ffffff" : "#000000",
      },
      levels: [
        {
          depth: 0,
          itemStyle: {
            color: "#fbb4ae",
          },
          lineStyle: {
            color: "source",
            opacity: 0.6,
          },
        },
        {
          depth: 1,
          itemStyle: {
            color: "#b3cde3",
          },
          lineStyle: {
            color: "source",
            opacity: 0.6,
          },
        },
        {
          depth: 2,
          itemStyle: {
            color: "#ccebc5",
          },
          lineStyle: {
            color: "source",
            opacity: 0.6,
          },
        },
        {
          depth: 3,
          itemStyle: {
            color: "#decbe4",
          },
          lineStyle: {
            color: "source",
            opacity: 0.6,
          },
        },
      ],
    } as unknown as echarts.Series,
  ];
}

// Helper function to handle cycles in Sankey data by creating duplicate nodes
function removeCycles(
  links: Array<{ source: string; target: string; value: number }>
): Array<{ source: string; target: string; value: number }> {
  // Build a directed graph representation
  const graph: Record<string, string[]> = {};

  // Initialize the graph
  links.forEach((link) => {
    if (!graph[link.source]) {
      graph[link.source] = [];
    }
    if (!graph[link.target]) {
      graph[link.target] = [];
    }

    // Add edge
    graph[link.source].push(link.target);
  });

  // Function to detect cycles using DFS
  function findCycle(
    node: string,
    visited: Set<string>,
    recStack: Set<string>,
    path: Array<string> = []
  ): Array<string> | null {
    // Mark current node as visited and add to recursion stack
    visited.add(node);
    recStack.add(node);
    path.push(node);

    // Visit all neighbors
    for (const neighbor of graph[node]) {
      // If the neighbor is in recursion stack, we found a cycle
      if (recStack.has(neighbor)) {
        // Return the cycle path
        const cycleStart = path.indexOf(neighbor);
        return path.slice(cycleStart);
      }

      // If neighbor is not visited, check if there's a cycle starting from it
      if (!visited.has(neighbor)) {
        const cyclePath = findCycle(neighbor, visited, recStack, [...path]);
        if (cyclePath) {
          return cyclePath;
        }
      }
    }

    // Remove the node from recursion stack
    recStack.delete(node);
    return null;
  }

  // Create modified links with duplicate nodes for cycles
  const modifiedLinks = [...links];
  let cyclesHandled = 0;
  const duplicateNodeMap = new Map<string, number>();

  // Keep handling cycles until no more are found
  while (true) {
    let cycleFound = false;

    // For each node, check if it's part of a cycle
    for (const node of Object.keys(graph)) {
      const visited = new Set<string>();
      const recStack = new Set<string>();

      const cyclePath = findCycle(node, visited, recStack);

      if (cyclePath) {
        cycleFound = true;
        cyclesHandled++;

        // Choose a node in the cycle to duplicate
        // We'll pick the one with the most connections to minimize duplications
        let nodeToBreak = cyclePath[0];
        let maxConnections = 0;

        for (const cycleNode of cyclePath) {
          const connections = (graph[cycleNode] || []).length;
          if (connections > maxConnections) {
            maxConnections = connections;
            nodeToBreak = cycleNode;
          }
        }

        // Create a duplicate node
        const duplicateCount = duplicateNodeMap.get(nodeToBreak) || 0;
        const duplicateNodeName = `${nodeToBreak} (${duplicateCount + 1})`;
        duplicateNodeMap.set(nodeToBreak, duplicateCount + 1);

        // Find all links where the node is a target and create duplicates with the new node
        const incomingLinks = modifiedLinks.filter(
          (link) => link.target === nodeToBreak
        );

        // Create duplicate links with the new node as target
        incomingLinks.forEach((link) => {
          // Only duplicate some incoming links to break the cycle
          // We'll pick links that are part of the cycle
          if (cyclePath.includes(link.source)) {
            modifiedLinks.push({
              source: link.source,
              target: duplicateNodeName,
              value: link.value,
            });

            // Remove the original link to break the cycle
            const linkIndex = modifiedLinks.indexOf(link);
            if (linkIndex !== -1) {
              modifiedLinks.splice(linkIndex, 1);
            }
          }
        });

        // Rebuild the graph with the modified links
        Object.keys(graph).forEach((key) => {
          graph[key] = [];
        });
        graph[duplicateNodeName] = [];

        modifiedLinks.forEach((link) => {
          if (!graph[link.source]) {
            graph[link.source] = [];
          }
          if (!graph[link.target]) {
            graph[link.target] = [];
          }
          graph[link.source].push(link.target);
        });

        break; // Start over with the updated graph
      }
    }

    if (!cycleFound) {
      break; // No more cycles found
    }
  }

  if (cyclesHandled > 0) {
    console.log(
      `Handled ${cyclesHandled} cycles by creating duplicate nodes in Sankey diagram`
    );
  }

  return modifiedLinks;
}
