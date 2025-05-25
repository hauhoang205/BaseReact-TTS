import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { Category } from "types/category";
import { createCategory } from 'service/category/category.service';

const CategoryAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Category>();
  const nav = useNavigate();

 const onSubmit = async (data: Category) => {
  try {
    await createCategory(data);
    alert("Thêm danh mục thành công!");
    nav("/category-list");
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || error.message || "Đã xảy ra lỗi";
    alert("Lỗi khi thêm danh mục: " + errorMessage);
    console.error(error);
  }
};


  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-8 text-center">Thêm danh mục mới</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

        <div className="text-center">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded"
          >
            Thêm danh mục
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryAdd;
