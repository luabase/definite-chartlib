import { color } from "../constants";

export function asArray(s: string | string[], theme: string): string[] {
  return Array.isArray(s)
    ? s
    : theme === "light"
    ? color.LIME_PALETTE_DARKER
    : color.LIME_PALETTE;
}

export function asSingleton(s: string | string[]): string {
  return Array.isArray(s) ? s[0] : s;
}
