import Axis from "./axis";
import DataSet from "./dataset";
import Grid from "./grid";
import Legend from "./legend";
import Series from "./series";
import Title from "./title";
import ToolBox from "./toolbox";
import ToolTip from "./tooltip";

export { Axis, DataSet, Grid, Legend, Series, Title, ToolBox, ToolTip };

export interface ECOption {
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
