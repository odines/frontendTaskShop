import { defineStore, storeToRefs } from 'pinia';
import { ref, computed } from 'vue';

import type { CartItem } from '@/types';
import { useCatalogStore } from './catalog';

export const useCartStore = defineStore('cart', () => {
  const catalogStore = useCatalogStore();
  const { productsList } = storeToRefs(catalogStore);

  const cartItems = ref<CartItem[]>([]);

  const addToCart = (id: CartItem['id'], count: CartItem['count']) => {
    const indexOfCartItem = cartItems.value.findIndex((item) => item.id === id);

    if (indexOfCartItem === -1) {
      cartItems.value.push({ id, count });
      return;
    }

    cartItems.value[indexOfCartItem].count += count;
  };

  const cartTotal = computed(() => {
    return cartItems.value.reduce((result, currentCartItem) => {
      const price = productsList.value.find((productItem) => productItem.id === currentCartItem.id)?.localPrice || 0;

      return result + price * currentCartItem.count;
    }, 0);
  });

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
