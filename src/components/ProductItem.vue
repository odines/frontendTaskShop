<template>
  <button
    type="button"
    title="Добавить в корзину"
    :disabled="currentCount === 0"
    :class="[
      $style.container,
      {
        [$style.container_red]: product.price > previousPrice,
        [$style.container_green]: product.price < previousPrice,
      },
    ]"
    @click="handleProductClick"
  >
    <div :class="$style.productName">{{ `${product.displayName} (${currentCount})` }}</div>
    <div :class="$style.price">{{ priceInRub }}</div>
  </button>
</template>

<script setup lang="ts">
import type { ProductInfo } from '@/types';
import { computed, watch, ref } from 'vue';
import { getFormattedPrice } from '@/utils/price';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';

type Props = { product: ProductInfo };
const props = defineProps<Props>();

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);

const previousPrice = ref<ProductInfo['price']>(props.product.price);

/**
 * Current count of products in stock
 */
const currentCount = computed<number>(() => {
  const cartItem = cartItems.value.find((item) => item.id === props.product.id);

  if (cartItem === undefined) {
    return props.product.count;
  }

  return props.product.count - cartItem.count;
});

const isDisabled = computed(() => currentCount.value <= 0);

const priceInRub = computed<string>(() => {
  return getFormattedPrice(props.product.localPrice);
});

const handleProductClick = () => {
  if (isDisabled.value) {
    return;
  }

  cartStore.addToCart(props.product.id, 1);
};

/**
 * Watching for price change and set previousPrice ref (this is needed for highlighting the cell in green/red color)
 */
watch(
  () => props.product.price,
  (_newValue, previous) => {
    previousPrice.value = previous;
  },
);
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
  justify-content: space-between;
  transition: background-color 0.2s ease;
  cursor: pointer;
  align-items: center;
  color: black;

  &:hover#{&}:not(:disabled) {
    background-color: #f0f0f0;
    box-shadow: 0 0 14px #00000008, 0 20px 40px #0000000d;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &_red {
    background-color: #c9454d;
  }

  &_green {
    background-color: #30cf60;
  }
}

.price {
  white-space: nowrap;
  font-weight: 600;
}
</style>
