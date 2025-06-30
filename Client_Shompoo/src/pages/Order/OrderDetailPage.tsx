import { useParams, useNavigate } from 'react-router-dom';
import { useOrderDetail, useCancelOrder } from 'hooks/useOrder';

function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading, error } = useOrderDetail(orderId!);
  const cancelOrderMutation = useCancelOrder();

  if (isLoading) return <div className="text-center py-8">Đang tải...</div>;
  if (error || !order) return <div className="text-center py-8 text-red-500">Không tìm thấy đơn hàng</div>;

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('vi-VN');

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

  const handleCancelOrder = async () => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      try {
        await cancelOrderMutation.mutateAsync(orderId!);
        alert('Hủy đơn hàng thành công!');
        navigate('/orders');
      } catch (error) {
        alert('Có lỗi xảy ra khi hủy đơn hàng');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/orders')}
          className="text-green-600 hover:text-green-700 font-medium"
        >
          ← Quay lại danh sách đơn hàng
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Chi tiết đơn hàng #{order.invoice_number}
            </h1>
            <p className="text-gray-600">Ngày đặt: {formatDate(order.createdAt)}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900 mb-2">
              Trạng thái: <span className="text-blue-600">{getStatusText(order.order_status)}</span>
            </div>
            {order.order_status === 'pending' && (
              <button
                onClick={handleCancelOrder}
                disabled={cancelOrderMutation.isPending}
                className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-md font-medium"
              >
                {cancelOrderMutation.isPending ? 'Đang hủy...' : 'Hủy đơn hàng'}
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Thông tin giao hàng</h3>
            <div className="text-gray-600 space-y-1">
              <p>{order.shipping_address?.address}</p>
              <p>{order.shipping_address?.city}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Thông tin thanh toán</h3>
            <p className="text-gray-600">
              Phương thức: {order.payment_method === 'cash_on_delivery' ? 'Thanh toán khi nhận hàng' : 'VNPay'}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Sản phẩm đã đặt</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Sản phẩm</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Số lượng</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Đơn giá</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.items?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{item.product_id?.name || item.product_name || 'Sản phẩm'}</div>
                      {(item.variant_id?.size || item.variant_name) && (
                        <div className="text-sm text-gray-500">Size: {item.variant_id?.size || item.variant_name}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">{item.price?.toLocaleString()}₫</td>
                    <td className="px-4 py-3 text-right font-medium">
                      {(item.price * item.quantity)?.toLocaleString()}₫
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-end space-y-2">
            <div className="text-right">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Phí vận chuyển:</span>
                <span className="font-medium">30.000₫</span>
              </div>
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Tổng cộng:</span>
                <span className="text-green-600">{order.total_amount?.toLocaleString()}₫</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;