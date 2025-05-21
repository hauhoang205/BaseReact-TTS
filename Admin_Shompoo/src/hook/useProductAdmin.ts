// hooks/useProducts.ts
import { useEffect, useState } from "react";
import { getAllProducts } from "service/product/product.service";
import type { Product } from "types/product";

export const useProducts = () => {
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProducts();
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
