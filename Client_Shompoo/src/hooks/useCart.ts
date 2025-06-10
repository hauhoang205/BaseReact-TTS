import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8000/api/client/carts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data.data;
    }
  });
};