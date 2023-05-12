import { color } from "../constants";
import { ChartType, ChartConfig } from "../types";
import { Axis, Column } from "../types/config";
import * as axes from "./axes";

const resetFeatures = (conf: ChartConfig): ChartConfig => {
  const tmpFeatures = conf.features;
  conf.features = {};
  conf.features.title = tmpFeatures.title ?? false;
  conf.features.legend = tmpFeatures.legend ?? false;
  return conf;
};

const convertAllColumnTypesInAxes = (axes: Axis[], to: ChartType) => {
  const columns: Column[] = [];
  axes.forEach((axis) => {
    axis.columns.forEach((col) => {
      col.type = to;
      col.color = to === ChartType.PIE ? color.LIME_PALETTE : col.color;
      columns.push(col);
    });
  });
  return [{ columns: columns }];
};

const toLine = (conf: ChartConfig): ChartConfig => {
  const from = conf.type;
  conf.type = ChartType.LINE;
  const previousFeatures = conf.features;
  conf = resetFeatures(conf);
  switch (from) {
    case ChartType.PIE: {
      conf.yAxis[0].columns[0].type = ChartType.LINE;
      conf.yAxis[0].columns[0].color = color.LIME_200;
      return conf;
    }
    default: {
      if ((previousFeatures.orientation ?? "vertical") === "horizontal") {
        conf = axes.swap(conf);
      }
      conf.yAxis = convertAllColumnTypesInAxes(conf.yAxis, ChartType.LINE);
      return conf;
    }
  }
};

const toBar = (conf: ChartConfig): ChartConfig => {
  const from = conf.type;
  conf.type = ChartType.BAR;
  conf = resetFeatures(conf);
  switch (from) {
    case ChartType.PIE: {
      conf.yAxis[0].columns[0].type = ChartType.BAR;
      conf.yAxis[0].columns[0].color = color.LIME_200;
      return conf;
    }
    default: {
      conf.yAxis = convertAllColumnTypesInAxes(conf.yAxis, ChartType.BAR);
      return conf;
    }
  }
};

const toPie = (conf: ChartConfig): ChartConfig => {
  const from = conf.type;
  conf.type = ChartType.PIE;
  conf = resetFeatures(conf);
  switch (from) {
    default: {
      conf.yAxis = convertAllColumnTypesInAxes(conf.yAxis, ChartType.PIE);
      return conf;
    }
  }
};

export const config = (conf: ChartConfig, to: ChartType): ChartConfig => {
  switch (to) {
    case ChartType.LINE:
      return toLine(conf);
    case ChartType.BAR:
      return toBar(conf);
    case ChartType.PIE:
      return toPie(conf);
    default:
      return conf;
  }
};
