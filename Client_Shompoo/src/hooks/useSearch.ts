import { useEffect, useState, useRef } from "react";
import { getAllProducts } from "services/product/product.service";
import type { Product } from "types/product";

export const useSearchProducts = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      // Khi query rỗng thì không hiện kết quả gì
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getAllProducts(query);
        setData(result);
      } catch (err) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query]);

  return { data, loading, error, query, setQuery };
};
