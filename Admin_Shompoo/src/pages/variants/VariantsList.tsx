// src/pages/variants/VariantsList.tsx
import { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import type { Variant } from "types/variant";
import { deleteVariant, getVariantList } from "service/variants/variant.service";
  

const VariantsList = () => {
  const [data, setData] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch danh sách biến thể
  const fetchData = async () => {
    setLoading(true);
    try {
      const list = await getVariantList();
      setData(list);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách biến thể:", error);
      message.error("Không thể tải danh sách biến thể");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Xoá mềm biến thể
  const handleDelete = async (id: string) => {
    try {
      await deleteVariant(id);
      message.success("Đã xoá biến thể");
      fetchData();
    } catch {
      message.error("Xoá thất bại");
    }
  };

  const columns: ColumnsType<Variant> = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (img: string) => (
        <img
          src={img}
          alt="Ảnh"
          className="w-14 h-14 object-cover rounded border"
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: ["product_id", "name"],
      key: "product_name",
      render: (_: any, record: Variant) => record.product_id?.name ?? "-",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Mùi hương",
      dataIndex: "fragrance",
      key: "fragrance",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} ₫`,
    },
    {
      title: "Giá KM",
      dataIndex: "discount_price",
      key: "discount_price",
      render: (price: number) => `${price?.toLocaleString() || 0} ₫`,
    },
    {
      title: "Kho",
      dataIndex: "stock_quantity",
      key: "stock_quantity",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          
   
   <Button
  size="small"
  onClick={() => navigate(`/admin/variant-edit/${record._id}`)}
>
  Sửa
</Button>

          <Popconfirm
            title="Bạn chắc chắn xoá biến thể này?"
            onConfirm={() => handleDelete(record._id!)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button danger size="small">
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Danh sách biến thể</h2>
       
      </div>

      <Table
        rowKey="_id"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default VariantsList;
