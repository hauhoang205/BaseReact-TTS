import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Vui lòng nhập email.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email không hợp lệ.');
      return false;
    }
    if (!formData.password) {
      setError('Vui lòng nhập mật khẩu.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', formData); 
      setSuccess('Đăng nhập thành công!');
      localStorage.setItem('user', JSON.stringify(res.data.data));
      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Đăng nhập thất bại';
      setError(msg);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-5">Login</h2>
        <p className="text-center mb-5 text-gray-600">
          Get access to your Orders, Wishlist and Recommendations.
        </p>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email của bạn"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password *
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu của bạn"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <a href="#" className="text-sm text-gray-600">
              Quên mật khẩu
            </a>
            <a href="/register" className="text-sm text-gray-600">
              Register
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="https://admin.daugoimaxkilo.com/Upload/files/banner2.png"
          alt="Your Image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Login;
