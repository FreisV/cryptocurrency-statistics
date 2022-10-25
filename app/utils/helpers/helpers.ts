export const reduceNumber = (num: number, precision: number = 2) =>
  Math.round(num * 10 ** precision) / 10 ** precision;

const getPrecision = (num: number) => {
  let counter = 2;
  while (Math.round(num * 10 ** counter) === 0) {
    counter++;
  }

  return counter;
};

export const reduceMoney = (num: number) => {
  if (num === 0) {
    return 0;
  } else if (num >= 1000000000) {
    return Math.round(num / 10000000) / 100 + "b";
  } else if (num >= 1000000) {
    return Math.round(num / 10000) / 100 + "m";
  } else {
    const res = reduceNumber(num, getPrecision(num));
    if (res < 1) {
      return res;
    } else {
      return res.toLocaleString().replace(",", ".").replace(/\s/g, ",");
    }
  }
};
