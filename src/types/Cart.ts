import type { ProductInfo } from './ProductInfo';

export interface CartItem {
  id: ProductInfo['id'];
  count: number;
}
