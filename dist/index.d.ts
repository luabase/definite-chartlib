type Value = number | string | null;
type Series$1 = Value[];
type Frame = Series$1[];
type FilterType = "<" | "<=" | ">" | ">=" | "=" | "!=";
type AggregateType = "avg" | "count" | "sum";
type SortOrder = "asc" | "desc";

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
        sql_value_type?: string;
    }[];
}

declare enum ChartType {
    BAR = "bar",
    LINE = "line",
    PIE = "pie",
    SCATTER = "scatter",
    HEATMAP = "heatmap",
    CALENDAR = "calendar"
}

interface Column {
    index: number;
    type: ChartType | null;
    color: string | string[] | null;
}
interface Axis$1 {
    columns: Column[];
}
interface FilterTransform {
    index: number;
    type: FilterType;
    value: Value;
    parser?: "datetime";
}
interface AggregateTransform {
    index: number;
    type: AggregateType;
    groupBy: number;
}
interface SortTransform {
    index: number;
    order: SortOrder;
    parser?: "datetime";
}
interface TFConfig {
    filter?: FilterTransform[];
    aggregate?: AggregateTransform[];
    sort?: SortTransform[];
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
        smooth?: boolean;
        area?: boolean;
        stack?: boolean;
        orientation?: string;
        piecewise?: boolean;
    };
    transform?: TFConfig;
    xAxis: Axis$1[];
    yAxis: Axis$1[];
    zAxis?: Axis$1[];
}

interface TextStyle {
    color?: string;
    fontWeight?: "normal" | "bold";
    fontSize?: number;
}
interface LineStyle {
    width?: number;
    type?: string;
    color?: string;
}
interface SplitLine extends IShowable {
    lineStyle?: LineStyle;
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

interface AxisLabel {
    interval?: number;
    rotate?: number;
    formatter?: (value: string | number) => string;
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

interface Calendar extends IAdjustable {
    cellSize: (string | number)[];
    range: string;
    itemStyle: {
        color: string;
        borderColor: string;
        borderWidth: number;
    };
    orient: string;
    splitLine: SplitLine;
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
    x?: string;
    y?: string;
    itemName?: string;
    value?: string;
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
    calendarIndex?: number;
    coordinateSystem?: string;
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

interface VisualMap extends IAdjustable {
    min: number;
    max: number;
    type: string;
    calculable: boolean;
    orient: "horizontal" | "vertical";
    inRange: {
        color: string[];
    };
}

interface ECOption {
    animation: boolean;
    backgroundColor: string;
    dataset: DataSet;
    grid: Grid;
    legend: Legend;
    series: Series[];
    title: Title;
    toolbox: ToolBox;
    tooltip: ToolTip;
    visualMap: VisualMap | null;
    calendar: Calendar[] | null;
    xAxis: Axis[];
    yAxis: Axis[];
}

type index$1_Axis = Axis;
type index$1_Calendar = Calendar;
type index$1_DataSet = DataSet;
type index$1_ECOption = ECOption;
type index$1_Grid = Grid;
type index$1_Legend = Legend;
type index$1_Series = Series;
type index$1_Title = Title;
type index$1_ToolBox = ToolBox;
type index$1_ToolTip = ToolTip;
type index$1_VisualMap = VisualMap;
declare namespace index$1 {
  export {
    index$1_Axis as Axis,
    index$1_Calendar as Calendar,
    index$1_DataSet as DataSet,
    index$1_ECOption as ECOption,
    index$1_Grid as Grid,
    index$1_Legend as Legend,
    index$1_Series as Series,
    index$1_Title as Title,
    index$1_ToolBox as ToolBox,
    index$1_ToolTip as ToolTip,
    index$1_VisualMap as VisualMap,
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

declare const animation: (conf: ChartConfig) => boolean;

declare const axis: (conf: ChartConfig, dataset: DataSet, axisType: "x" | "y" | "z") => Axis[];

declare const calendar: (conf: ChartConfig, dataset: DataSet) => Calendar[] | null;

declare const grid: (conf: ChartConfig, dataset: DataSet) => Grid;

declare const legend: (conf: ChartConfig) => Legend;

declare const renderer: (v: string | undefined) => string;

declare const series: (conf: ChartConfig, dataset: DataSet) => Series[];

declare const title: (conf: ChartConfig) => Title;

declare const tooltip: (conf: ChartConfig) => ToolTip;

declare const toolbox: (conf: ChartConfig) => ToolBox;

declare const visualMap: (conf: ChartConfig, dataset: DataSet) => VisualMap | null;

declare const index_animation: typeof animation;
declare const index_axis: typeof axis;
declare const index_calendar: typeof calendar;
declare const index_grid: typeof grid;
declare const index_legend: typeof legend;
declare const index_renderer: typeof renderer;
declare const index_series: typeof series;
declare const index_title: typeof title;
declare const index_toolbox: typeof toolbox;
declare const index_tooltip: typeof tooltip;
declare const index_visualMap: typeof visualMap;
declare namespace index {
  export {
    index_animation as animation,
    index_axis as axis,
    index_calendar as calendar,
    index_grid as grid,
    index_legend as legend,
    index_renderer as renderer,
    index_series as series,
    index_title as title,
    index_toolbox as toolbox,
    index_tooltip as tooltip,
    index_visualMap as visualMap,
  };
}

declare const transpose: (frame: Frame) => Frame;
declare const formatValues: (frame: Frame) => Frame;
declare const filter: (frame: Frame, col: number, type: FilterType, value: Value, parser?: "datetime") => Frame;
declare const aggregate: (frame: Frame, col: number, type: AggregateType, groupBy: number) => Frame;
declare const select: (frame: Frame, cols: number[]) => Frame;
declare const sort: (frame: Frame, col: number, order: SortOrder, parser?: "datetime") => Frame;
declare const runTfPipeline: (frame: Frame, conf: TFConfig) => Frame;

declare const frame_aggregate: typeof aggregate;
declare const frame_filter: typeof filter;
declare const frame_formatValues: typeof formatValues;
declare const frame_runTfPipeline: typeof runTfPipeline;
declare const frame_select: typeof select;
declare const frame_sort: typeof sort;
declare const frame_transpose: typeof transpose;
declare namespace frame {
  export {
    frame_aggregate as aggregate,
    frame_filter as filter,
    frame_formatValues as formatValues,
    frame_runTfPipeline as runTfPipeline,
    frame_select as select,
    frame_sort as sort,
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

declare const swap: (conf: ChartConfig) => ChartConfig;

declare const axes_swap: typeof swap;
declare namespace axes {
  export {
    axes_swap as swap,
  };
}

declare const config: (conf: ChartConfig, to: ChartType) => ChartConfig;

declare const convert_config: typeof config;
declare namespace convert {
  export {
    convert_config as config,
  };
}

declare const categoricalValues: (value: string | number) => string;
declare const numericalValues: (value: string | number) => string;

declare const format_categoricalValues: typeof categoricalValues;
declare const format_numericalValues: typeof numericalValues;
declare namespace format {
  export {
    format_categoricalValues as categoricalValues,
    format_numericalValues as numericalValues,
  };
}

declare const LIME_50 = "#f7fee7";
declare const LIME_100 = "#ecfccb";
declare const LIME_200 = "#d9f99d";
declare const LIME_300 = "#bef264";
declare const LIME_400 = "#a3e635";
declare const LIME_500 = "#84cc16";
declare const LIME_600 = "#65a30d";
declare const LIME_700 = "#4d7c0f";
declare const LIME_800 = "#3f6212";
declare const LIME_900 = "#365314";
declare const ZINC_400 = "#a1a1aa";
declare const ZINC_500 = "#71717a";
declare const ZINC_800 = "#27272a";
declare const ZINC_900 = "#18181b";
declare const TEAL = "#003f5c";
declare const DARK_BLUE = "#2f4b7c";
declare const DARK_PURPLE = "#665191";
declare const PURPLE = "#a05195";
declare const PINK = "#d45087";
declare const LIGHT_PINK = "#f95d6a";
declare const ORANGE = "#ff7c43";
declare const YELLOW = "#ffa600";
declare const LIME_PALETTE: string[];
declare const COLOR_PALETTE: string[];

declare const color_COLOR_PALETTE: typeof COLOR_PALETTE;
declare const color_DARK_BLUE: typeof DARK_BLUE;
declare const color_DARK_PURPLE: typeof DARK_PURPLE;
declare const color_LIGHT_PINK: typeof LIGHT_PINK;
declare const color_LIME_100: typeof LIME_100;
declare const color_LIME_200: typeof LIME_200;
declare const color_LIME_300: typeof LIME_300;
declare const color_LIME_400: typeof LIME_400;
declare const color_LIME_50: typeof LIME_50;
declare const color_LIME_500: typeof LIME_500;
declare const color_LIME_600: typeof LIME_600;
declare const color_LIME_700: typeof LIME_700;
declare const color_LIME_800: typeof LIME_800;
declare const color_LIME_900: typeof LIME_900;
declare const color_LIME_PALETTE: typeof LIME_PALETTE;
declare const color_ORANGE: typeof ORANGE;
declare const color_PINK: typeof PINK;
declare const color_PURPLE: typeof PURPLE;
declare const color_TEAL: typeof TEAL;
declare const color_YELLOW: typeof YELLOW;
declare const color_ZINC_400: typeof ZINC_400;
declare const color_ZINC_500: typeof ZINC_500;
declare const color_ZINC_800: typeof ZINC_800;
declare const color_ZINC_900: typeof ZINC_900;
declare namespace color {
  export {
    color_COLOR_PALETTE as COLOR_PALETTE,
    color_DARK_BLUE as DARK_BLUE,
    color_DARK_PURPLE as DARK_PURPLE,
    color_LIGHT_PINK as LIGHT_PINK,
    color_LIME_100 as LIME_100,
    color_LIME_200 as LIME_200,
    color_LIME_300 as LIME_300,
    color_LIME_400 as LIME_400,
    color_LIME_50 as LIME_50,
    color_LIME_500 as LIME_500,
    color_LIME_600 as LIME_600,
    color_LIME_700 as LIME_700,
    color_LIME_800 as LIME_800,
    color_LIME_900 as LIME_900,
    color_LIME_PALETTE as LIME_PALETTE,
    color_ORANGE as ORANGE,
    color_PINK as PINK,
    color_PURPLE as PURPLE,
    color_TEAL as TEAL,
    color_YELLOW as YELLOW,
    color_ZINC_400 as ZINC_400,
    color_ZINC_500 as ZINC_500,
    color_ZINC_800 as ZINC_800,
    color_ZINC_900 as ZINC_900,
  };
}

declare const Z_AXIS_NOT_FOUND = "zAxis not found in chart config";

declare const error_Z_AXIS_NOT_FOUND: typeof Z_AXIS_NOT_FOUND;
declare namespace error {
  export {
    error_Z_AXIS_NOT_FOUND as Z_AXIS_NOT_FOUND,
  };
}

export { AggregateType, Axis$1 as Axis, BlockDetails, BlockResults, ChartConfig, ChartType, Column, FilterType, Frame, LegacyAdditionalSeries, Series$1 as Series, SortOrder, TFConfig, Value, axes, color, convert, dataset, datetime, chartlib as default, index as determine, index$1 as echarts, error, format, frame, legacy };
