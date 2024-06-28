import { getNames, getProducts } from '@/services/ProductsService';
import { defineStore } from 'pinia';
import { useCurrencyStore } from './currency';
import { ProductInfo } from '@/types';
import { ref, computed } from 'vue';

type ProductsByCategoryMap = Map<ProductInfo['categoryName'], ProductInfo[]>;

export const useCatalogStore = defineStore('catalog', () => {
  const currencyStore = useCurrencyStore();

  const productsList = ref<ProductInfo[]>([]);

  const loadProducts = () => {
    const products = getProducts();
    const rawProductNames = getNames();

    products.forEach((productItem) => {
      const { G: groupId, T: productId, C: price, P: count, G: categoryId } = productItem;
      const displayName = rawProductNames[groupId].B[productId].N;
      const localPrice = price * currencyStore.currentCurrency;
      const categoryName = rawProductNames[categoryId].G;

      const product = {
        id: productId,
        displayName,
        price,
        localPrice,
        count,
        categoryId,
        categoryName,
      };

      productsList.value.push(product);
    });
  };

  const productsByCategoriesMap = computed<ProductsByCategoryMap>(() => {
    return productsList.value.reduce((map, value) => {
      const key = value.categoryName;
      map.get(key)?.push(value) ?? map.set(key, [value]);

      return map;
    }, new Map());
  });

  return {
    loadProducts,
    productsByCategoriesMap,
  };
});
