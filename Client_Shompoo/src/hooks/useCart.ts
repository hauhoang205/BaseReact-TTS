import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) return { items: [] };
      
      try {
        const res = await axios.get('http://localhost:8000/api/client/carts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return res.data.data;
      } catch (error) {
        console.log('Không thể lấy giỏ hàng:', error);
        return { items: [] };
      }
    },
    enabled: !!localStorage.getItem('token'),
    retry: false
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.delete('http://localhost:8000/api/client/carts/clear', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
