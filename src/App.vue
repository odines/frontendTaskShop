<script setup lang="ts">
import { useCatalogStore } from './stores/catalog';
import ProductCatalog from './components/ProductCatalog.vue';

const catalogStore = useCatalogStore();

catalogStore.loadProducts();
</script>

<template>
  <ProductCatalog />
</template>
