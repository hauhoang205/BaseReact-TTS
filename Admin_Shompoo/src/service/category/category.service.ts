import axios from "axios";
import type { Category } from "types/category";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const res = await axios.get(`${API_URL}/categories`);
    return res.data.data.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy danh mục:", error);
    throw new Error("Không thể lấy danh mục");
  }
};

