import Axis from "./axis";
import DataSet from "./dataset";
import Grid from "./grid";
import Legend from "./legend";
import Series from "./series";
import Title from "./title";
import ToolBox from "./toolbox";
import ToolTip from "./tooltip";
import VisualMap from "./visualMap";

export {
  Axis,
  DataSet,
  Grid,
  Legend,
  Series,
  Title,
  ToolBox,
  ToolTip,
  VisualMap,
};

export interface ECOption {
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
  xAxis: Axis[];
  yAxis: Axis[];
}
