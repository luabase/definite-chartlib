export default interface VisualMap {
  min: number;
  max: number;
  type: string;
  calculable: boolean;
  left: string;
  top: string;
  inRange: {
    color: string[];
  };
}
