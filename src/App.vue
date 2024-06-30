<script setup lang="ts">
import { useCatalogStore } from './stores/catalog';
import ProductCatalog from './components/ProductCatalog.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import CurrencyInfo from './components/CurrencyInfo.vue';
import { useCurrencyStore } from './stores/currency';
import { onBeforeUnmount } from 'vue';

const catalogStore = useCatalogStore();
const currencyStore = useCurrencyStore();

// initial load with default currency rate
catalogStore.loadProducts();

// update currency and reload products
const interval = setInterval(() => {
  catalogStore.loadProducts();
  currencyStore.updateCurrency();
}, 15 * 1000);

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<template>
  <div :class="$style.container">
    <CurrencyInfo />
    <ProductCatalog />
    <ShoppingCart />
  </div>
</template>

<style module lang="scss">
.container {
  padding: 20px;
}
</style>
