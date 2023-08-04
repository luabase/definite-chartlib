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
    show?: boolean;
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
interface Axis$1 extends IShowable {
    type: "value" | "category";
    name: string;
    nameGap: number;
    nameLocation?: "start" | "center" | "end";
    nameTextStyle?: TextStyle;
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

type Predicate<T> = (v: T) => boolean;
type Option<T> = T | null;

interface DataSet {
    /** Composite ID ({{ METRIC INDEX }}::{{ CHART TYPE }}::{{ DATASET INDEX }}::{{ NAME }}) */
    id?: string;
    dimensions: string[];
    source: Array<Array<Option<number | string>>>;
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
    tooltip?: string[] | string;
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
    datasetIndex?: number;
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
    formatter?: string | ((params: any) => string);
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
    dataset: DataSet[];
    grid: Grid;
    legend: Legend;
    series: Series[];
    title: Title;
    toolbox: ToolBox;
    tooltip: ToolTip;
    visualMap: VisualMap | null;
    calendar: Calendar[] | null;
    xAxis: Axis$1[];
    yAxis: Axis$1[];
}

type index_Calendar = Calendar;
type index_DataSet = DataSet;
type index_ECOption = ECOption;
type index_Grid = Grid;
type index_Legend = Legend;
type index_Series = Series;
type index_Title = Title;
type index_ToolBox = ToolBox;
type index_ToolTip = ToolTip;
type index_VisualMap = VisualMap;
declare namespace index {
  export {
    Axis$1 as Axis,
    index_Calendar as Calendar,
    index_DataSet as DataSet,
    index_ECOption as ECOption,
    index_Grid as Grid,
    index_Legend as Legend,
    index_Series as Series,
    index_Title as Title,
    index_ToolBox as ToolBox,
    index_ToolTip as ToolTip,
    index_VisualMap as VisualMap,
  };
}

type RowOriented = Array<{
    [key: string]: Option<number | string>;
}>;

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
declare const COMBINED_PALETTE: string[];

declare const color_COLOR_PALETTE: typeof COLOR_PALETTE;
declare const color_COMBINED_PALETTE: typeof COMBINED_PALETTE;
declare const color_DARK_BLUE: typeof DARK_BLUE;
declare const color_DARK_PURPLE: typeof DARK_PURPLE;
declare const color_LIGHT_PINK: typeof LIGHT_PINK;
declare const color_LIME_200: typeof LIME_200;
declare const color_LIME_300: typeof LIME_300;
declare const color_LIME_400: typeof LIME_400;
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
    color_COMBINED_PALETTE as COMBINED_PALETTE,
    color_DARK_BLUE as DARK_BLUE,
    color_DARK_PURPLE as DARK_PURPLE,
    color_LIGHT_PINK as LIGHT_PINK,
    color_LIME_200 as LIME_200,
    color_LIME_300 as LIME_300,
    color_LIME_400 as LIME_400,
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

type ChartType = "line" | "bar" | "calendar" | "heatmap" | "pie" | "scatter";
type DataType = "category" | "datetime" | "value";
type AggregationType = "avg" | "count" | "distinct" | "sum" | "min" | "max" | "none";
type AxisType = "left" | "right";
type OrientationType = "vertical" | "horizontal";
type BarStyleType = "grouped" | "stacked";
type LineStyleType = "point" | "area";
type ColorGroupingType = "continuous" | "piecewise";

interface Indexable {
    index: number;
}
interface Identifiable {
    id?: number;
}
type ChartSpecificDimension<T extends ChartType> = T extends "calendar" ? {
    dataType: Exclude<DataType, "value">;
} : {
    dataType: Exclude<DataType, "value">;
};
type Dimension<T extends ChartType> = Identifiable & Indexable & ChartSpecificDimension<T>;
type ChartSpecificMetric<T extends ChartType> = T extends "bar" ? {
    chartType?: "bar" | "line";
    axis?: AxisType;
    aggregation: Exclude<AggregationType, "none">;
} : T extends "line" ? {
    chartType?: "line" | "bar";
    axis?: AxisType;
    aggregation: Exclude<AggregationType, "none">;
} : T extends "pie" ? {
    chartType?: "pie";
    aggregation: Exclude<AggregationType, "none" | "min" | "max">;
} : T extends "scatter" ? {
    chartType?: "scatter";
    aggregation: "none";
} : T extends "heatmap" ? {
    chartType?: "heatmap";
    aggregation: "none";
} : {
    chartType?: "calendar";
    aggregation: AggregationType;
};
type Metric<T extends ChartType> = Identifiable & Indexable & ChartSpecificMetric<T> & {
    color: string | string[];
    dataType?: "value";
};
interface BaseStyleOptions {
    showTitle: boolean;
    showToolbox: boolean;
}
type ExtraStyleOptions<T extends ChartType> = T extends "bar" ? {
    showLegend: boolean;
    barStyle: BarStyleType;
    orientation: OrientationType;
} : T extends "line" ? {
    showLegend: boolean;
    lineStyle: LineStyleType;
} : T extends "calendar" ? {
    colorGrouping: ColorGroupingType;
} : T extends "heatmap" ? {
    colorGrouping: ColorGroupingType;
} : {};
type StyleOptions<T extends ChartType> = BaseStyleOptions & ExtraStyleOptions<T>;
interface ChartOptions<T extends ChartType> {
    chartType: T;
    style: StyleOptions<T>;
    dimensions: Dimension<T>[];
    metrics: Metric<T>[];
}

interface Column {
    index: number;
    type: ChartType | null;
    color: string | string[] | null;
}
interface Axis {
    columns: Column[];
}
interface LegacyOptions<T extends ChartType> {
    renderer?: "canvas" | "svg";
    name: string;
    type: T;
    features: {
        title?: boolean;
        legend?: boolean;
        toolbox?: boolean;
        labels?: boolean;
        smooth?: boolean;
        area?: boolean;
        stack?: boolean;
        orientation?: OrientationType;
        piecewise?: boolean;
    };
    xAxis: Axis[];
    yAxis: Axis[];
    zAxis?: Axis[];
}

declare class Chart<T extends ChartType> {
    private chartType;
    private style;
    private dimensions;
    private metrics;
    constructor(chartType: T);
    static load<T extends ChartType>(opts: ChartOptions<T>): Chart<T>;
    static fromLegacy<T extends ChartType>(opts: LegacyOptions<T>): Chart<"bar"> | Chart<"line"> | Chart<"pie"> | Chart<"scatter"> | Chart<"heatmap"> | Chart<"calendar">;
    static defaultStyleOptions(chartType: ChartType): StyleOptions<typeof chartType>;
    convertTo(to: ChartType): Chart<"bar"> | Chart<"line"> | Chart<"pie"> | Chart<"scatter"> | Chart<"heatmap"> | Chart<"calendar">;
    private toBarChart;
    private toLineChart;
    private toPieChart;
    private toScatter;
    private toHeatmap;
    private toCalendar;
    private assertIsValid;
    compile(title: string, data: RowOriented): ECOption;
    canAddDimension(): boolean;
    canAddMetric(): boolean;
    canAddAxis(): boolean;
    getGroupByDimension(): Dimension<T> | undefined;
    getBreakdownDimension(): Dimension<T> | undefined;
    getOptions(): ChartOptions<T>;
    getChartType(): ChartType;
    isCartesian(): boolean;
    getStyleShowTitle(): boolean;
    getStyleShowToolbox(): boolean;
    getStyleShowLegend(): boolean;
    getStyleOrientation(): OrientationType | undefined;
    getStyleBarStyle(): BarStyleType | undefined;
    getStyleLineStyle(): LineStyleType | undefined;
    getStyleColorGrouping(): ColorGroupingType | undefined;
    setStyleOption(k: keyof StyleOptions<T>, v: StyleOptions<T>[typeof k]): Chart<T>;
    addDimension(dim: Dimension<T>): Chart<T>;
    getDimensions(): Dimension<T>[];
    getDimension(where: Predicate<Dimension<T>>): Dimension<T> | undefined;
    setDimension(where: Predicate<Dimension<T>>, v: Dimension<T>): Chart<T>;
    deleteDimension(where: Predicate<Dimension<T>>): Chart<T>;
    addMetric(metric: Metric<T>): Chart<T>;
    getMetrics(): Metric<T>[];
    getMetric(where: Predicate<Metric<T>>): Metric<T> | undefined;
    setMetric(where: Predicate<Metric<T>>, v: Metric<T>): Chart<T>;
    deleteMetric(where: Predicate<Metric<T>>): Chart<T>;
}

type ColumnOptions = {
    index: number;
    dataType: string;
};

declare function create<T extends ChartType>(type: T): Chart<T>;
declare function load<T extends ChartType>(opts: ChartOptions<T> | LegacyOptions<T>): Chart<"bar"> | Chart<"line"> | Chart<"pie"> | Chart<"scatter"> | Chart<"heatmap"> | Chart<"calendar"> | Chart<T>;
declare function chartGenerator(columns: ColumnOptions[], subsets: boolean): Generator<Chart<ChartType>, void, unknown>;

declare const chartlib_chartGenerator: typeof chartGenerator;
declare const chartlib_create: typeof create;
declare const chartlib_load: typeof load;
declare namespace chartlib {
  export {
    chartlib_chartGenerator as chartGenerator,
    chartlib_create as create,
    chartlib_load as load,
  };
}

declare class CompileChartError extends Error {
    constructor(message: string);
}
declare class InvalidChartError extends Error {
    constructor(message: string);
}

export { AggregationType, AxisType, BarStyleType, ChartOptions, ChartType, ColorGroupingType, CompileChartError, DataType, Dimension, InvalidChartError, LineStyleType, Metric, Option, OrientationType, Predicate, RowOriented, StyleOptions, color, chartlib as default, index as echarts };
