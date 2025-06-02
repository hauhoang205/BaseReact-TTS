import type { User } from "types/user";
import axiosClient from "utils/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

// Lấy danh sách người dùng thường (role = "user")
export const getUserList = async (params = {}): Promise<{ data: User[], result: number }> => {
  try {
    const res = await axiosClient.get(`${API_URL}/admin/users`, { params });
    return res.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    throw new Error("Không thể lấy danh sách người dùng");
  }
};
// Lấy danh sách admin + manager
export const getAdminList = async (params = {}): Promise<User[]> => {
  try {
    // Gửi nhiều role cùng lúc dưới dạng mảng (nếu backend hỗ trợ)
    const res = await axiosClient.get(`${API_URL}/admin/users`, {
      params: { ...params, role: "admin,manager" }, // chuỗi phân tách bằng dấu phẩy
    });
    return res.data.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy danh sách quản trị viên:", error);
    throw new Error("Không thể lấy danh sách quản trị viên");
  }
};

// Lấy chi tiết một người dùng
export const getUserById = async (id: string): Promise<User> => {
  try {
    const res = await axiosClient.get(`${API_URL}/admin/users/${id}`);
    return res.data.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy chi tiết người dùng:", error);
    throw new Error("Không thể lấy chi tiết người dùng");
  }
};

// Tạo người dùng mới
export const createUser = async (userData: Partial<User>): Promise<User> => {
  try {
    const res = await axiosClient.post(`${API_URL}/admin/users`, userData);
    return res.data.data;
  } catch (error: any) {
    console.error("Lỗi khi tạo người dùng:", error);
    throw new Error("Không thể tạo người dùng");
  }
};

// Cập nhật vai trò người dùng
export const updateUserRole = async (
  id: string,
  role: "admin" | "user" | "manager"
): Promise<User> => {
  try {
    const res = await axiosClient.put(`${API_URL}/admin/users/${id}`, { role });
    return res.data.data;
  } catch (error: any) {
    console.error("Lỗi khi cập nhật vai trò người dùng:", error);
    throw new Error("Không thể cập nhật vai trò người dùng");
  }
};

// Xóa người dùng (hard delete)
export const deleteUserById = async (id: string): Promise<User> => {
  try {
    const res = await axiosClient.delete(`${API_URL}/admin/users/${id}`);
    return res.data.data;
  } catch (error: any) {
    console.error("Lỗi khi xóa người dùng:", error);
    throw new Error("Không thể xóa người dùng");
  }
};

// Ẩn người dùng (soft delete)
export const hideUser = async (id: string): Promise<User> => {
  try {
    const res = await axiosClient.patch(`${API_URL}/admin/users/hide/${id}`);
    return res.data.data;
  } catch (error: any) {
    console.error("Lỗi khi ẩn người dùng:", error);
    throw new Error("Không thể ẩn người dùng");
  }
};

// Bỏ ẩn người dùng
export const unHideUser = async (id: string): Promise<User> => {
  try {
    const res = await axiosClient.patch(`${API_URL}/admin/users/unhide/${id}`);
    return res.data.data;
  } catch (error: any) {
    console.error("Lỗi khi bỏ ẩn người dùng:", error);
    throw new Error("Không thể bỏ ẩn người dùng");
  }
};
