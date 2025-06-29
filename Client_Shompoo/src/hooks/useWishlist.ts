import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchWishlist = async () => {
  const token = localStorage.getItem('token');
  if (!token) return [];
  
  try {
    const response = await axios.get('http://localhost:8000/api/client/wishlist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.log('Không thể lấy danh sách yêu thích:', error);
    return [];
  }
};

const addToWishlist = async (product_id: string) => {
  const token = localStorage.getItem('token');
  const response = await axios.post('http://localhost:8000/api/client/wishlist', 
    { product_id }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const removeFromWishlist = async (product_id: string) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete('http://localhost:8000/api/client/wishlist', {
    data: { product_id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useWishlist = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: fetchWishlist,
    enabled: !!localStorage.getItem('token'),
    retry: false,
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
};