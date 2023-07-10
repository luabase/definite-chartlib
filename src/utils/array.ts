export function unboundedReadItem<T>(arr: Array<T>, i: number): T {
  return arr[i % arr.length];
}

export function sum<T>(arr: Array<T>): number {
  return arr.reduce((acc: number, curr: T) => acc + Number(curr), 0);
}

export function getAllSubsets<T>(arr: T[], n: number = 1): Array<Array<T>> {
  const subsets: Array<Array<T>> = [[]];
  arr.forEach((item) => {
    const last = subsets.length - 1;
    for (let i = 0; i <= last; i++) {
      subsets.push([...subsets[i], item]);
    }
  });
  return subsets
    .sort((a, b) => a.length - b.length)
    .filter((subset) => subset.length >= n);
}

export function removeDuplicates<T>(arr: Array<T>): Array<T> {
  return Array.from(new Set(arr));
}
