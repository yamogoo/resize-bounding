export const px2rem = (px: number, rem = 16): number => {
  const base = rem === 0 ? 1 : rem;
  return px / base;
};
