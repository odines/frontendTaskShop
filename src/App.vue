<script setup lang="ts">
import { useCatalogStore } from './stores/catalog';
import ProductCatalog from './components/ProductCatalog.vue';
import ShoppingCart from './components/ShoppingCart.vue';

const catalogStore = useCatalogStore();

catalogStore.loadProducts();
</script>

<template>
  <div :class="$style.container">
    <ProductCatalog />
    <ShoppingCart />
  </div>
</template>

<style module lang="scss">
.container {
  padding: 50px;
}
</style>
