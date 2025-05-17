export interface Product {
  _id: string;
  images?: string[];
  name: string;
  origin?: string;
  discount_price: number;
  price: number;
  description?: string;
  categoryId?: string;
  stock?: number;
  sizes?: string[];
  createdAt?: string;
  updatedAt?: string;
}
