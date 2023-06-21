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
      if ([ChartType.HEATMAP, ChartType.PIE].includes(to)) {
        col.color = color.LIME_PALETTE;
      } else if (Array.isArray(col.color)) {
        col.color = color.LIME_200;
      }
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
    case ChartType.HEATMAP: {
      if (!conf.zAxis) {
        throw "zAxis not found";
      }
      conf.yAxis = convertAllColumnTypesInAxes(conf.zAxis, ChartType.LINE);
      delete conf.zAxis;
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
    case ChartType.HEATMAP: {
      if (!conf.zAxis) {
        throw "zAxis not found";
      }
      conf.yAxis = convertAllColumnTypesInAxes(conf.zAxis, ChartType.BAR);
      delete conf.zAxis;
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
  const previousFeatures = conf.features;
  conf = resetFeatures(conf);
  conf.features.legend = false;
  switch (from) {
    case ChartType.HEATMAP: {
      if (!conf.zAxis) {
        throw "zAxis not found";
      }
      conf.yAxis = convertAllColumnTypesInAxes(conf.zAxis, ChartType.PIE);
      delete conf.zAxis;
      return conf;
    }
    default: {
      if ((previousFeatures.orientation ?? "vertical") === "horizontal") {
        conf = axes.swap(conf);
      }
      conf.yAxis = convertAllColumnTypesInAxes(conf.yAxis, ChartType.PIE);
      return conf;
    }
  }
};

const toHeatmap = (conf: ChartConfig): ChartConfig => {
  const from = conf.type;
  conf.type = ChartType.HEATMAP;
  const previousFeatures = conf.features;
  conf = resetFeatures(conf);
  switch (from) {
    default: {
      if ((previousFeatures.orientation ?? "vertical") === "horizontal") {
        conf = axes.swap(conf);
      }
      const xAxis = conf.xAxis;
      conf.zAxis = convertAllColumnTypesInAxes(conf.yAxis, ChartType.HEATMAP);
      conf.xAxis = xAxis;
      conf.yAxis = xAxis;
      return conf;
    }
  }
};

const toScatter = (conf: ChartConfig): ChartConfig => {
  const from = conf.type;
  conf.type = ChartType.SCATTER;
  const previousFeatures = conf.features;
  conf = resetFeatures(conf);
  switch (from) {
    case ChartType.HEATMAP: {
      if (!conf.zAxis) {
        throw "zAxis not found";
      }
      conf.yAxis = convertAllColumnTypesInAxes(conf.zAxis, ChartType.SCATTER);
      delete conf.zAxis;
      return conf;
    }
    default: {
      if ((previousFeatures.orientation ?? "vertical") === "horizontal") {
        conf = axes.swap(conf);
      }
      conf.yAxis = convertAllColumnTypesInAxes(conf.yAxis, ChartType.SCATTER);
      return conf;
    }
  }
};

export const config = (conf: ChartConfig, to: ChartType): ChartConfig => {
  console.debug(`Converting chart from ${conf.type} to ${to}`);
  switch (to) {
    case ChartType.LINE:
      return toLine(conf);
    case ChartType.BAR:
      return toBar(conf);
    case ChartType.PIE:
      return toPie(conf);
    case ChartType.SCATTER:
      return toScatter(conf);
    case ChartType.HEATMAP:
      return toHeatmap(conf);
    default:
      return conf;
  }
};
