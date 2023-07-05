export function unboundedReadItem<T>(arr: Array<T>, i: number): T {
  return arr[i % arr.length];
}

export function sum<T>(arr: Array<T>): number {
  return arr.reduce((acc: number, curr: T) => acc + Number(curr), 0);
}
