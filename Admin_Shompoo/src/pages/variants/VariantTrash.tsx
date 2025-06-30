import { Button, Popconfirm, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  getDeletedVariants,
  forceDeleteVariant,
  restoreVariant,
} from "service/variants/variant.service";
import type { Variant } from "types/variant";
import { DeleteOutlined, RollbackOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const VariantTrash = () => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  const fetchDeletedVariants = async (pageNumber = 1) => {
    try {
      const { data, pagination } = await getDeletedVariants(pageNumber, perPage);
      setVariants(data);
      setTotalPages(pagination?.totalPages || 1);
    } catch (error) {
      console.error("Lỗi khi lấy biến thể đã xoá:", error);
      message.error("Lỗi khi lấy biến thể đã xoá");
    }
  };

  useEffect(() => {
    fetchDeletedVariants(page);
  }, [page]);

  const handleDeletePermanent = async (id: string) => {
    try {
      await forceDeleteVariant(id);
      message.success("Xoá vĩnh viễn biến thể thành công");
      fetchDeletedVariants(page);
    } catch (error) {
      console.error("Lỗi khi xoá vĩnh viễn biến thể:", error);
      message.error("Lỗi khi xoá vĩnh viễn biến thể");
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await restoreVariant(id);
      message.success("Khôi phục biến thể thành công");
      fetchDeletedVariants(page);
    } catch (error) {
      console.error("Lỗi khi khôi phục biến thể:", error);
      message.error("Lỗi khi khôi phục biến thể");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Biến thể đã xoá mềm</h2>
        <Link
          to="/admin/variant-list"
          className="px-4 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300"
        >
          Quay về danh sách
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-center border-gray-300">
          <thead className="bg-blue-50 text-blue-800 text-sm font-semibold uppercase tracking-wide">
            <tr>
              {[
                "STT",
                "Hình ảnh",
                "Tên sản phẩm",
                "Size",
                "Mùi hương",
                "Giá",
                "Giá KM",
                "Kho",
                "Ngày xoá",
                "Hành động",
              ].map((text) => (
                <th key={text} className="border px-3 py-3">
                  {text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variants.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-6 text-gray-500">
                  Không có biến thể nào đã xóa
                </td>
              </tr>
            ) : (
              variants.map((item, index) => (
                <tr
                  key={item._id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <td className="border px-3 py-2">{(page - 1) * perPage + index + 1}</td>
                  <td className="border px-3 py-2">
                    <img
                      src={item.image}
                      alt="Ảnh"
                      className="w-14 h-14 object-cover rounded border mx-auto"
                    />
                  </td>
                  <td className="border px-3 py-2 font-medium text-gray-800">
                    {typeof item.product_id === "object" && item.product_id?.name
                      ? item.product_id.name
                      : "Không rõ"}
                  </td>
                  <td className="border px-3 py-2">{item.size}</td>
                  <td className="border px-3 py-2">{item.fragrance}</td>
                  <td className="border px-3 py-2 text-right pr-4">
                    {item.price?.toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="border px-3 py-2 text-right pr-4">
                    {item.discount_price?.toLocaleString("vi-VN") || 0} ₫
                  </td>
                  <td className="border px-3 py-2">{item.stock_quantity}</td>
                  <td className="border px-3 py-2 text-gray-600">
                    {new Date(item.updatedAt || item.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="border px-3 py-2">
                    <div className="flex justify-center gap-2">
                      <Popconfirm
                        title="Bạn chắc chắn xoá vĩnh viễn?"
                        onConfirm={() => handleDeletePermanent(item._id)}
                        okText="Xoá"
                        cancelText="Huỷ"
                      >
                        <Button
                          danger
                          size="small"
                          icon={<DeleteOutlined />}
                          className="!text-xs"
                        >
                          Xoá
                        </Button>
                      </Popconfirm>
                      <Popconfirm
                        title="Khôi phục biến thể này?"
                        onConfirm={() => handleRestore(item._id)}
                        okText="Khôi phục"
                        cancelText="Huỷ"
                      >
                        <Button
                          size="small"
                          icon={<RollbackOutlined />}
                          className="bg-green-600 hover:bg-green-700 text-white border-none !text-xs"
                        >
                          Khôi phục
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

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-md text-sm border transition-all ${
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

export default VariantTrash;
