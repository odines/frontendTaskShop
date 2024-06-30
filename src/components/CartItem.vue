<template>
  <div :class="$style.container" v-if="currentProductInfo">
    <div>{{ currentProductInfo.displayName }}</div>
    <div :class="$style.countContainer">
      <button :class="$style.button" :disabled="count === 1" @click="setProductCount(count - 1)">-</button>
      <span>{{ count }}</span>
      <button :disabled="count === currentProductInfo.count" :class="$style.button" @click="setProductCount(count + 1)">
        +
      </button>
    </div>
    <div :class="$style.price">{{ formattedPrice }}</div>
    <div @click="removeProduct" :class="$style.remove">X</div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { useCatalogStore } from '@/stores/catalog';
import type { CartItem } from '@/types';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { getFormattedPrice } from '@/utils/price';

type Props = CartItem & { index: number };
const props = defineProps<Props>();

const catalogStore = useCatalogStore();
const { productsList } = storeToRefs(catalogStore);

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);

const currentProductInfo = computed(() => {
  const product = productsList.value.find((item) => item.id === props.id);

  if (!product) {
    return;
  }

  return product;
});

const formattedPrice = computed(() =>
  currentProductInfo.value ? `${getFormattedPrice(currentProductInfo.value?.localPrice)}/шт.` : '',
);

const removeProduct = () => {
  cartStore.removeProduct(props.id);
};

const setProductCount = (count: number) => {
  cartItems.value[props.index].count = count;
};
</script>

<style module lang="scss">
.container {
  background-color: white;
  padding: 20px 15px;
  display: grid;
  gap: 20px;
  grid-template-columns: 2fr 1fr 1fr 20px;
  align-items: center;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border: none;
  }
}

.remove {
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.button {
  padding: 5px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  color: black;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: not-allowed;
  }
}

.countContainer {
  display: flex;
  column-gap: 5px;
  align-items: center;
}

.price {
  font-weight: 600;
}
</style>
