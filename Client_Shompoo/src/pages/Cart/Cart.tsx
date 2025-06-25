import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from 'hooks/useCart';
import { useProducts } from 'hooks/useProduct';
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Cart = () => {
  const { data: cart, isLoading } = useCart();
  const { data: products, loading } = useProducts();
  const queryClient = useQueryClient();
const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  const items = cart?.items || [];
  const subTotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const shipping = 30000;
  const total = subTotal + shipping;

  const handleRemove = async (item) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        "http://localhost:8000/api/client/carts",
        {
          data: {
            items: [
              {
                product_id: item.product_id._id,
                variant_id: item.variant_id?._id || null,
              },
            ],
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    } catch (error) {
      alert("Xoá sản phẩm thất bại");
    }
  };

  const handleUpdateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8000/api/client/carts",
        {
          product_id: item.product_id._id,
          variant_id: item.variant_id?._id || null,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    } catch (error) {
      alert("Cập nhật số lượng thất bại");
    }
  };

const handleCheckout = () => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  if (!token || !userString) {
    toast.error("Vui lòng đăng nhập để thanh toán!", { icon: "⚠️" });
    setTimeout(() => navigate("/login"), 3000);
    return;
  }

  const userData = JSON.parse(userString); // vẫn dùng tạm để lấy userId

  if (!cart || !cart.items || cart.items.length === 0) {
    alert("Giỏ hàng trống");
    return;
  }

  const selectedItems = cart.items.map((item) => ({
    product_id: item.product_id,
    variant_id: item.variant_id || null,
    quantity: item.quantity,
  }));

  navigate("/checkout", {
    state: {
      selectedItems,
      isFromCart: true,
    },
  });
};


  return (
    <div className="bg-white text-gray-700 font-sans">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:space-x-10">
          {/* Left Summary Panel */}
          <div className="bg-gray-50 p-6 rounded-md w-full md:w-1/3">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-700">Summary</h2>
            </div>
            <div className="mt-10 text-xs text-gray-600">
              <div className="flex justify-between mb-1">
                <span>Sub-Total</span>
                <span className="text-gray-700 font-normal">{subTotal.toLocaleString()}₫</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Delivery Charges</span>
                <span className="text-gray-700 font-normal">{shipping.toLocaleString()}₫</span>
              </div>
              <div className="flex justify-between font-semibold mt-4">
                <span>Total Amount</span>
                <span className="text-gray-900">{total.toLocaleString()}₫</span>
              </div>
            </div>
          </div>
          {/* Right Products Table */}
          <div className="flex-1 mt-8 md:mt-0">
            <table className="w-full text-xs text-gray-600 border-separate border-spacing-y-4">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="pl-2">Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr className="bg-white border border-gray-100 rounded-md align-middle" key={item.product_id._id}>
                    <td className="pl-2 py-3 flex items-center space-x-3">
                      <img
                        alt={item.product_id.name}
                        className="w-10 h-10 object-contain"
                        height={40}
                        src={item.product_id.images?.[0] || "https://via.placeholder.com/40"}
                        width={40}
                      />
                      <div>
  <div className="font-semibold">{item.product_id.name}</div>
  {item.variant_id?.size && (
    <div className="text-gray-500 text-xs">Dung tích: {item.variant_id.size}</div>
  )}
  {item.variant_id?.fragrance && (
    <div className="text-gray-500 text-xs">Hương: {item.variant_id.fragrance}</div>
  )}
</div>

                    </td>
                    <td className="text-center">{item.variant_id.discount_price.toLocaleString()}₫</td>
                    <td className="text-center">
                      <div className="inline-flex border border-gray-200 rounded-md overflow-hidden">
                        <button
                          aria-label="Decrease quantity"
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          className="w-8 text-center text-xs border-l border-r border-gray-200 focus:outline-none"
                          readOnly
                          type="text"
                          value={item.quantity}
                        />
                        <button
                          aria-label="Increase quantity"
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center">{item.subtotal.toLocaleString()}₫</td>
                    <td className="text-center">
                      <button aria-label="Delete item" onClick={() => handleRemove(item)}>
                        <i className="fas fa-trash-alt text-gray-400 hover:text-gray-600"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-6">
              <Link
                className="text-xs text-gray-600 underline hover:text-gray-800"
                to="/"
              >
                Continue Shopping
              </Link>
          <button
  onClick={handleCheckout}
  className="bg-green-400 text-white text-xs px-4 py-1 rounded-md hover:bg-green-500"
>
  Check Out
</button>
            </div>
          </div>
        </div>
      </div>
      {/* Sản phẩm gợi ý */}
      <div className="flex overflow-x-auto gap-4 p-3">
        {products?.map((item) => (
          <Link
            to={`/products/${item._id}`}
            key={item._id}
            className="w-[280px] border border-gray-200 rounded-md p-3 flex flex-col items-center text-center shadow hover:shadow-lg transition flex-shrink-0 hover:scale-105"
          >
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="mb-3 w-full h-48 object-contain rounded"
            />
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <div className="text-sm text-gray-500">{item.origin}</div>
            <div className="mt-1 text-red-600 font-bold">
              {item.discount_price.toLocaleString()}₫
            </div>
            <div className="text-gray-400 line-through text-sm">
              {item.price.toLocaleString()}₫
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cart;