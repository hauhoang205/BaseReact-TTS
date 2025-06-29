import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import type { IOrder } from "types/order";
import { getOrderById, updateOrderStatus } from "service/order/order.service";

const STATUS_ORDER = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
];
const getValidNextStatuses = (current: string): string[] => {
  switch (current) {
    case "pending":
      return ["processing", "cancelled"];
    case "processing":
      return ["shipped", "cancelled"];
    case "shipped":
      return ["delivered"];
    case "delivered":
      return ["returned"];
    default:
      return []; // cancelled, returned: không cập nhật được nữa
  }
};


const formatOrderCode = (id: string) => {
  const last6 = id.slice(-6).toUpperCase();
  return `ORDER-${last6}`;
};

const OrderUpdate = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [status, setStatus] = useState("");

  const handleUpdateStatus = async () => {
    if (!order) return;

    const validNext = getValidNextStatuses(order.order_status || "pending");
    if (!validNext.includes(status)) {
      return message.warning("Không thể cập nhật đơn hàng đã hoàn thành hoặc đã bị hủy!");
    }

    try {
      await updateOrderStatus(orderId as string, { order_status: status });
      const refreshedOrder = await getOrderById(orderId as string);
      setOrder(refreshedOrder);
      message.success("✅ Cập nhật trạng thái thành công!");
    } catch (error: any) {
      console.error("Lỗi cập nhật trạng thái:", error.response?.data || error.message);
      message.error("❌ Cập nhật trạng thái thất bại!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrderById(orderId as string);
        setOrder(data);
        setStatus(data.order_status  || "pending");
      } catch (err) {
        console.error("Lỗi khi lấy đơn hàng:", err);
      }
    };
    fetchData();
  }, [orderId]);

  if (!order) return <div className="p-6">Đang tải đơn hàng...</div>;

  const validOptions = getValidNextStatuses(order.order_status || "pending");

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 font-sans">
      <section className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <header className="p-6 bg-blue-600">
          <h2 className="text-white text-xl font-bold">
            Chi tiết đơn hàng: <span className="underline">{formatOrderCode(order._id || "")}</span>
          </h2>
        </header>

        <div className="p-6 grid grid-cols-2 gap-6">
          {/* Thông tin người nhận */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Thông tin người nhận</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
  <label className="block text-sm font-medium text-gray-600 mb-1">Tên người nhận</label>
  <input
    type="text"
    value={
      typeof order.user_id === "object" && "fullname" in order.user_id
        ? order.user_id.fullname
        : ""
    }
    readOnly
    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
  />
</div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Số điện thoại</label>
                <input
                  type="tel"
                  value={order.shipping_address?.phone || ""}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">Địa chỉ</label>
                <input
                  type="text"
                  value={order.shipping_address?.address || ""}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Trạng thái đơn hàng */}
          <div className="col-span-2">
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600 mb-1">Trạng thái đơn hàng</label>
              <select
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_ORDER.map((stt) => (
                  <option key={stt} value={stt} disabled={!validOptions.includes(stt)}>
                   {stt === "pending" && "🕓 Chờ xác nhận"}
{stt === "processing" && "🔧 Đang xử lý"}
{stt === "shipped" && "🚚 Đang giao"}
{stt === "delivered" && "✅ Đã giao"}
{stt === "cancelled" && "❌ Đã huỷ"}
{stt === "returned" && "↩️ Đã hoàn trả"}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleUpdateStatus}
                className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700"
              >
                Cập nhật trạng thái
              </button>
            </div>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="col-span-2 mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Danh sách sản phẩm</h3>
            <ul className="border border-gray-300 rounded-md bg-gray-50 divide-y divide-gray-200">
              {order.items.map((item, idx) => (
                <li key={idx} className="p-4 flex justify-between items-center">
                 <div>
  <span className="font-medium">
    {(typeof item.product_id === "object" && item.product_id?.name) || "❌ Sản phẩm đã bị xoá"}
  </span>{" "}
  – Size: {(typeof item.variant_id === "object" && item.variant_id?.size) || "?"}
</div>

                  <div className="text-sm text-gray-600">
                    SL: {item.quantity}, Giá: {(item.price * item.quantity).toLocaleString()} ₫
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 text-gray-600 text-sm py-4 px-6 flex justify-between mt-10">
        <div><strong>Website bán giày (Velora)</strong></div>
      </footer>
    </div>
  );
};

export default OrderUpdate;
