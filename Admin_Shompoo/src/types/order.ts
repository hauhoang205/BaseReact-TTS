export interface IOrderItem {
product_id: string | { _id: string; name: string };
  variant_id?: string | IProductVariant | null;
  quantity: number;
  price: number;
  total_amount?: number;
}


export interface IProductVariant {
  _id: string;
  product_id: string; 
  image: string;
  images: string[];
  size?: string;
  fragrance?: string;
  hair_type?: string;
  stock_quantity: number;
  price?: number;
  discount_price?: number;
  variant_status: boolean;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IShippingAddress {
  address: string;
  city?: string;
  country?: string;
   phone: String,
}

export type PaymentMethod = "vnpay" | "cash_on_delivery";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded" | "canceled";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

  export interface IUserShort {
  _id: string;
  fullname: string;
  email: string;
}

export interface IOrder {
  _id: string;
  user_id: string | { _id: string; fullname: string; email: string };
  coupon_id?: string | { code: string; discount: number };
  items: IOrderItem[];
  payment_method: "vnpay" | "cash_on_delivery";
  payment_status: string;
  order_status: string;
  invoice_number?: string;
  total_amount: number;
  final_amount: number;
  discount_amount?: number;
  shipping_address?: {
    name?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
  };
  vnp_url?: string;
  vnp_expire_at?: string | Date;
  createdAt?: string | Date;
}

