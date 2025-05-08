import { HeatmapGradientType } from "../types";
import { COLOR_PALETTE } from "./palette";

// Define the heatmap color gradients that will be exported to the frontend
export const HEATMAP_GRADIENTS = {
  default: COLOR_PALETTE,
  red: ["#ffefba", "#ffce87", "#ff9770", "#d63447"], // Heat (Yellow-Red)
  blue: ["#ffffff", "#caf0f8", "#90e0ef", "#0077b6"], // Cool (White-Blue)
  purple: ["#3498db", "#8e44ad", "#c0392b"], // Diverging (Blue-Purple-Red)
  monochrome: ["#f8f9fa", "#e9ecef", "#adb5bd", "#343a40"], // Monochrome (Light-Dark)
};

// Define gradient options for the frontend UI
export const HEATMAP_GRADIENT_OPTIONS = [
  { value: "default", label: "Default (Dynamic)" },
  { value: "red", label: "Heat (Yellow-Red)" },
  { value: "blue", label: "Cool (White-Blue)" },
  { value: "purple", label: "Diverging (Blue-Purple-Red)" },
  { value: "monochrome", label: "Monochrome (Light-Dark)" },
] as const;

// Helper function to get CSS gradient string from gradient type
export function getGradientBackground(
  gradientType: HeatmapGradientType | undefined
): string {
  // Use default if gradientType is undefined or invalid
  const type =
    gradientType && gradientType in HEATMAP_GRADIENTS
      ? gradientType
      : "default";

  const colors = HEATMAP_GRADIENTS[type];
  return `linear-gradient(to right, ${colors.join(", ")})`;
}
