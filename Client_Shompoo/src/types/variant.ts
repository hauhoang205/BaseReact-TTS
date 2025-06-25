import type { Product } from "./product";

export interface IProductVariant {
  _id: string;
  product_id: string | Product;

  size?: string;
  fragrance?: string;
  hair_type?: string;

  color: string;
  sku: string;

  image: string;         
  images?: string[];     

  price: number;
  discount_price: number;

  stock_quantity: number;

  is_available: boolean; 
  isDeleted: boolean;

  created_at: string;
  updated_at: string;
}
