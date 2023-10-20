export const addZeroIfNumberIsBelowTen = (num: number): string =>
  (num < 10 ? "0" : "") + num.toString();
