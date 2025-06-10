import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import type { Product } from "types/product";
import { getAllProducts } from "services/product/product.service";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const nav = useNavigate()
  // Lấy chi tiết sản phẩm
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/client/products/${id}`);
        setProduct(res.data.data);
        
        setCurrentImage(res.data.data.images[0]); // ảnh chính mặc định
         setQuantity(1); // Đặt lại số lượng về 1 khi sản phẩm thay đổi
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Lấy 4 sản phẩm liên quan
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProducts();
        setData(result.slice(0, 4));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  const handleIncrease = () => {
    if (quantity < product.stock_quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };



  const handleAddToCart = async () => {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (!token) {
      alert("Bạn cần đăng nhập để thêm vào giỏ hàng");
      return;
    }
    await axios.post("http://localhost:8000/api/client/carts", {
      product_id: product?._id,
      quantity: quantity
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert("Đã thêm vào giỏ hàng");
    nav('/cart');
  } catch (error) {
    alert("Thêm vào giỏ hàng thất bại");
  }
};
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Image */}
        <div className="lg:w-1/2">
          <div className="border border-gray-200 rounded-md p-4">
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-auto object-contain rounded-md"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-4 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`border rounded-md p-1 w-16 h-16 flex items-center justify-center ${
                    currentImage === img ? "ring-2 ring-green-600" : "border-gray-300"
                  }`}
                  onClick={() => setCurrentImage(img)}
                >
                  <img src={img} alt={`Ảnh ${idx + 1}`} className="object-contain w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="lg:w-1/2 flex flex-col">
          <h1 className="text-gray-800 text-lg font-medium mb-2">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-2xl font-bold text-gray-900">
              {product.discount_price.toLocaleString()}₫
            </div>
            <div className="text-green-700 font-semibold text-base">
              -{Math.round(((product.price - product.discount_price) / product.price) * 100)}%
            </div>
            <div className="text-gray-400 line-through text-base">
              {product.price.toLocaleString()}₫
            </div>
            <div className="ml-auto text-sm font-semibold text-gray-700">
              Mã SP: <span className="font-normal">{product._id}</span>
            </div>
          </div>

          <div className="text-green-600 font-semibold text-sm mb-4">
            {product.stock_quantity > 0 ? "Còn hàng" : "Hết hàng"}
          </div>

          <p className="text-sm text-gray-500 mb-6 leading-relaxed">{product.description}</p>

          <ul className="text-sm text-gray-600 mb-6 space-y-1 list-disc list-inside">
            <li><span className="font-semibold">Dung tích:</span> {product.size}</li>
            <li><span className="font-semibold">Hương thơm:</span> {product.fragrance}</li>
            <li><span className="font-semibold">Loại tóc phù hợp:</span> {product.hair_type}</li>
            <li><span className="font-semibold">Xuất xứ:</span> {product.origin}</li>
          </ul>

          <div className="flex items-center gap-2">
            <button onClick={handleDecrease} className="bg-gray-700 text-white px-3 py-1 rounded">
              -
            </button>
            <div className="border px-4 py-1 rounded text-sm">{quantity}</div>
            <button onClick={handleIncrease} className="bg-gray-700 text-white px-3 py-1 rounded">
              +
            </button>
            <button  onClick={handleAddToCart} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-2 text-sm">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Suggestion Products */}
      <h2 className="text-lg font-semibold mt-10 mb-4">Có thể bạn cũng thích</h2>
      <div className="flex gap-4 p-3">
        {data?.map((item) => (
          <Link
            to={`/products/${item._id}`}
            key={item._id}
            className="w-[280px] border border-gray-200 rounded-md p-3 flex flex-col items-center text-center shadow hover:shadow-lg transition flex-shrink-0 hover:scale-105"
          >
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="mb-3 w-full h-48 object-contain rounded"
            />
<hr className="w-full border-t border-gray-300 mb-3" />

            <h3 className="font-semibold text-lg">{item.name}</h3>
            <div className="text-sm text-gray-500">{item.origin}</div>
          <div className="flex gap-2 items-center mt-1">
  <div className="text-red-600 font-bold">
    {item.discount_price.toLocaleString()}₫
  </div>
  <div className="text-gray-400 line-through text-sm">
    {item.price.toLocaleString()}₫
  </div>
</div>

          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
