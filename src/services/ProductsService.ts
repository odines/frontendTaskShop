import productsData from '@/data/data.json';
import namesData from '@/data/names.json';
import type { RawProduct, RawProductsGroupMap } from '@/types';

export const getProducts = (): RawProduct[] => {
  return productsData.Value.Goods;
};

export const getNames = (): RawProductsGroupMap => {
  return namesData;
};
