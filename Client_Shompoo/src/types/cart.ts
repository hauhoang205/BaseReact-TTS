import type { Product } from "./product";
import type { IProductVariant } from "./variant";

export interface ICartItem {
  product_id: string | Product;
  variant_id: string | IProductVariant | null;
  quantity: number;
  subtotal: number;
}

export interface ICart {
  _id?: string;
  user_id: string; // hoặc IUser nếu bạn populate
  items: ICartItem[];
  createdAt?: Date;
  updatedAt?: Date;
}
