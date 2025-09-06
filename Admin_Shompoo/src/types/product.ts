export interface Product {
  _id: string;
 category_id: string;
  name: string;
  origin: string;
  description: string;
  images: string[];
  size: string;
  fragrance: string;
  hair_type: string;
  stock_quantity: number;
  price: number;
  discount_price: number;
  createdAt: string;
  updatedAt: string;
}