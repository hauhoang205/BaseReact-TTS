import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface OrderItem {
  product_id: string;
  variant_id?: string;
  quantity: number;
  price: number;
}

interface CreateOrderData {
  items: OrderItem[];
  shipping_address: {
    address: string;
    city: string;
    country?: string;
  };
  payment_method: 'cash_on_delivery' | 'vnpay';
  coupon_id?: string;
}

const fetchOrders = async () => {
  const token = localStorage.getItem('token');
  if (!token) return { data: [] };
  
  try {
    const response = await axios.get('http://localhost:8000/api/client/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('API Response:', response.data);
    // Backend trả về cấu trúc: { success: true, data: { data: [...] } }
    return response.data.data || { data: [] };
  } catch (error) {
    console.log('Không thể lấy danh sách đơn hàng:', error);
    return { data: [] };
  }
};

const fetchOrderDetail = async (orderId: string) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`http://localhost:8000/api/client/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

const cancelOrder = async (orderId: string) => {
  const token = localStorage.getItem('token');
  const response = await axios.patch(`http://localhost:8000/api/client/orders/${orderId}/cancel`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createOrder = async (orderData: CreateOrderData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post('http://localhost:8000/api/client/orders', orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    enabled: !!localStorage.getItem('token'),
    retry: false,
  });
};

export const useOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrderDetail(orderId),
    enabled: !!orderId && !!localStorage.getItem('token'),
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};