import React, { useEffect, useState } from "react";
import { Button, Popconfirm } from "antd";
import {
  deleteCategory,
  getAllCategories,
} from "service/category/category.service";
import type { Category } from "types/category";
import { Link, useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const nav = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const currentCategories = categories.slice(
    (page - 1) * perPage,
    page * perPage
  );
  const totalPages = Math.ceil(categories.length / perPage);

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((item) => item._id !== id));
      alert("Xóa danh mục thành công!");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Đã xảy ra lỗi khi xóa";
      alert("Lỗi: " + message);
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Quản lý danh mục
        </h2>
      </div>
 <div className="mb-6 flex justify-end">
  <Link  to={"/category-delete"}
    className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 shadow transition"
  >
    Xem danh mục đã xóa
  </Link>
</div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {["STT", "Tên danh mục", "Mô tả", "Thao tác"].map((header) => (
                <th
                  key={header}
                  className="border px-4 py-3 text-left text-gray-700 font-medium select-none"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentCategories.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  Không có danh mục nào
                </td>
              </tr>
            ) : (
              currentCategories.map((item, index) => (
                <tr
                  key={item._id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <td className="border px-4 py-2">
                    {(page - 1) * perPage + index + 1}
                  </td>
                  <td className="border px-4 py-2 font-semibold text-gray-800">
                    {item.name}
                  </td>
                  <td className="border px-4 py-2">{item.description}</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-3">
                      <Button
                        className="bg-red-600 hover:bg-blue-700 text-white font-semibold"
                        onClick={() => nav(`/category-in-product/${item._id}`)}
                      >
                        Chi tiết
                      </Button>
                      <Button 
                        type="primary"
                        className="bg-blue-600 hover:bg-blue-700 font-semibold"
                       onClick={() => nav(`/category-edit/${item._id}`)}
                      >
                        Sửa
                      </Button>
                      <Popconfirm
                        title="Bạn có chắc muốn xóa?"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => handleDelete(item._id)}
                      >
                        <Button
                          danger
                          className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                        >
                          Xóa
                        </Button>
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

export default CategoryList;
