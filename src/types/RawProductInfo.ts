export interface RawProduct {
    B: boolean;
    C: number; // цена в долларах(USD)
    CV: null;
    G: number; // id группы
    P: number; // сколько единиц товара осталось
    Pl: null;
    T: number; // id товара
  }
  
  export interface RawProductName {
    N: string; // название товара
    T: number | string;
  }
  
  export interface RawProductGroup {
    G: string; // название группы
    B: Record<string, RawProductName>;
    C?: number;
  }
  
  export type RawProductsGroupMap = Record<string, RawProductGroup>;
  