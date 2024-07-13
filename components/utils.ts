export const roundTo2 = (x: number) => {
  return Math.round((x + Number.EPSILON) * 100) / 100;
};
