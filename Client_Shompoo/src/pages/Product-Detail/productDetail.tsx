import React from 'react';

const ProductDetail = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Header */}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src="https://media.hasaki.vn/hsk/dau-goi-nguyen-xuan-xanh-la.jpg" 
            alt="Product"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-2xl font-bold">Dầu Gội Dược Liệu Nguyên Xuân Xanh Lá</h1>
          <p className="text-lg text-gray-500">SKU: WH12</p>
          <p className="text-xl font-semibold text-green-600">
            $684.00 <span className="line-through text-gray-400">$1,299.00</span> <span className="text-red-500">-78%</span>
          </p>
          <div className="mt-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Chi tiết sản phẩm</h2>
        <p>
          Dầu gội dược liệu Xanh Lá giúp dưỡng tóc và da đầu, sạch gàu.
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>Chứa: Hạt & Lỗ</li>
          <li>Chất liệu: Polyethylene Chorlide</li>
          <li>Màu sắc: Xanh lá cây</li>
        </ul>
      </div>

      {/* Related Products Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Repeat for related products */}
          <div className="border rounded-lg p-4">
            <img src="https://vn-test-11.slatic.net/p/64c933d8efd8329248ba7ee34db92bcc.jpg" alt="Related Product" className="w-full rounded-lg" />
            <h3 className="mt-2 font-semibold">Sản phẩm 1</h3>
            <p className="text-gray-500">$25.00</p>
          </div>
          {/* Thêm sản phẩm khác tại đây */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
