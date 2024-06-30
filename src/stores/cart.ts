import { defineStore, storeToRefs } from 'pinia';
import { ref, computed } from 'vue';

import type { CartItem } from '@/types';
import { useCatalogStore } from './catalog';

export const useCartStore = defineStore('cart', () => {
  const catalogStore = useCatalogStore();
  const { productsList } = storeToRefs(catalogStore);

  /**
   * array of products ids with quantity
   */
  const cartItems = ref<CartItem[]>([]);

  /**
   * Calculates the cart total
   */
  const cartTotal = computed(() => {
    return cartItems.value.reduce((result, cartItem) => {
      const price = productsList.value.find((productInfo) => productInfo.id === cartItem.id)?.localPrice || 0;

      return result + price * cartItem.count;
    }, 0);
  });

  const addToCart = (id: CartItem['id'], count: CartItem['count']) => {
    const indexOfCartItem = cartItems.value.findIndex((item) => item.id === id);

    if (indexOfCartItem === -1) {
      cartItems.value.push({ id, count });
      return;
    }

    cartItems.value[indexOfCartItem].count += count;
  };

  const removeProduct = (id: CartItem['id']) => {
    const productIndex = cartItems.value.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      return;
    }

    cartItems.value.splice(productIndex, 1);
  };

  return {
    cartItems,
    cartTotal,

    addToCart,
    removeProduct,
  };
});
