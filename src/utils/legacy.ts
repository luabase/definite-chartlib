import { color } from "../constants";

import { type ChartConfig, type Column } from "../types/config";
import { type BlockResults, type BlockDetails } from "../types/block";
import { ChartType } from "../types";

/**
 * Convert legacy details to chart config object
 * @param details Legacy block details
 * @param results Block results
 * @returns Chart config equivalent to legacy details
 */
export const toChartConfig = (
  details: BlockDetails,
  results: BlockResults
): ChartConfig => {
  const xix = results.schema.findIndex((v) => v.name === details.xAxis);
  const yix = results.schema.findIndex((v) => v.name === details.yAxis);
  const type = (details.chartType ?? null) as ChartType;
  const defaultColor =
    details.chartType === ChartType.PIE ? color.LIME_PALETTE : color.LIME_200;
  const yCols: Column[] = [{ index: yix, type: type, color: defaultColor }];
  (details.series ?? []).forEach((s) => {
    yCols.push({
      index: results.schema.findIndex((v) => v.name === s.column),
      type: (s.type ?? null) as ChartType,
      color: s.color ?? color.DARK_BLUE,
    });
  });
  return {
    name: details.name,
    type: type,
    features: {},
    xAxis: [{ columns: [{ index: xix, type: null, color: null }] }],
    yAxis: [{ columns: yCols }],
  };
};
