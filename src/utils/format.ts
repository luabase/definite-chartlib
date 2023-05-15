export const longValues = (value: string): string => {
  return value.length > 15
    ? value.slice(0, 11) + "..." + value.slice(-4)
    : value;
};
