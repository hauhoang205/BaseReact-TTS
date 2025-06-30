import axios from 'axios';
import type { Product } from 'types/product';
import type { ICategory } from 'types/category';

const API_URL = import.meta.env.VITE_API_URL;

export const getCategories = async (search?: string): Promise<ICategory[]> => {
  try {
    const url = `${API_URL}/client/categories`;
    const params = search ? { search } : {};
    const response = await axios.get(url, { params });
    console.log('👉 Response data (categories):', response.data);

    const categories = response.data.data?.data || response.data.data || [];
    if (!Array.isArray(categories)) {
      console.warn('Dữ liệu danh mục không phải mảng, trả về mảng rỗng:', categories);
      return [];
    }
    return categories;
  } catch (error: any) {
    console.error('❌ Error fetching categories:', error.message || error);
    return [];
  }
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/client/products/by-category/${categoryId}`);
    console.log('👉 Response data (products):', response.data);

    const products = response.data.data?.products || response.data.data || response.data || [];
    if (!Array.isArray(products)) {
      console.warn('Dữ liệu sản phẩm không phải mảng, trả về mảng rỗng:', products);
      return [];
    }
    return products;
  } catch (error: any) {
    console.error('❌ Error fetching products by category:', error.message || error);
    return [];
  }
};