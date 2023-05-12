type Value = number | string | null;
type Series$1 = Value[];
type Frame = Series$1[];

interface LegacyAdditionalSeries {
    type?: string;
    color?: string;
    column?: string;
}
interface BlockDetails {
    name: string;
    type?: string;
    xAxis?: string;
    yAxis?: string;
    chartType?: string;
    series?: LegacyAdditionalSeries[];
}
interface BlockResults {
    rows: Record<string, Value>[];
    schema: {
        name: string;
        type: string;
    }[];
}

declare enum ChartType {
    BAR = "bar",
    LINE = "line",
    PIE = "pie",
    SCATTER = "scatter"
}

interface Column {
    index: number;
    type: ChartType | null;
    color: string | string[] | null;
}
interface Axis$1 {
    columns: Column[];
}
interface ChartConfig {
    renderer?: "canvas" | "svg";
    name: string;
    type: ChartType;
    features: {
        title?: boolean;
        legend?: boolean;
        toolbox?: boolean;
        labels?: boolean;
        stack?: boolean;
        smooth?: boolean;
        area?: boolean;
        orientation?: string;
    };
    xAxis: Axis$1[];
    yAxis: Axis$1[];
}

interface TextStyle {
    color?: string;
    fontWeight?: "normal" | "bold";
    fontSize?: number;
}

interface IShowable {
    show: boolean;
}
interface IAdjustable {
    left?: string | number;
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
}
interface IStylable {
    textStyle?: TextStyle;
}

interface LineStyle {
    width?: number;
    type?: string;
    color?: string;
}
interface SplitLine extends IShowable {
    lineStyle?: LineStyle;
}
interface AxisLabel {
    interval: number;
    rotate: number;
}
interface Axis extends IShowable {
    type: "value" | "category";
    name: string;
    nameLocation?: "start" | "center" | "end";
    nameTextStyle?: TextStyle;
    nameGap?: number;
    splitLine?: SplitLine;
    axisLabel?: AxisLabel;
}

interface DataSet {
    dimensions: string[];
    source: Frame;
}

interface Grid extends IAdjustable, IShowable {
    containLabel: boolean;
}

interface Legend extends IShowable, IAdjustable, IStylable {
    type?: "plain" | "scroll";
}

interface Label extends IShowable {
    position?: "top" | "left" | "bottom" | "right";
    color?: string;
}
interface Encode {
    x: string;
    y: string;
}
interface Series extends IStylable {
    type: string;
    name?: string;
    encode?: Encode;
    color?: string | string[];
    xAxisIndex?: number;
    yAxisIndex?: number;
    label?: Label;
    stack?: string;
    smooth?: boolean;
    radius?: string[];
    areaStyle?: object;
    itemStyle?: object;
    symbolSize?: number;
}

interface Title extends IShowable, IAdjustable, IStylable {
    text: string;
}

interface SaveAsImageFeature extends IShowable {
    type: "png" | "jpg";
}
interface DataViewFeature extends IShowable {
    readOnly: boolean;
}
interface Feature {
    saveAsImage: SaveAsImageFeature;
    dataView: DataViewFeature;
}
interface ToolBox extends IShowable {
    feature?: Feature;
}

interface CrossStyle {
    color: string;
}
interface AxisPointer {
    type: "line" | "cross" | "none";
    crossStyle: CrossStyle;
}
interface ToolTip extends IShowable {
    trigger?: "item" | "axis" | "none";
    axisPointer?: AxisPointer;
    formatter?: string;
}

interface ECOption {
    title: Title;
    legend: Legend;
    grid: Grid;
    xAxis: Axis[];
    yAxis: Axis[];
    tooltip: ToolTip;
    toolbox: ToolBox;
    dataset: DataSet;
    series: Series[];
    backgroundColor: string;
    animation: boolean;
}

type index_Axis = Axis;
type index_DataSet = DataSet;
type index_ECOption = ECOption;
type index_Grid = Grid;
type index_Legend = Legend;
type index_Series = Series;
type index_Title = Title;
type index_ToolBox = ToolBox;
type index_ToolTip = ToolTip;
declare namespace index {
  export {
    index_Axis as Axis,
    index_DataSet as DataSet,
    index_ECOption as ECOption,
    index_Grid as Grid,
    index_Legend as Legend,
    index_Series as Series,
    index_Title as Title,
    index_ToolBox as ToolBox,
    index_ToolTip as ToolTip,
  };
}

declare const ecOptionFromDataset: (conf: ChartConfig, dataset: DataSet) => ECOption;
declare const ecOptionFromBlockResult: (conf: ChartConfig, res: BlockResults) => ECOption;

declare const chartlib_ecOptionFromBlockResult: typeof ecOptionFromBlockResult;
declare const chartlib_ecOptionFromDataset: typeof ecOptionFromDataset;
declare namespace chartlib {
  export {
    chartlib_ecOptionFromBlockResult as ecOptionFromBlockResult,
    chartlib_ecOptionFromDataset as ecOptionFromDataset,
  };
}

declare const fromBlockResult: (results: BlockResults) => DataSet;

declare const dataset_fromBlockResult: typeof fromBlockResult;
declare namespace dataset {
  export {
    dataset_fromBlockResult as fromBlockResult,
  };
}

declare const toDateUTC: (v: Value | Date) => Date;
declare const isStartOrEndOfYear: (v: Value) => boolean;
declare const isStartOrEndOfQuarter: (v: Value) => boolean;
declare const isStartOrEndOfMonth: (v: Value) => boolean;
declare const strftime: (v: Value | Date, fmt: string) => string;

declare const datetime_isStartOrEndOfMonth: typeof isStartOrEndOfMonth;
declare const datetime_isStartOrEndOfQuarter: typeof isStartOrEndOfQuarter;
declare const datetime_isStartOrEndOfYear: typeof isStartOrEndOfYear;
declare const datetime_strftime: typeof strftime;
declare const datetime_toDateUTC: typeof toDateUTC;
declare namespace datetime {
  export {
    datetime_isStartOrEndOfMonth as isStartOrEndOfMonth,
    datetime_isStartOrEndOfQuarter as isStartOrEndOfQuarter,
    datetime_isStartOrEndOfYear as isStartOrEndOfYear,
    datetime_strftime as strftime,
    datetime_toDateUTC as toDateUTC,
  };
}

declare const renderer: (v: string | undefined) => string;
declare const title: (conf: ChartConfig) => Title;
declare const legend: (conf: ChartConfig) => Legend;
declare const grid: (conf: ChartConfig) => Grid;
declare const axis: (conf: ChartConfig, dataset: DataSet, direction: "horizontal" | "vertical") => Axis[];
declare const series: (conf: ChartConfig, dataset: DataSet) => Series[];
declare const animation: (conf: ChartConfig) => boolean;
declare const tooltip: (conf: ChartConfig) => ToolTip;
declare const toolbox: (conf: ChartConfig) => ToolBox;

declare const determine_animation: typeof animation;
declare const determine_axis: typeof axis;
declare const determine_grid: typeof grid;
declare const determine_legend: typeof legend;
declare const determine_renderer: typeof renderer;
declare const determine_series: typeof series;
declare const determine_title: typeof title;
declare const determine_toolbox: typeof toolbox;
declare const determine_tooltip: typeof tooltip;
declare namespace determine {
  export {
    determine_animation as animation,
    determine_axis as axis,
    determine_grid as grid,
    determine_legend as legend,
    determine_renderer as renderer,
    determine_series as series,
    determine_title as title,
    determine_toolbox as toolbox,
    determine_tooltip as tooltip,
  };
}

declare const transpose: (frame: Frame) => Frame;
declare const formatValues: (frame: Frame) => Frame;

declare const frame_formatValues: typeof formatValues;
declare const frame_transpose: typeof transpose;
declare namespace frame {
  export {
    frame_formatValues as formatValues,
    frame_transpose as transpose,
  };
}

/**
 * Convert legacy details to chart config object
 * @param details Legacy block details
 * @param results Block results
 * @returns Chart config equivalent to legacy details
 */
declare const toChartConfig: (details: BlockDetails, results: BlockResults) => ChartConfig;

declare const legacy_toChartConfig: typeof toChartConfig;
declare namespace legacy {
  export {
    legacy_toChartConfig as toChartConfig,
  };
}

export { BlockDetails, BlockResults, ChartConfig, ChartType, Column, Frame, LegacyAdditionalSeries, Series$1 as Series, Value, dataset, datetime, chartlib as default, determine, index as echarts, frame, legacy };
