import { IShowable } from "./abstract";

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

export default interface ToolBox extends IShowable {
  feature?: Feature;
}
