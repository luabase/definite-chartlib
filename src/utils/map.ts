export function getKeyByValue<K, V>(m: Map<K, V>, v: V): K | undefined {
  for (let [key, value] of m.entries()) {
    if (value === v) return key;
  }
  return undefined;
}
