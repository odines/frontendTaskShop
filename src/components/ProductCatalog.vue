<template>
  <div :class="$style.container">
    <div
      :class="$style.categoryContainer"
      v-for="[categoryName, products] in productsByCategoriesMap"
      :key="categoryName"
    >
      <div :class="$style.categoryName">{{ categoryName }}</div>
      <div :class="$style.productsContainer">
        <ProductItem v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCatalogStore } from '@/stores/catalog';
import ProductItem from './ProductItem.vue';
import { storeToRefs } from 'pinia';

const catalogStore = useCatalogStore();
const { productsByCategoriesMap } = storeToRefs(catalogStore);
</script>

<style module lang="scss">
.container {
  padding: 20px;
  display: grid;
  row-gap: 24px;
  align-self: flex-start;

  @include display-after(sm) {
    row-gap: 40px;
  }
}

.categoryContainer {
  display: grid;
  row-gap: 16px;

  @include display-after(sm) {
    grid-template-columns: 20% 1fr;
    column-gap: 30px;
  }
}

.categoryName {
  font-size: 24px;
  font-weight: 600;
}

.productsContainer {
  display: grid;
  row-gap: 20px;

  @include display-after(sm) {
    grid-template-columns: 1fr 1fr;
    column-gap: 30px;
  }
}
</style>
