export function unboundedReadItem<T>(arr: Array<T>, i: number): T {
  return arr[i % arr.length];
}

export function sum<T>(arr: Array<T>): number {
  return arr.reduce((acc: number, curr: T) => acc + Number(curr), 0);
}

export function allCombinations<T>(
  arr: Array<T>,
  length: number = 1
): Array<Array<T>> {
  if (length < 1) throw new Error("Length must be at least 1");
  const subsets = [];
  for (let i = 0; i < arr.length - length + 1; i++) {
    const subset = arr.slice(i, i + length);
    subsets.push(subset);
  }
  return subsets;
}

export function removeDuplicates<T>(arr: Array<T>): Array<T> {
  return Array.from(new Set(arr));
}
