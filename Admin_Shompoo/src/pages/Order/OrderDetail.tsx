import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "service/order/order.service";
import type { IOrder } from "types/order";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder | null>(null);
const shippingFee = 30000;
const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-500'; // Đang chờ
        case 'processing':
            return 'bg-blue-500'; // Đang xử lý
        case 'shipped':
            return 'bg-indigo-500'; // Đã gửi đi
        case 'delivered':
            return 'bg-green-600'; // Đã giao
        case 'cancelled':
            return 'bg-red-500'; // Đã huỷ
        case 'returned':
            return 'bg-gray-500'; // Đã trả hàng
        default:
            return 'bg-gray-400'; // Không xác định
    }
};

useEffect(() => {
  if (id) {
    getOrderById(id)
      .then((res) => {
        console.log("✅ Order:", res);
        console.log("🧪 Variant object:", res.items?.[0]?.variant_id); // <- kiểm tra có size không
        setOrder(res);
      })
      .catch((err) => console.error("❌ Lỗi khi lấy đơn hàng:", err));
  }
}, [id]);


  if (!order) return <div className="p-6">Đang tải đơn hàng...</div>;

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Chi tiết đơn hàng: #{order._id?.slice(-6)}
      </h2>
<p>
  <span className={`flex justify-between items-center w-full border p-3 rounded ${getStatusColor(order.order_status)}`}>
    {order.order_status}
  </span>
</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Thông tin người nhận</h3>
<p>
  Người nhận:{" "}
  {typeof order.user_id === "object" && "fullname" in order.user_id
    ? order.user_id.fullname
    : "Không rõ"}
</p>
    <p>Điện thoại: {order.shipping_address?.phone || "N/A"}</p>
          <p>Địa chỉ: {order.shipping_address?.address || "N/A"}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Thông tin đơn hàng</h3>

          <p>Phương thức thanh toán: {order.payment_method}</p>
<p>
  Ngày đặt:{" "}
  {order.createdAt
    ? new Date(order.createdAt).toLocaleString()
    : "Không rõ"}
</p>
          <p>Tổng tiền: {order.total_amount.toLocaleString()} ₫</p>
        </div>
      </div>

      <h3 className="font-semibold mb-3 text-gray-700">Sản phẩm</h3>
      <table className="min-w-full border text-sm mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">#</th>
            <th className="border px-3 py-2">Tên SP</th>
            <th className="border px-3 py-2">Phân loại</th>
            <th className="border px-3 py-2 text-right">Giá</th>
            <th className="border px-3 py-2 text-right">SL</th>
            <th className="border px-3 py-2 text-right">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, i) => (
            
<tr key={typeof item.product_id === "object" && item.product_id !== null ? item.product_id._id : i}>
              <td className="border px-3 py-2">{i + 1}</td>
           <td>
  {typeof item.product_id === "object" && "name" in item.product_id
    ? item.product_id.name
    : "Không rõ"}
</td>

<td className="border px-3 py-2">
  {item.variant_id && typeof item.variant_id === "object"
    ? item.variant_id.size || "-"
    : "-"}
    
</td>

              <td className="border px-3 py-2 text-right">
                {item.price.toLocaleString()} ₫
              </td>
              <td className="border px-3 py-2 text-right">{item.quantity}</td>
              <td className="border px-3 py-2 text-right">
                {(item.price * item.quantity).toLocaleString()} ₫
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end gap-6 text-base">
        <div>
     <p className="font-medium">
      Tạm tính: {(order.total_amount - shippingFee).toLocaleString("vi-VN")} ₫
    </p>
          <p className="font-medium">Phí vận chuyển: 30,000 ₫</p>
       <p className="font-bold text-lg">
  Tổng cộng:{" "}
  {typeof order.final_amount === "number"
    ? order.final_amount.toLocaleString() + " ₫"
    : typeof order.total_amount === "number"
    ? order.total_amount.toLocaleString() + " ₫"
    : "Đang cập nhật"}
</p>

        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
