import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getVariantById = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    const url = `${API_URL}/client/productvariant/${id}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.variant;
  } catch (error: any) {
    console.error("Failed to fetch variant:", error);
    throw error;
  }
};
