export interface Category {
  _id: string;
  name: string;
  description?: string;
  isDeleted: boolean;
  products: string[]; 
  createdAt: string;
  updatedAt: string;
}
