import { useSearchProducts } from 'hooks/useSearch';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type Props = {};

type Category = { _id: string; name: string };

const Header = (props: Props) => {
  const { data, loading, error, query, setQuery } = useSearchProducts();
  const nav = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Click ngoài dropdown tìm kiếm
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch danh mục khi mở dropdown
  useEffect(() => {
    if (showCategoryDropdown && categories.length === 0) {
      fetch('http://localhost:8000/api/client/categories')
        .then((res) => {
          if (res.status === 200) return res.json();
          throw new Error(`Unexpected status: ${res.status}`);
        })
        .then((resData) => {
          const categoryArray = resData?.data?.data;
          if (Array.isArray(categoryArray)) {
            setCategories(categoryArray);
          } else {
            setCategories([]);
          }
        })
        .catch((err) => {
          console.error('Lỗi khi gọi API categories:', err);
          setCategories([]);
        });
    }
  }, [showCategoryDropdown, categories.length]);

  // Click ngoài dropdown danh mục
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
    }
    if (showCategoryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCategoryDropdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data && data.length > 0) {
      nav(`/products/${data[0]._id}`);
      setShowDropdown(false);
    } else {
      alert("Không có sản phẩm phù hợp");
    }
  };

  const handleClickProduct = (id: string) => {
    nav(`/products/${id}`);
    setShowDropdown(false);
  };

  return (
    <div className="bg-green-50 text-gray-700 text-[14px] leading-none select-none">
      {/* Top Header */}
      <div className="flex justify-between items-center px-6 sm:px-8 md:px-12 py-2 border-b border-gray-300">
        <div className="flex space-x-8">
          <div className="flex items-center space-x-2">
            <i className="fas fa-phone-alt text-[14px]"></i>
            <span>+91 987 654 3210</span>
          </div>
        </div>
        <div className="text-[14px] text-center text-gray-500 select-text">
          "Your No.1 Online Hair Care Destination"
        </div>
        <div className="flex gap-x-3 text-[14px]">
          <button className="hover:text-gray-800">Help?</button>
          <button className="hover:text-gray-800">Track Order?</button>
          <div className="relative group cursor-pointer">
            <button className="flex items-center gap-x-2 hover:text-gray-800">
              <span>English</span>
              <i className="fas fa-chevron-down text-[10px]"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Logo + Search + Account/Wishlist/Cart */}
      <div className="flex items-center justify-between px-6 sm:px-8 md:px-12 py-6 border-b border-gray-300">
        <div>
          <img src="/assets/images/logo-Hair.png" alt="Logo Hair" className="h-18 rounded-md ml-12" />
        </div>

        {/* Search */}
        <div className="flex-1 max-w-lg mx-8 relative" ref={containerRef}>
          <form className="relative w-full" onSubmit={handleSubmit}>
            <input
              className="w-full border border-gray-300 rounded-md py-3 px-4 text-[14px] text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Search Products..."
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => {
                if (query.trim() !== "") setShowDropdown(true);
              }}
            />
            <button
              aria-label="Search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              type="submit"
            >
              <i className="fas fa-search text-[16px]"></i>
            </button>

            {showDropdown && query.trim() !== "" && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
                {loading && <p className="p-2 text-center text-gray-500">Loading...</p>}
                {error && <p className="p-2 text-center text-red-500">{error}</p>}
                {!loading && data && data.length > 0 ? (
                  data.map((p) => (
                    <div
                      key={p._id}
                      className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleClickProduct(p._id)}
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <p className="text-gray-700">{p.name}</p>
                    </div>
                  ))
                ) : (
                  !loading && <p className="p-2 text-center text-gray-500">Không tìm thấy sản phẩm</p>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Account/Wishlist/Cart */}
        <div className="flex items-center space-x-10 text-[12px] text-gray-700">
          <Link to="/login" className="hover:text-gray-900">
            <div className="flex items-center space-x-2 cursor-pointer">
              <i className="fas fa-user text-[22px]"></i>
              <div className="leading-none">
                <div>Account</div>
                <div className="font-semibold text-[13px]">LOGIN</div>
              </div>
            </div>
          </Link>

          <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-900">
            <i className="fas fa-heart text-[22px]"></i>
            <div className="leading-none">
              <div>Wishlist</div>
              <div className="font-semibold text-[13px]">3-ITEMS</div>
            </div>
          </div>
    <Link to="/cart">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-900">
            <i className="fas fa-shopping-bag text-[22px]"></i>
           
              <div className="leading-none">
              <div>Cart</div>
            </div>
         
          
          </div>
             </Link>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex items-center justify-between px-6 sm:px-8 md:px-12 py-4 border-b border-gray-300 text-[14px] text-gray-700 select-none">
        {/* All Categories */}
        <div className="relative" ref={categoryDropdownRef}>
          <button
            aria-label="All Categories"
            className="flex items-center space-x-3 bg-green-600 text-white rounded-md px-4 py-2 font-medium hover:bg-green-700"
            onClick={() => setShowCategoryDropdown((prev) => !prev)}
          >
            <i className="fas fa-th-large text-[16px]"></i>
            <span>All Categories</span>
            <i className="fas fa-chevron-down text-[12px]"></i>
          </button>
          {showCategoryDropdown && (
            <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg z-50">
              {categories.length === 0 ? (
                <div className="p-3 text-gray-500 text-center">Loading...</div>
              ) : (
                categories
                  .filter((cat) => cat.name !== 'Danh mục mặc định')
                  .map((cat) => (
                    <button
                      type="button"
                      key={cat._id}
                      onClick={() => {
                        nav(`/category/${cat._id}`);
                        setShowCategoryDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-green-50 text-gray-700 cursor-pointer"
                    >
                      {cat.name}
                    </button>
                  ))
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex gap-x-8 justify-between font-medium px-4">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <button className="hover:text-green-600">Products</button>
          <button className="hover:text-green-600">Blog</button>
          <button className="hover:text-green-600">Pages</button>
          <button className="hover:text-green-600 font-medium">Offers</button>
        </nav>

        {/* Location */}
        <div>
          <button
            aria-label="New York location"
            className="flex items-center space-x-3 bg-green-600 text-white rounded-md px-4 py-2 font-medium hover:bg-green-700"
          >
            <i className="fas fa-map-marker-alt text-[16px]"></i>
            <span>New York</span>
            <i className="fas fa-chevron-down text-[12px]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
