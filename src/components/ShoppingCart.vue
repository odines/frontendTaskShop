<template>
  <div :class="$style.container">
    <h2 :class="$style.title">Корзина</h2>
    <div :class="$style.notification" v-if="cartItems.length === 0">
      <span :class="$style.text">В корзине нет товаров</span>
    </div>
    <template v-else>
      <div :class="$style.cartContainer">
        <CartItem v-for="(cartItem, index) in cartItems" :key="cartItem.id" v-bind="{ ...cartItem, index }" />
      </div>
      <div :class="$style.total">{{ cartTotalFormatted }}</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import CartItem from './CartItem.vue';
import { getFormattedPrice } from '@/utils.ts/price';
import { computed } from 'vue';

const cartStore = useCartStore();

const { cartItems, cartTotal } = storeToRefs(cartStore);

const cartTotalFormatted = computed(() => `Сумма заказа: ${getFormattedPrice(cartTotal.value)}`);
</script>

<style module lang="scss">
.title {
  font-weight: 600;
  font-size: 1.5rem;
}

.notification {
  background: #fbf3e0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px;
  border-radius: 16px;

  @include display-after(sm) {
    align-items: center;
    padding: 10px 20px;
  }
}

.cartContainer {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.total {
  margin-top: 20px;
  text-align: right;
  font-weight: 600;
  font-size: 1.2rem;
}
</style>
