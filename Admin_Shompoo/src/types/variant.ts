export interface Variant {
  _id?: string;
  sku: string;
  price: number;
  stock: number;
  color?: string;
  size?: string;
  image?: string;
  images?: string[];         // nếu dùng nhiều ảnh
  active?: boolean;
  product_id: {
    _id: string;
    name: string;
   
  };
  createdAt?: string;
  updatedAt?: string;
}
