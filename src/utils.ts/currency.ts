const MIN_CURRENCY_RATE = 20;
const MAX_CURRENCY_RATE = 80;

export const getRandomCurrency = () => {
  return Math.floor(Math.random() * (MAX_CURRENCY_RATE - MIN_CURRENCY_RATE + 1)) + MIN_CURRENCY_RATE;
};
