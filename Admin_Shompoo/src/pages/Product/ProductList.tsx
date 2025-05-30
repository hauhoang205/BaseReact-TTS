import { Button, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteProductById,
  getAllProducts,
} from "service/product/product.service";
import type { Product } from "types/product";

const ProductList = () => {
  const [products, setProduct] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getAllProducts();
        console.log('1',data)
        setProduct(data.products || []);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  // Lấy sản phẩm theo trang hiện tại
  const currentProducts = products.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(products.length / perPage);

  const DelProduct = async (id: string) => {
    try {
      await deleteProductById(id);
      const newProduct = products.filter((item) => item._id != id);
      setProduct(newProduct);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Quản lý sản phẩm
        </h2>
      </div>
 <div className="mb-6 flex justify-end">
  <Link  to={"/product-delete"}
    className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 shadow transition"
  >
    Xem sản phẩm đã xóa
  </Link>
</div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {[
                "STT",
                "Tên sản phẩm",
                "Ảnh sản phẩm",
                "Giá (VNĐ)",
                "Số lượng",
                "Danh mục",
                "Ngày cập nhật",
                "Thao tác",
              ].map((header) => (
                <th
                  key={header}
                  className="border px-4 py-3 text-left text-gray-700 font-medium select-none">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentProducts.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  Không có sản phẩm nào
                </td>
              </tr>
            ) : (
              currentProducts.map((item, index) => (
                <tr
                  key={item._id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <td className="border px-4 py-2 align-middle">
                    {(page - 1) * perPage + index + 1}
                  </td>
                  <td
                    className="border px-4 py-2 align-middle font-semibold text-gray-800 max-w-xs truncate"
                    title={item.name}
                  >
                    {item.name}
                  </td>
                  <td className="border px-4 py-2 align-middle">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md shadow-sm"
                      />
                    ) : (
                      <span className="text-gray-400 italic">Chưa có ảnh</span>
                    )}
                  </td>
                  <td className="border px-4 py-2 align-middle">
                    {item.price.toLocaleString()}
                  </td>
                  <td className="border px-4 py-2 align-middle">
                    {item.stock_quantity}
                  </td>
                <td className="border px-4 py-2 align-middle">
  {(item.category_id as { name?: string })?.name || "Không có"}
</td>
                  <td className="border px-4 py-2 align-middle text-gray-600 text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                 <td className="border px-4 py-2 align-middle">
  <div className="flex gap-3">
    <Link
      to={`/product-edit/${item._id}`}
      className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
    >
      Sửa
    </Link>
    <Popconfirm
      title="Bạn có chắc muốn xóa?"
      okText="Có"
      cancelText="Không"
      onConfirm={() => DelProduct(item._id)}
    >
      <button
        className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition font-semibold"
      >
        Xóa
      </button>
    </Popconfirm>
  </div>
</td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded border ${
              page === i + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList; 