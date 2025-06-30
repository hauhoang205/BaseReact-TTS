// src/pages/variants/VariantsAdd.tsx

import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import type { Product } from "types/product";
import { getAllProducts } from "service/product/product.service";
import { createVariant } from "service/variants/variant.service";
import type { Variant } from "types/variant";

const { Option } = Select;

export default function VariantsAdd() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch danh sách sản phẩm
  useEffect(() => {
    (async () => {
      try {
        const raw = await getAllProducts();
        let extracted: Product[] = [];

        if (Array.isArray(raw)) {
          extracted = raw;
        } else if (raw?.products) {
          extracted = raw.products;
        } else if (raw?.data?.products) {
          extracted = raw.data.products;
        }

        if (Array.isArray(extracted)) {
          setProducts(extracted);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Lỗi tải sản phẩm:", err);
        message.error("Không thể tải danh sách sản phẩm");
        setProducts([]);
      }
    })();
  }, []);

  // Gửi form tạo biến thể
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const payload: Partial<Variant> = {
        ...values,
        price: Number(values.price),
        discount_price: Number(values.discount_price),
        stock_quantity: Number(values.stock_quantity),
        images: values.images.filter((img: string) => img?.trim()),
      };
      await createVariant(payload);
      message.success("Thêm biến thể thành công");
      navigate("/admin/variant-list");
    } catch (err) {
      console.error("Lỗi tạo biến thể:", err);
      message.error("Thêm biến thể thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6" >Thêm biến thể</h2>

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ images: [""] }}
      >
        <Form.Item
          label="Sản phẩm cha"
          name="product_id"
          rules={[{ required: true, message: "Chọn sản phẩm" }]}
        >
          <Select placeholder="Chọn sản phẩm">
            {products.map((p) => (
              <Option key={p._id} value={p._id}>
                {p.name || p._id}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Size" name="size">
          <Input />
        </Form.Item>
        <Form.Item label="Mùi hương" name="fragrance">
          <Input />
        </Form.Item>
        <Form.Item label="Loại tóc" name="hair_type">
          <Input />
        </Form.Item>

        <Form.Item label="Giá" name="price" rules={[{ required: true, message: "Nhập giá" }]}> 
          <InputNumber className="w-full" min={0} />
        </Form.Item>
        <Form.Item label="Giá KM" name="discount_price">
          <InputNumber className="w-full" min={0} />
        </Form.Item>
        <Form.Item label="Tồn kho" name="stock_quantity">
          <InputNumber className="w-full" min={0} />
        </Form.Item>

        <Form.Item label="Ảnh đại diện" name="image" rules={[{ required: true, message: "Nhập URL ảnh" }]}> 
          <Input placeholder="https://..." />
        </Form.Item>

        <Form.List
          name="images"
          rules={[{
            validator: async (_, value) => {
              if (!value || !value.length || value.some((v: string) => !v || !v.trim())) {
                return Promise.reject(new Error("Cần ít nhất 1 ảnh phụ hợp lệ"));
              }
            },
          }]}
        >
          {(fields, { add, remove }) => (
            <>
              <label className="block font-medium mb-1">Ảnh phụ</label>
              {fields.map(({ key, name, fieldKey }) => (
                <Space key={key} align="baseline" className="flex mb-2">
                  <Form.Item
                    name={name}
                    fieldKey={fieldKey}
                    className="flex-1"
                    rules={[{ required: true, message: "Nhập URL ảnh" }]}
                  >
                    <Input placeholder="https://..." />
                  </Form.Item>
                  {fields.length > 1 && (
                    <Button onClick={() => remove(name)} danger>Xoá</Button>
                  )}
                </Space>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                Thêm ảnh phụ
              </Button>
            </>
          )}
        </Form.List>

        <Form.Item className="mt-4">
          <Button type="primary" htmlType="submit" loading={loading}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
