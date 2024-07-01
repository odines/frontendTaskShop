import { getNames, getProducts } from '@/services/ProductsService';
import { defineStore, storeToRefs } from 'pinia';
import { useCurrencyStore } from './currency';
import { ProductInfo } from '@/types';
import { ref, computed, watch } from 'vue';

type ProductsByCategoryMap = Map<ProductInfo['categoryName'], ProductInfo[]>;

export const useCatalogStore = defineStore('catalog', () => {
  const currencyStore = useCurrencyStore();
  const { currentCurrency } = storeToRefs(currencyStore);

  const productsList = ref<ProductInfo[]>([]);
  const productIdToPreviousPricesMap = ref<Map<ProductInfo['id'], ProductInfo['price']>>();

  /**
   * Loads raw products and populates productsList array with formatted products
   */
  const loadProducts = () => {
    const rawProducts = getProducts();
    const rawProductNames = getNames();
    const formattedProducts: ProductInfo[] = [];

    rawProducts.forEach((productItem) => {
      const { G: groupId, T: productId, C: price, P: count, G: categoryId } = productItem;
      const displayName = rawProductNames[groupId].B[productId].N;
      const localPrice = price * currentCurrency.value;
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

      formattedProducts.push(product);
    });

    productsList.value = formattedProducts;
  };

  /**
   * Returns products grouped by category name
   */
  const productsByCategoriesMap = computed<ProductsByCategoryMap>(() => {
    return productsList.value.reduce((map, product) => {
      const key = product.categoryName;
      map.get(key)?.push(product) ?? map.set(key, [product]);

      return map;
    }, new Map());
  });

  /**
   * Watching for currency change and updating product prices
   */
  watch(currentCurrency, (currencyRate) => {
    productsList.value.forEach((product, index) => {
      // get random price
      const updatedPrice = parseFloat(((product.price + 1) * Math.random()).toFixed(2));
      const updatedLocalPrice = updatedPrice * currencyRate;

      productsList.value[index] = { ...productsList.value[index], price: updatedPrice, localPrice: updatedLocalPrice };
    });
  });

  return {
    loadProducts,
    productsByCategoriesMap,
    productsList,
    productIdToPreviousPricesMap,
  };
});
