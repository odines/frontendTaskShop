import { defineStore } from 'pinia';
import { ref } from 'vue';

const MIN_CURRENCY_RATE = 20;
const MAX_CURRENCY_RATE = 80;

const getRandomCurrency = () => {
  return Math.floor(Math.random() * (MAX_CURRENCY_RATE - MIN_CURRENCY_RATE + 1)) + MIN_CURRENCY_RATE;
};

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
