import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      // Kiểm tra thông tin user trong localStorage trước
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          return JSON.parse(userInfo);
        } catch (e) {
          console.log('Lỗi parse userInfo:', e);
        }
      }
      
      // Nếu không có, gọi API lấy thông tin
      try {
        const res = await axios.get('http://localhost:8000/api/admin/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const userData = res.data.data;
        // Lưu vào localStorage để dùng lần sau
        localStorage.setItem('userInfo', JSON.stringify(userData));
        return userData;
      } catch (error) {
        console.log('Không thể lấy thông tin user:', error);
        return null;
      }
    },
    enabled: !!localStorage.getItem('token'),
    retry: false,
    staleTime: 5 * 60 * 1000 // 5 phút
  });
};

export const useLogout = () => {
  return () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.location.reload();
  };
};