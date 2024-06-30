export interface RawProduct {
  B: boolean;
  C: number; // price(USD)
  CV: null;
  G: number; // group id
  P: number; // quantity in stock
  Pl: null;
  T: number; // product id
}

export interface RawProductName {
  N: string; // product name
  T: number | string;
}

export interface RawProductGroup {
  G: string; // product group name
  B: Record<string, RawProductName>;
  C?: number;
}

export type RawProductsGroupMap = Record<string, RawProductGroup>;
