
import React from 'react'

const Register = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
  <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
    <h2 className="text-2xl font-semibold text-center mb-5">Register</h2>
    <p className="text-center mb-5 text-gray-600">Get access to your Orders, Wishlist and Recommendations.</p>
    <form>
      <div className="mb-4">
        <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Họ Tên *</label>
        <input type="text" id="fullname" placeholder="Nhập họ tên của bạn" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại *</label>
        <input type="tel" id="phone" placeholder="Nhập số điện thoại" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
        <input type="email" id="email" placeholder="Nhập email của bạn" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password *</label>
        <input type="password" id="password" placeholder="Nhập mật khẩu của bạn" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
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

  )
}

export default Register
