export interface ProductsInfoGroup {
  id: number;
  name: string;
  products: ProductInfo[];
}

export interface ProductInfo {
  id: number;
  displayName: string;
  count: number;
  price: number;
  localPrice: number;
  categoryId: number;
  categoryName: string;
}
