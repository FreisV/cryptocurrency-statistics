export const reduceNumber = (num: number) => Math.round(num * 100) / 100;

export const reduceMoney = (num: number) => {
  if (num >= 1000000000) {
    return Math.round(num / 10000000) / 100 + "b";
  } else if (num >= 1000000) {
    return Math.round(num / 10000) / 100 + "m";
  } else {
    return reduceNumber(num).toLocaleString().replace(',', '.').replace(/\s/g,',');
  }
};
