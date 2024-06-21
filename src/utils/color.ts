import { color } from "../constants";

export function asArray(s: string | string[], theme: string): string[] {
  return Array.isArray(s) ? s : color.COLOR_PALETTE;
}

export function asSingleton(s: string | string[]): string {
  return Array.isArray(s) ? s[0] : s;
}
