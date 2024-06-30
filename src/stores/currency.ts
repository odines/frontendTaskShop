import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getRandomCurrency } from '@/utils/currency';

const DEFAULT_CURRENCY_RATE = 60;

export const useCurrencyStore = defineStore('currency', () => {
  const currentCurrency = ref<number>(DEFAULT_CURRENCY_RATE);

  const updateCurrency = () => {
    currentCurrency.value = getRandomCurrency();
  };

  return {
    currentCurrency,
    updateCurrency,
  };
});
