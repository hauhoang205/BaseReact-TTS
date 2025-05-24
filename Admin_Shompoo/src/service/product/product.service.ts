import axios from "axios";
import type { Product } from "types/product";

const API_URL = import.meta.env.VITE_API_URL;

interface GetAllProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  isDeleted?: "true" | "false";
}

export const getAllProducts = async (params?: GetAllProductsParams) => {
  try {
    const res = await axios.get(`${API_URL}/products`, { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (productData: any) => {
  try {
    const res = await axios.post(`${API_URL}/products`, productData);
    return res.data; 
  } catch (error: any) {

    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Lỗi khi tạo sản phẩm');
    }
    throw error;
  }
};

export const deleteProductById = async(id: string)=>{
  try {
     const res = await axios.delete(`${API_URL}/products/${id}`);
     return res.data
  } catch (error) {
    console.log(error);
    
  }
}

export const getProductById = async(id:string)=>{
  try {
     const res = await axios.get(`${API_URL}/products/${id}`);
     return res.data
  } catch (error) {
    console.log(error);
    
  }
}

export const updateProduct = async (id: string, data: Partial<Product>) => {
  try {
    const res = await axios.put(`${API_URL}/products/${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDeletedProducts = async (page = 1, limit = 5) => {
  try {
    const res = await axios.get(`${API_URL}/products/deleted`, {
      params: { page, limit },
    });
    return res.data; // Trả về { data, pagination }
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm đã xóa mềm:", error);
    throw error;
  }
};

export const forceDeleteProduct = async (id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/products/forcedelete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa vĩnh viễn sản phẩm:", error);
    throw error;
  }
};

// Khôi phục sản phẩm đã xóa mềm theo id
export const restoreProduct = async (id: string) => {
  try {
    const res = await axios.patch(`${API_URL}/products/restore/${id}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi khôi phục sản phẩm:", error);
    throw error;
  }
};
