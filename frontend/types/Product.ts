import { Filter } from "./Filter";

export enum ProductCategory {
  T_SHIRTS = 't-shirts',
  MUGS = 'mugs',
}

export enum ProductSort {
  NEWS = 'news',
  PRICE_DESC = 'price_desc',
  PRICE_ASC = 'price_asc',
  MOST_SALES = 'most_sales',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: ProductCategory;
  price_in_cents: number;
  sales: number;
  created_at?: string;
}

export interface ProductFilter extends Filter<Product> {
  q?: string;
}
