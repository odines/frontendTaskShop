import productsData from '@/data/data.json';
import namesData from '@/data/names.json';
import type { RawProduct, RawProductsGroupMap } from '@/types';

/**
 * Gets product from json
 * @returns RawProduct[]
 */
export const getProducts = (): RawProduct[] => {
  return productsData.Value.Goods;
};

/**
 * Gets product names from json
 * @returns RawProductsGroupMap
 */
export const getNames = (): RawProductsGroupMap => {
  return namesData;
};
