// src/utils/axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api', // sửa theo baseURL của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hàm logout dùng chung
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('adminUser');
  window.location.href = '/admin-login';
}

axiosClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosClient;


