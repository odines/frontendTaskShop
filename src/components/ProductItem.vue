<template>
  <button :class="$style.container" @click="handleProductClick">
    <div :class="$style.productName">{{ `${product.displayName} (${currentCount})` }}</div>
    <div :class="$style.price">{{ priceInRub }}</div>
  </button>
</template>

<script setup lang="ts">
import type { ProductInfo } from '@/types';
import { computed } from 'vue';
import { getFormattedPrice } from '@/utils.ts/price';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';

type Props = { product: ProductInfo };

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);

const props = defineProps<Props>();

const currentCount = computed<number>(() => {
  const cartItem = cartItems.value.find((item) => item.id === props.product.id);

  if (cartItem === undefined) {
    return props.product.count;
  }

  return props.product.count - cartItem.count;
});

const isDisabled = computed(() => currentCount.value <= 0);

const handleProductClick = () => {
  if (isDisabled.value) {
    return;
  }

  cartStore.addToCart(props.product.id, 1);
};

const priceInRub = computed<string>(() => {
  return getFormattedPrice(props.product.localPrice);
});
</script>

<style module lang="scss">
.container {
  padding: 10px;
  display: flex;
  background-color: white;
  text-align: left;
  border: 1px solid #ddd;
  border-radius: 8px;
  column-gap: 10px;
  align-self: flex-start;
  justify-content: space-between;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 0 14px #00000008, 0 20px 40px #0000000d;
  }
}

.price {
  white-space: nowrap;
}
</style>
