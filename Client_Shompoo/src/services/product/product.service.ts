import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllProducts = async (search?: string) => {
  try {
    const url = `${API_URL}/client/products`;
    const params = search ? { search } : {};

    const res = await axios.get(url, { params });
 return res.data.products;
  } catch (error) {
    // Ném lỗi để gọi hàm bên ngoài có thể xử lý
    throw error;
  }
};
