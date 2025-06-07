export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  isDeleted: boolean;
  products: string[]; // hoặc Product[] nếu bạn muốn populate dữ liệu sản phẩm
  createdAt: string;
  updatedAt: string;
}