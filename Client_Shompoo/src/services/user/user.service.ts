// services/user.service.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getUserById = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    const url = `${API_URL}/client/users/${id}`; // Đổi thành /users nếu bạn không có /client

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Nếu backend trả về res.success = true và data nằm trong res.data.data
    return res.data.data;
  } catch (error: any) {
    console.error("❌ Lỗi khi lấy thông tin người dùng:", error);
    throw error;
  }
};
