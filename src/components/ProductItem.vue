<template>
  <div :class="$style.container">
    <div :class="$style.productName">{{ `${product.displayName} (${product.count})` }}</div>
    <div :class="$style.price">{{ priceInRub }}</div>
  </div>
</template>

<script setup lang="ts">
import type { ProductInfo } from '@/types';
import { computed, watch } from 'vue';

type Props = { product: ProductInfo };

const props = defineProps<Props>();

const priceInRub = computed<string>(() => {
  return `${props.product.localPrice.toFixed(2)} ₽`;
});

watch(
  () => props.product.price,
  (prevValue, currentValue) => {
    console.log('PRICE CHANGED!!!!!!', prevValue, currentValue);
  },
);
</script>

<style module lang="scss">
.container {
  padding: 10px;
  display: flex;
  border: 1px solid black;
  column-gap: 10px;
  align-self: flex-start;
  justify-content: space-between;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
}

.price {
  white-space: nowrap;
}
</style>
