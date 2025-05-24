import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const validateForm = () => {
  if (!formData.fullname.trim()) {
    setError("Vui lòng nhập họ tên.");
    return false;
  }
  if (formData.fullname.trim().length < 2) {
    setError("Họ tên phải có ít nhất 2 ký tự.");
    return false;
  }

  if (!/^(0|\+84)(\d{9})$/.test(formData.phone)) {
    setError("Số điện thoại phải bắt đầu bằng 0 hoặc +84 và có 10 chữ số.");
    return false;
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
    setError("Email không đúng định dạng.");
    return false;
  }

  if (
    formData.password.length < 6 ||
    !/[A-Z]/.test(formData.password) ||
    !/[a-z]/.test(formData.password) ||
    !/[0-9]/.test(formData.password)
  ) {
    setError("Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số.");
    return false;
  }

  return true;
};


  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  if (!validateForm()) return;
    try {
      const res = await axios.post('http://localhost:8000/api/users', formData); // Thay đổi URL theo backend của bạn
      setSuccess(res.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Đăng ký thất bại. Vui lòng thử lại.');
      }
    }
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-5">Register</h2>
        <p className="text-center mb-5 text-gray-600">Get access to your Orders, Wishlist and Recommendations.</p>
        
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
        {success && <div className="text-green-600 text-sm mb-4">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Họ Tên *</label>
            <input type="text" id="fullname" value={formData.fullname} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại *</label>
            <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password *</label>
            <input type="password" id="password" value={formData.password} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div className="flex justify-between items-center mb-4">
            <a href="#" className="text-sm text-gray-600">Quên mật khẩu?</a>
            <a href="/login" className="text-sm text-gray-600">Login</a>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition duration-200">Đăng Ký</button>
        </form>
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <img src="https://admin.daugoimaxkilo.com/Upload/files/banner2.png" alt="Your Image" className="w-full h-full object-cover rounded-lg" />
      </div>
    </div>
  );
};

export default Register;
