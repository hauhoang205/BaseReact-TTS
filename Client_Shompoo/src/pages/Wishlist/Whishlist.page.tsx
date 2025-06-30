import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist, useRemoveFromWishlist } from 'hooks/useWishlist';
import axios from 'axios';

const WishlistPage = () => {
  const { data: wishlistItems, isLoading } = useWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await removeFromWishlistMutation.mutateAsync(productId);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi xóa sản phẩm');
    }
  };

  const handleAddToCart = async (product: any) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/client/carts', {
        product_id: product.product_id._id,
        quantity: 1
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Đã thêm vào giỏ hàng!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi thêm vào giỏ hàng');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
              <div className="bg-gray-200 h-48 w-full rounded mb-4" />
              <div className="bg-gray-200 h-4 w-3/4 rounded mb-2" />
              <div className="bg-gray-200 h-4 w-1/2 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Danh sách yêu thích</h1>
        <p className="text-gray-600">Những sản phẩm bạn đã lưu để mua sau</p>
      </div>

      {!wishlistItems || wishlistItems.length === 0 ? (
        <div className="text-center py-20">
          <div className="mb-8">
            <i className="fas fa-heart text-6xl text-gray-300"></i>
          </div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Danh sách yêu thích trống
          </h2>
          <p className="text-gray-500 mb-8">
            Hãy thêm những sản phẩm yêu thích vào danh sách để mua sau
          </p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Khám phá sản phẩm
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlistItems.map((item: any) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
              <div className="relative">
<Link to={`/products/${item.product_id._id}`}>
                  <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 mb-4">
                    <img
                      src={item.product_id.images?.[0] || '/images/fallback-image.jpg'}
                      alt={item.product_id.name}
                      className="object-contain h-full transition duration-300 hover:scale-105"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => handleRemoveFromWishlist(item.product_id._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  title="Xóa khỏi danh sách yêu thích"
                >
                  <i className="fas fa-times text-sm"></i>
                </button>
              </div>

              <div className="text-center">
                <Link to={`/products/${item.product_id._id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-green-600 transition-colors line-clamp-2">
                    {item.product_id.name}
                  </h3>
                </Link>
                
                <div className="text-sm text-gray-500 mb-3">
                  {item.product_id.origin}
                </div>

                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="text-red-600 font-bold text-lg">
                    {(item.product_id.discount_price || item.product_id.price).toLocaleString()}₫
                  </div>
                  {item.product_id.discount_price && item.product_id.discount_price < item.product_id.price && (
                    <div className="text-gray-400 line-through text-sm">
                      {item.product_id.price.toLocaleString()}₫
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
