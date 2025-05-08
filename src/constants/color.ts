export const DS_TEXT_COLORS = {
  light: {
    primary: "#292929",
    secondary: "#3D3D3D",
    tertiary: "#7A7A7A",
  },
  dark: {
    primary: "#F5F5F5",
    secondary: "#B8B8B8",
    tertiary: "#7A7A7A",
  },
};

export const DS_BORDER_COLORS = {
  light: {
    primary: "#E0E0E0", // var(--color_border--primary)
    secondary: "#E0E0E0", // var(--color_border--secondary)
    tertiary: "#EBEBEB", // var(--color_border--tertiary)
    inverted: "#292929", // var(--color_border--inverted)
  },
  dark: {
    primary: "#3D3D3D", // var(--color_border--primary)
    secondary: "#292929", // var(--color_border--secondary)
    tertiary: "#1F1F1F", // var(--color_border--tertiary)
    inverted: "#292929", // var(--color_border--inverted)
  },
};

export const DS_SURFACE_PLATFORM_COLORS = {
  light: {
    nested: "#F5F5F5",
    background: "#FAFAFA",
    panel: "#FFFFFF",
    page: "#F5F5F5",
    card: "#FFFFFF",
    inverted: "#1F1F1F",
    translucent: "rgba(255,255,255,0.9)",
  },
  dark: {
    nested: "#0A0A0A",
    background: "#0F0F0F",
    panel: "#141414",
    page: "#1F1F1F",
    card: "#141414",
    inverted: "#1F1F1F",
    translucent: "rgba(26,26,26,0.9)",
  },
};

// other
export const TEAL = "#003f5c";
export const DARK_BLUE = "#2f4b7c";
export const DARK_PURPLE = "#665191";
export const PURPLE = "#a05195";
export const PINK = "#d45087";
export const LIGHT_PINK = "#f95d6a";
export const ORANGE = "#ff7c43";
export const YELLOW = "#ffa600";

// Make sure to export the gradients
export {
  HEATMAP_GRADIENTS,
  HEATMAP_GRADIENT_OPTIONS,
  getGradientBackground,
} from "./gradients";

export { COLOR_PALETTE, COLOR_PALETTE_30, COLOR_PALETTE_40 } from "./palette";
