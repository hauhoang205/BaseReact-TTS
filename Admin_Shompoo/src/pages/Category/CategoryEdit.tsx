import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import type { Category } from "types/category";
import { getCategoryById, updateCategory } from "service/category/category.service";

const CategoryEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Category>();

  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;
      try {
        const data = await getCategoryById(id);
        reset({
          name: data.name,
          description: data.description,
        });
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        alert("Không thể tải danh mục. Vui lòng thử lại.");
      }
    };
    fetchCategory();
  }, [id, reset]);

  const onSubmit = async (data: Category) => {
    if (!id) return;
    try {
      await updateCategory(id, data);
      alert("Cập nhật danh mục thành công!");
      navigate("/category-list");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error.message || "Đã xảy ra lỗi";
      alert("Lỗi khi cập nhật danh mục: " + errorMessage);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-8 text-center">Chỉnh sửa danh mục</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tên danh mục */}
        <div>
          <label className="block font-semibold mb-1">Tên danh mục</label>
          <input
            {...register("name", { required: true })}
            className="w-full border rounded p-2 focus:outline-none focus:ring"
            placeholder="Dầu gội, Snack khô, Mỹ phẩm..."
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Không được để trống</p>
          )}
        </div>

        {/* Mô tả */}
        <div>
          <label className="block font-semibold mb-1">Mô tả</label>
          <textarea
            {...register("description", {
              required: "Mô tả không được để trống",
              minLength: {
                value: 10,
                message: "Mô tả phải có ít nhất 10 ký tự",
              },
            })}
            className="w-full border rounded p-2 h-24 focus:outline-none focus:ring"
            placeholder="Mô tả về danh mục này..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Nút cập nhật */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded"
          >
            Cập nhật danh mục
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryEdit;
