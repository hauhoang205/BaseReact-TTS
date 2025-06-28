import { useOrders } from 'hooks/useOrder';
import { Link } from 'react-router-dom';

function OrderPage() {
  const { data: ordersData, isLoading, error } = useOrders();
  
  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Có lỗi xảy ra khi tải đơn hàng</div>;
  
  // Debug: xem cấu trúc dữ liệu
  console.log('ordersData:', ordersData);
  
  // Xử lý nhiều cấu trúc response khác nhau
  let orders = [];
  if (Array.isArray(ordersData)) {
    orders = ordersData;
  } else if (Array.isArray(ordersData?.data)) {
    orders = ordersData.data;
  } else if (ordersData && typeof ordersData === 'object') {
    orders = [];
  }
  
  const pendingOrders = orders.filter((order: any) => 
    order?.order_status === 'pending' || order?.order_status === 'processing'
  );
  const completedOrders = orders.filter((order: any) => 
    order?.order_status === 'delivered' || order?.order_status === 'completed'
  );
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-500';
      case 'processing': return 'text-blue-500';
      case 'shipped': return 'text-purple-500';
      case 'delivered': return 'text-green-500';
      case 'cancelled': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'processing': return 'Đang xử lý';
      case 'shipped': return 'Đang giao';
      case 'delivered': return 'Đã giao';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
<main className="max-w-5xl w-full">
  <section className="text-center mb-10">
    <h1 className="text-gray-900 font-semibold text-2xl sm:text-3xl mb-1">
      Product <span className="text-green-600">Order List</span>
    </h1>
    <p className="text-gray-500 text-sm sm:text-base">
      Your product Order is our first priority.
    </p>
  </section>
  {/* Pending Orders Section */}
  <section className="mb-12 border border-gray-200 rounded-md shadow-sm p-6">
    <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
      <h2 className="text-sm sm:text-base font-semibold uppercase text-gray-500 tracking-wide">Pending Orders</h2>
      <button className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-md transition">
        <Link to="/products" className="flex items-center gap-2">
        Shop Now
        </Link>
      </button>
    </div>
    <table className="w-full text-left text-gray-600 text-xs sm:text-sm">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="py-2">Orders ID</th>
          <th className="py-2">Shipping</th>
          <th className="py-2">Quantity</th>
          <th className="py-2">Date</th>
          <th className="py-2">Price</th>
          <th className="py-2">Status</th>
          <th className="py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {pendingOrders.length > 0 ? pendingOrders.map((order: any) => (
          <tr key={order._id} className="border-b border-gray-100">
            <td className="py-3">{order.invoice_number}</td>
            <td className="py-3">30.000₫</td>
            <td className="py-3">{order.items.reduce((sum: number, item: any) => sum + item.quantity, 0)}</td>
            <td className="py-3">{formatDate(order.createdAt)}</td>
            <td className="py-3">{order.total_amount.toLocaleString()}₫</td>
            <td className="py-3">
              <span className={`font-medium ${getStatusColor(order.order_status)}`}>
                {getStatusText(order.order_status)}
              </span>
            </td>
            <td className="py-3 space-x-2">
              <button className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-semibold py-1.5 px-3 rounded-md transition">Xem</button>
              {order.order_status === 'pending' && (
                <button className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm font-semibold py-1.5 px-3 rounded-md transition">Hủy</button>
              )}
            </td>
          </tr>
        )) : (
          <tr>
            <td colSpan={7} className="py-8 text-center text-gray-500">
              Không có đơn hàng nào đang chờ xử lý
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </section>
  {/* Complete Orders Section */}
  <section className="border border-gray-200 rounded-md shadow-sm p-6">
    <h2 className="text-sm sm:text-base font-semibold uppercase text-gray-500 tracking-wide mb-6">Complete Orders</h2>
    <table className="w-full text-left text-gray-600 text-xs sm:text-sm">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="py-2">Orders ID</th>
          <th className="py-2">Shipping</th>
          <th className="py-2">Quantity</th>
          <th className="py-2">Date</th>
          <th className="py-2">Price</th>
          <th className="py-2">Status</th>
          <th className="py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {completedOrders.length > 0 ? completedOrders.map((order: any) => (
          <tr key={order._id} className="border-b border-gray-100">
            <td className="py-3">{order.invoice_number}</td>
            <td className="py-3">30.000₫</td>
            <td className="py-3">{order.items.reduce((sum: number, item: any) => sum + item.quantity, 0)}</td>
            <td className="py-3">{formatDate(order.createdAt)}</td>
            <td className="py-3">{order.total_amount.toLocaleString()}₫</td>
            <td className="py-3">
              <span className={`font-medium ${getStatusColor(order.order_status)}`}>
                {getStatusText(order.order_status)}
              </span>
            </td>
            <td className="py-3">
              <button className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-semibold py-1.5 px-3 rounded-md transition">Xem</button>
            </td>
          </tr>
        )) : (
          <tr>
            <td colSpan={7} className="py-8 text-center text-gray-500">
              Không có đơn hàng nào đã hoàn thành
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </section>
</main>

    </div>
  );
}
export default OrderPage;