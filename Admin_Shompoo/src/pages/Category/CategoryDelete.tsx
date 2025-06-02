import { Button, Popconfirm, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  getDeletedCategories,
  forceDeleteCategory,
  restoreCategory,
} from "service/category/category.service";
import type { Category } from "types/category";
import { DeleteOutlined, RollbackOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const CategoryDelete = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 5;

const fetchDeletedCategories = async (pageNumber = page) => {
  try {
    const res = await getDeletedCategories(pageNumber, perPage);
    setCategories(res.data || []);
    setTotalPages(res.pagination?.totalPages || 1);
  } catch (error) {
    console.error("Error fetching deleted categories:", error);
    message.error("Lỗi khi lấy danh mục đã xóa");
  }
};

  useEffect(() => {
    fetchDeletedCategories(page);
  }, [page]);

  const handleDeletePermanent = async (id: string) => {
    try {
      await forceDeleteCategory(id);
      message.success("Xóa vĩnh viễn danh mục thành công");
      fetchDeletedCategories(page);
    } catch (error) {
      console.error("Lỗi khi xóa vĩnh viễn danh mục:", error);
      message.error("Lỗi khi xóa vĩnh viễn danh mục");
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await restoreCategory(id);
      message.success("Khôi phục danh mục thành công");
      fetchDeletedCategories(page);
    } catch (error) {
      console.error("Lỗi khi khôi phục danh mục:", error);
      message.error("Lỗi khi khôi phục danh mục");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Danh sách danh mục đã xóa mềm
        </h2>
      </div>

      <div className="mb-6 flex justify-end">
        <Link
          to={"/admin/category-list"}
          className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 shadow transition"
        >
          Xem danh mục
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {[
                "STT",
                "Tên danh mục",
                "Mô tả",
                "Ngày xóa",
                "Thao tác",
              ].map((header) => (
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
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Không có danh mục đã xóa
                </td>
              </tr>
            ) : (
              categories.map((item, index) => (
                <tr
                  key={item._id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <td className="border px-4 py-2">
                    {(page - 1) * perPage + index + 1}
                  </td>
                  <td className="border px-4 py-2 font-semibold text-gray-800 max-w-xs truncate">
                    {item.name}
                  </td>
                  <td className="border px-4 py-2 max-w-md truncate">{item.description || "-"}</td>
                  <td className="border px-4 py-2 text-sm text-gray-600">
                    {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="border px-4 py-7 text-sm flex gap-3 justify-center">
                    <Popconfirm
                      title="Bạn có chắc muốn xóa vĩnh viễn danh mục này?"
                      onConfirm={() => handleDeletePermanent(item._id)}
                      okText="Xóa"
                      cancelText="Hủy"
                    >
                      <Button
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        style={{ minWidth: 80, padding: "0 12px" }}
                        className="hover:bg-red-700 transition"
                      >
                        Xóa
                      </Button>
                    </Popconfirm>

                    <Popconfirm
                      title="Bạn có chắc muốn khôi phục danh mục này?"
                      onConfirm={() => handleRestore(item._id)}
                      okText="Khôi phục"
                      cancelText="Hủy"
                    >
                      <Button
                        type="primary"
                        size="small"
                        icon={<RollbackOutlined />}
                        style={{ minWidth: 80, padding: "0 12px" }}
                        className="hover:bg-blue-800 transition"
                      >
                        Khôi phục
                      </Button>
                    </Popconfirm>
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
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              page === i + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryDelete;
