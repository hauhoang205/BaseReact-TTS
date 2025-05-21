import { Button, message, Popconfirm } from 'antd';
import { useProducts } from 'hook/useProductAdmin';
import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const { data, loading } = useProducts();

  if (loading) return <div className="text-center py-10">Đang tải dữ liệu...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quản lý sản phẩm</h2>
        <Link
          to="/admin/product-add"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Thêm sản phẩm mới
        </Link>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-3 py-2">STT</th>
              <th className="border px-3 py-2">Tên sản phẩm</th>
              <th className="border px-3 py-2">Ảnh sản phẩm</th>
              <th className="border px-3 py-2">Giá</th>
              <th className="border px-3 py-2">Số lượng</th>
              <th className="border px-3 py-2">Danh mục</th>
              <th className="border px-3 py-2">Ngày cập nhật</th>
              <th className="border px-3 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="border px-3 py-2 text-center">{index + 1}</td>
                <td className="border px-3 py-2">{item.name}</td>
                <td className="border px-3 py-2">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded border"
                  />
                </td>
                <td className="border px-3 py-2">{item.discount_price.toLocaleString()}₫</td>
                <td className="border px-3 py-2 text-center">{item.stock_quantity}</td>
                <td className="border px-3 py-2">{item.fragrance || '—'}</td>
                <td className="border px-3 py-2">{new Date(item.updatedAt).toLocaleString()}</td>
          <td className="border px-3 py-2 space-x-2">
  <Link to={`/admin/product-edit/${item._id}`}>
    <Button type="primary" className="bg-yellow-500 hover:bg-yellow-600 border-none">
      Sửa
    </Button>
  </Link>

  <Popconfirm
    title="Bạn có muốn xoá không?"
    onConfirm={() => {
      message.success(`Đã xoá sản phẩm: ${item.name}`);
    }}
    okText="Xoá"
    cancelText="Huỷ"
  >
    <Button danger>Xoá</Button>
  </Popconfirm>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
