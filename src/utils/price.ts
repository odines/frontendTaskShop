/**
 * Gets formatted price
 * @param price
 */
export const getFormattedPrice = (price: number): string => {
  return `${price.toFixed(2)} ₽`;
};
