import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useClearCart } from 'hooks/useCart';

function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const clearCartMutation = useClearCart();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');

  useEffect(() => {
    const handlePaymentCallback = async () => {
      const responseCode = searchParams.get('vnp_ResponseCode');
      
      if (responseCode === '00') {
        try {
          await clearCartMutation.mutateAsync();
          setStatus('success');
          setTimeout(() => navigate('/orders'), 3000);
        } catch (error) {
          setStatus('success');
          setTimeout(() => navigate('/orders'), 3000);
        }
      } else {
        setStatus('failed');
        setTimeout(() => navigate('/cart'), 3000);
      }
    };

    handlePaymentCallback();
  }, [searchParams, navigate, clearCartMutation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Đang xử lý thanh toán...</h2>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-600 mb-2">Thanh toán thành công!</h2>
            <p className="text-gray-600">Đang chuyển hướng đến trang đơn hàng...</p>
          </>
        )}
        
        {status === 'failed' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-600 mb-2">Thanh toán thất bại!</h2>
            <p className="text-gray-600">Đang chuyển hướng về giỏ hàng...</p>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentCallback;