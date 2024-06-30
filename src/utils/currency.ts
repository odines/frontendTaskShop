const MIN_CURRENCY_RATE = 20;
const MAX_CURRENCY_RATE = 80;

/**
 * Gets random currency
 */
export const getRandomCurrency = (): number => {
  return Math.floor(Math.random() * (MAX_CURRENCY_RATE - MIN_CURRENCY_RATE + 1)) + MIN_CURRENCY_RATE;
};
