// src/service/variant.service.ts

import type { Variant } from "types/variant";
import axiosClient from "utils/axiosInstance";




const PREFIX = "/admin/variants";


export const getVariantList = async (params = {}): Promise<Variant[]> => {
  const { data } = await axiosClient.get<{ variants: Variant[] }>(PREFIX, { params });
  return data.variants ?? [];
};


export const getVariantByProductId = async (productId: string): Promise<Variant> => {
  // BE đang lọc theo product_id chứ không phải _id
  const { data } = await axiosClient.get<{ variants: Variant[] }>("/admin/variants", {
    params: { product_id: productId, isDeleted: false },
  });


  // lấy biến thể đầu tiên của sản phẩm
  return (data.variants?.[0] ?? null) as unknown as Variant;
};


export const getVariantsByProductId = async (productId: string): Promise<Variant[]> => {
  const { data } = await axiosClient.get<{ variant: Variant[] }>(`/admin/variants/${productId}`);
  return data.variant ?? [];
};

export const createVariant = async (payload: Partial<Variant>): Promise<Variant> => {
  const { data } = await axiosClient.post<{ variant: Variant }>(PREFIX, payload);
  return data.variant;
};


export const updateVariant = async (id: string, payload: Partial<Variant>): Promise<Variant> => {
  const { data } = await axiosClient.put<{ variant: Variant }>(`${PREFIX}/${id}`, payload);
  return data.variant;
};


export const deleteVariant = async (id: string): Promise<Variant> => {
  const { data } = await axiosClient.delete<{ variant: Variant }>(`${PREFIX}/${id}`);
  return data.variant;
};


export const getDeletedVariants = async (page = 1, limit = 10): Promise<{
  data: Variant[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}> => {
  const { data } = await axiosClient.get(`/admin/variants/deleted?page=${page}&limit=${limit}`);
  return data;
};


export const restoreVariant = async (id: string): Promise<Variant> => {
  const { data } = await axiosClient.patch<{ variant: Variant }>(`${PREFIX}/restore/${id}`);
  return data.variant;
};


export const forceDeleteVariant = async (id: string): Promise<Variant> => {
  const { data } = await axiosClient.delete<{ message: string }>(`${PREFIX}/forcedelete/${id}`);
  // BE không trả variant sau khi xóa vĩnh viễn → trả về obj rỗng kèm message nếu cần
  return { _id: id } as unknown as Variant;
};
