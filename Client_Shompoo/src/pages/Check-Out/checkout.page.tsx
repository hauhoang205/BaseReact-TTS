import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCreateOrder } from 'hooks/useOrder';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  quantity: number;
  variant?: {
     _id: string;
    discount_price: number;
    price: number;
    size?: string;
    fragrance?: string;
    image?: string;
  };
}


interface CartData {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

function CheckOutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const createOrderMutation = useCreateOrder();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Lấy dữ liệu từ state được truyền từ giỏ hàng
    if (location.state?.cartData) {
      setCartData(location.state.cartData);
    }
    if (location.state?.userData) {
      setCustomerInfo(location.state.userData);
    }
  }, [location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cartData || cartData.items.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }
    
    if (!customerInfo.fullName || !customerInfo.email || !customerInfo.phone || !customerInfo.address || !customerInfo.city) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("🧪 Submit cart items:", cartData.items);

      const orderData = {
        items: cartData.items.map(item => ({
          product_id: item.id,
variant_id: (item.variant as { _id: string })?._id,
          quantity: item.quantity,
price: item.variant?.discount_price ?? item.price,

        })),
        shipping_address: {
          address: customerInfo.address,
          city: customerInfo.city,
          country: 'Vietnam',
           phone: customerInfo.phone,
        },
        payment_method: paymentMethod as 'cash_on_delivery' | 'vnpay',
         subtotal: cartData.subtotal,
  shipping_fee: cartData.shipping,
  total_amount: cartData.total
      };
      
      const result = await createOrderMutation.mutateAsync(orderData);
      
      if (result.success) {
        alert(result.message || 'Đặt hàng thành công!');
        
        // Nếu là VNPAY, chuyển hướng đến trang thanh toán
        if (paymentMethod === 'vnpay' && result.data?.redirect_url) {
          window.location.href = result.data.redirect_url;
        } else {
          // Nếu là COD, chuyển đến trang orders
          navigate('/orders');
        }
      }
    } catch (error: any) {
      console.error('Lỗi đặt hàng:', error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
<main className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    {/* Left side: Payment summary */}
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Phiếu thanh toán</h2>
  <div className="mb-6 space-y-1 max-w-xs">
    <div className="flex justify-between text-gray-700 text-sm">
      <span>Tổng phụ</span>
      <span>{cartData?.subtotal?.toLocaleString('vi-VN') || '0'}₫</span>
    </div>
    <div className="flex justify-between text-gray-700 text-sm">
      <span>Phí giao hàng</span>
      <span>{cartData?.shipping?.toLocaleString('vi-VN') || '0'}₫</span>
    </div>
    <div className="flex justify-between text-sm">
      <span>Phiếu giảm giá</span>
      <a href="#" className="text-teal-600 hover:underline">Áp mã giảm</a>
    </div>
    <div className="border-t border-gray-300 mt-4 pt-3 font-semibold text-gray-900 text-base">
      Tổng số tiền
      <span className="float-right">{cartData?.total?.toLocaleString('vi-VN') || '0'}₫</span>
    </div>
  </div>

     <ul className="space-y-4">
    {cartData?.items?.map((item) => (
      <li key={item.id} className="flex items-center space-x-4 border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
        <div className="flex-grow">
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <div className="flex items-center text-yellow-400 space-x-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 fill-current ${i < item.rating ? '' : 'text-gray-300'}`} viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09L5.5 11.545 1 7.455l6.06-.545L10 2l2.94 4.91 6.06.545-4.5 4.09 1.378 6.545z" />
              </svg>
            ))}
          </div>
          {item.originalPrice && (
            <p className="text-sm text-gray-500 line-through">{item.originalPrice.toLocaleString('vi-VN')}₫</p>
          )}
      <p className="font-bold text-teal-600">
  {(
    item.variant?.discount_price ?? item.price
  ).toLocaleString('vi-VN')}₫ x {item.quantity} = 
  {(
    (item.variant?.discount_price ?? item.price) * item.quantity
  ).toLocaleString('vi-VN')}₫
</p>

        </div>
      </li>
    )) || (
      <li className="text-center text-gray-500 py-8">
        Không có sản phẩm nào trong giỏ hàng
      </li>
    )}
  </ul>
      <section className="mt-10 max-w-md space-y-4 text-gray-700 text-sm">
        <h3 className="font-semibold text-gray-900">Phương thức thanh toán</h3>
        <p>Vui lòng chọn phương thức thanh toán ưu thích để sử dụng cho đơn hàng này.</p>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input 
              type="radio" 
              name="payment" 
              value="cash_on_delivery"
              checked={paymentMethod === 'cash_on_delivery'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="text-teal-600" 
            />
            <span>Tiền mặt khi giao hàng (COD)</span>
          </label>
          <label className="flex items-center space-x-3">
            <input 
              type="radio" 
              name="payment" 
              value="vnpay"
              checked={paymentMethod === 'vnpay'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="text-teal-600" 
            />
            <span>Thanh toán online (VNPAY)</span>
          </label>
        </div>
        <label className="text-teal-600 hover:underline cursor-pointer block">Thêm bình luận về đơn hàng của bạn</label>
        <textarea rows={4} placeholder="Comments" className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" defaultValue={""} />
        <label className="flex items-center space-x-2 text-xs text-gray-400">
          <input type="checkbox" />
          <span>Tôi đã đọc và đồng ý với Điều khoản &amp; Điều kiện.</span>
        </label>
      </section>
      <section className="mt-6 p-4 bg-gray-100 rounded-lg max-w-xs">
        <h4 className="font-semibold text-gray-900 mb-3">Payment Method</h4>
        <div className="flex space-x-3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Skrill_logo.svg" alt="Skrill" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Visa_Electron_2014_logo.svg" alt="Visa Electron" className="h-6" />
        </div>
      </section>
    </section>
    {/* Right side: Customer info form */}
    <section className="bg-white rounded-xl border border-gray-200 h-full max-w-md mx-auto p-6">
      <h2 className="text-center font-semibold mb-6 text-gray-900">Thông tin giao hàng</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
          <input
            type="text"
            name="fullName"
            value={customerInfo.fullName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
            placeholder={customerInfo.fullName ? '' : 'Nhập họ và tên'}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={customerInfo.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
            placeholder={customerInfo.email ? '' : 'Nhập email'}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
          <input
            type="tel"
            name="phone"
            value={customerInfo.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Nhập số điện thoại"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ *</label>
          <input
            type="text"
            name="address"
            value={customerInfo.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Nhập địa chỉ"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thành phố *</label>
            <input
              type="text"
              name="city"
              value={customerInfo.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Nhập thành phố"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mã bưu điện</label>
            <input
              type="text"
              name="zipCode"
              value={customerInfo.zipCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Nhập mã bưu điện"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 transition-colors font-semibold mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng ngay'}
        </button>
      </form>
    </section>
  </div>
</main>


    </div>
  );
} 
export default CheckOutPage;