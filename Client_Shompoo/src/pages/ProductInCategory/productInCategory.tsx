import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCategories, getProductsByCategory } from 'services/category/category.service';
import type { ICategory } from 'types/category';
import type { Product } from 'types/product';

const ProductInCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    console.log('categoryId:', categoryId); // Debug: Kiểm tra categoryId

    const fetchData = async () => {
      if (!categoryId) {
        setError('Không tìm thấy danh mục trong URL.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setProducts([]);
      setShowAnimation(false);
      setError(null);
      setCategoryName('');

      try {
        // Lấy danh sách danh mục
        const categories = await getCategories();
        console.log('Danh sách danh mục:', categories); // Debug: Kiểm tra dữ liệu danh mục
        const matchedCategory = categories.find((cat: ICategory) => cat._id === categoryId);

        if (!matchedCategory) {
          setError('Danh mục không tồn tại hoặc không tìm thấy.');
          setLoading(false);
          return;
        }

        setCategoryName(matchedCategory.name);

        // Lấy danh sách sản phẩm
        const productsData = await getProductsByCategory(categoryId);
        console.log('Dữ liệu sản phẩm từ API:', productsData); // Debug: Kiểm tra dữ liệu sản phẩm
        if (!Array.isArray(productsData)) {
          throw new Error('Dữ liệu sản phẩm không phải là mảng.');
        }
        setProducts(productsData);

        if (productsData.length > 0) {
          setTimeout(() => setShowAnimation(true), 100);
        }
      } catch (error: any) {
        console.error('Lỗi khi tải dữ liệu:', error.message || error);
        setError(error.message || 'Không thể tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Sản phẩm theo danh mục{' '}
        {categoryName && <span className="text-blue-600">"{categoryName}"</span>}
      </h2>
      {loading ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow p-4 animate-pulse h-[300px] flex flex-col justify-between"
            >
              <div className="bg-gray-200 h-40 w-full rounded mb-4" />
              <div className="bg-gray-200 h-4 w-3/4 rounded mb-2" />
              <div className="bg-gray-200 h-4 w-1/2 rounded" />
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500 text-lg font-medium">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-red-500 text-lg font-medium">
          Không có sản phẩm nào trong danh mục này.
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={product._id}
              className={`transition-all duration-700 transform ${
                showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Link
                to={`/products/${product._id}`}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.03] p-4 flex flex-col items-center text-center"
              >
                <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 mb-4">
                  <img
                    src={product.images?.[0] || '/images/fallback-image.jpg'}
                    alt={product.name || 'Sản phẩm'}
                    loading="lazy"
                    className="object-contain h-full transition duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 truncate w-full">
                  {product.name || 'Không có tên'}
                </h3>
                <div className="text-sm text-gray-500">
                  {product.origin || 'Không rõ nguồn gốc'}
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="text-red-600 font-bold text-lg">
                    {(product.discount_price ?? 0).toLocaleString()}₫
                  </div>
                  {product.discount_price < product.price && (
                    <div className="text-gray-400 line-through text-sm">
                      {product.price.toLocaleString()}₫
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductInCategory;