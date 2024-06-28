import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getRandomCurrency } from '@/utils.ts/currency';

export const useCurrencyStore = defineStore('currency', () => {
  const currentCurrency = ref<number>(getRandomCurrency());

  const updateCurrency = () => {
    currentCurrency.value = getRandomCurrency();
  };

  return {
    currentCurrency,
    updateCurrency,
  };
});
