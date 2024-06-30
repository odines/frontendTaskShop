<template>
  <div :class="$style.container">USD/RUB: {{ currentCurrency }} ₽</div>
</template>

<script setup lang="ts">
import { useCurrencyStore } from '@/stores/currency';
import { storeToRefs } from 'pinia';

const currencyStore = useCurrencyStore();
const { currentCurrency } = storeToRefs(currencyStore);
</script>

<style module lang="scss">
.container {
  padding: 20px 0;
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
