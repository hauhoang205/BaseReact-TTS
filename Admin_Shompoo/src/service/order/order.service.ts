import axiosClient from "utils/axiosInstance";

interface GetOrdersParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: "asc" | "desc";
  search?: string;
}

export const getOrders = async (params?: GetOrdersParams) => {
  try {
    const res = await axiosClient.get("/admin/orders", { params });
    return res.data.data; 
  } catch (error) {
    throw error;
  }
};


export const getOrderById = async (id: string) => {
  try {
    const res = await axiosClient.get(`/admin/orders/${id}`);
    return res.data.data; 
  } catch (error) {
    throw error;
  }
};

interface UpdateOrderStatusPayload {
  order_status?: string;
  payment_status?: string;
}

export const updateOrderStatus = async (id: string, payload: UpdateOrderStatusPayload) => {
  try {
    const res = await axiosClient.patch(`/admin/orders/${id}`, payload);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
