import { useOrders } from 'hooks/useOrder';
import { Link } from 'react-router-dom';

function OrderPage() {
  const { data: ordersData, isLoading, error } = useOrders();

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Có lỗi xảy ra khi tải đơn hàng</div>;

  let orders = [];
  if (Array.isArray(ordersData)) {
    orders = ordersData;
  } else if (Array.isArray(ordersData?.data)) {
    orders = ordersData.data;
  } else if (ordersData && typeof ordersData === 'object') {
    orders = [];
  }

  const filterOrders = (statuses: string[]) => orders.filter((order: any) => statuses.includes(order?.order_status));

  const pendingOrders = filterOrders(['pending', 'processing']);
  const shippingOrders = filterOrders(['shipped']);
  const completedOrders = filterOrders(['delivered', 'completed']);
  const cancelledOrders = filterOrders(['cancelled']);
  const returnedOrders = filterOrders(['returned']);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('vi-VN');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-500';
      case 'processing': return 'text-blue-500';
      case 'shipped': return 'text-purple-500';
      case 'delivered':
      case 'completed': return 'text-green-600';
      case 'cancelled': return 'text-red-500';
      case 'returned': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xác nhận';
      case 'processing': return 'Đang xử lý';
      case 'shipped': return 'Đang giao';
      case 'delivered': return 'Đã giao';
      case 'completed': return 'Hoàn tất';
      case 'cancelled': return 'Đã hủy';
      case 'returned': return 'Đã hoàn trả';
      default: return status;
    }
  };

  const renderTable = (title: string, orders: any[], type?: 'pending') => (
    <section className="mb-12 border border-gray-200 rounded-md shadow-sm p-6">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
        <h2 className="text-sm sm:text-base font-semibold uppercase text-gray-500 tracking-wide">{title}</h2>
        {type === 'pending' && (
          <Link to="/products">
            <button className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-md transition">
              Mua thêm
            </button>
          </Link>
        )}
      </div>
      <table className="w-full text-left text-gray-600 text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-2">Mã đơn</th>
            <th className="py-2">Phí ship</th>
            <th className="py-2">Số lượng</th>
            <th className="py-2">Ngày đặt</th>
            <th className="py-2">Tổng tiền</th>
            <th className="py-2">Trạng thái</th>
            <th className="py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? orders.map((order: any) => (
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
                <Link to={`/account/orders/${order._id}`}>
                  <button className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-semibold py-1.5 px-3 rounded-md transition">Xem</button>
                </Link>
                {type === 'pending' && (
                  <button className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm font-semibold py-1.5 px-3 rounded-md transition">Hủy</button>
                )}
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={7} className="py-8 text-center text-gray-500">
                Không có đơn hàng nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <main className="max-w-5xl w-full">
        <section className="text-center mb-10">
          <h1 className="text-gray-900 font-semibold text-2xl sm:text-3xl mb-1">
            Danh sách <span className="text-green-600">Đơn hàng</span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Quản lý đơn hàng của bạn dễ dàng hơn.
          </p>
        </section>

        {renderTable("🕓 Đơn đang xử lý", pendingOrders, 'pending')}
        {renderTable("🚚 Đơn đang giao", shippingOrders)}
        {renderTable("✅ Đơn đã hoàn tất", completedOrders)}
        {renderTable("❌ Đơn đã hủy", cancelledOrders)}
        {renderTable("↩️ Đơn đã hoàn trả", returnedOrders)}
      </main>
    </div>
  );
}

export default OrderPage;
