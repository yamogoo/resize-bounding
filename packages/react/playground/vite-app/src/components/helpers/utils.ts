export const strToNum = (value: string): number => {
  const int = parseInt(value, 10);
  if (Number.isNaN(int)) return 0;
  return int;
};
