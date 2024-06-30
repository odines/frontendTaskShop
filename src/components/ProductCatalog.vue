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
  display: grid;
  gap: 20px;

  @include display-after(sm) {
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
  }
}

.categoryContainer {
  display: grid;
  gap: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}

.categoryName {
  font-size: 1.3rem;
  font-weight: 600;
  align-self: center;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  background-color: #f5f5f5;
}

.productsContainer {
  display: grid;
  gap: 5px;
  padding: 5px;

  @include display-after(sm) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
