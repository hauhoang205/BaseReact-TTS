import React from "react";
import { Link } from 'react-router-dom';
import { useProducts } from 'hooks/useProduct';
const Cart = () => {
   const { data, loading } = useProducts();

  if (loading) return <div>Loading...</div>;
  return (
    <div className="bg-white text-gray-700 font-sans">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:space-x-10">
          {/* Left Summary Panel */}
          <div className="bg-gray-50 p-6 rounded-md w-full md:w-1/3">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-700">Summary</h2>
              <button
                aria-expanded="false"
                className="text-xs text-gray-500 mt-1 w-full text-left"
                type="button"
              >
                Estimate Shipping
                <i className="fas fa-chevron-down ml-1 text-gray-400"></i>
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Enter your destination to get a shipping estimate
            </p>
            <form className="space-y-4">
              <div>
                <label
                  className="block text-xs font-semibold text-gray-600 mb-1"
                  htmlFor="country"
                >
                  Country
                  <span className="text-red-600">*</span>
                </label>
                <select
                  className="w-full border border-gray-200 rounded-md text-xs text-gray-500 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
                  id="country"
                  name="country"
                >
                  <option>Country</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-xs font-semibold text-gray-600 mb-1"
                  htmlFor="state"
                >
                  State/Province
                </label>
                <select
                  className="w-full border border-gray-200 rounded-md text-xs text-gray-500 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
                  id="state"
                  name="state"
                >
                  <option></option>
                </select>
              </div>
            </form>
            <div className="mt-10 text-xs text-gray-600">
              <div className="flex justify-between mb-1">
                <span>Sub-Total</span>
                <span className="text-gray-700 font-normal">$162.00</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Delivery Charges</span>
                <span className="text-gray-700 font-normal">$32.40</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Coupon Discount</span>
                <a className="text-green-500 hover:underline" href="#">
                  Apply Discount
                </a>
              </div>
              <div className="flex justify-between font-semibold mt-4">
                <span>Total Amount</span>
                <span className="text-gray-900">$194.40</span>
              </div>
            </div>
          </div>
          {/* Right Products Table */}
          <div className="flex-1 mt-8 md:mt-0">
            <table className="w-full text-xs text-gray-600 border-separate border-spacing-y-4">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="pl-2">Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border border-gray-100 rounded-md align-middle">
                  <td className="pl-2 py-3 flex items-center space-x-3">
                    <img
                      alt="Women's wallet Hand Purse brown color"
                      className="w-10 h-10 object-contain"
                      height={40}
                      src="https://storage.googleapis.com/a1aa/image/d1ee0071-f285-4009-1766-cbf8c77dc3f4.jpg"
                      width={40}
                    />
                    <span>Women's wallet Hand Purse</span>
                  </td>
                  <td className="text-center">$70</td>
                  <td className="text-center">
                    <div className="inline-flex border border-gray-200 rounded-md overflow-hidden">
                      <button
                        aria-label="Decrease quantity"
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input
                        className="w-8 text-center text-xs border-l border-r border-gray-200 focus:outline-none"
                        readOnly
                        type="text"
                        defaultValue={1}
                      />
                      <button
                        aria-label="Increase quantity"
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-center">$70</td>
                  <td className="text-center">
                    <button aria-label="Delete item">
                      <i className="fas fa-trash-alt text-gray-400 hover:text-gray-600"></i>
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border border-gray-100 rounded-md align-middle">
                  <td className="pl-2 py-3 flex items-center space-x-3">
                    <img
                      alt="Rose Gold Earring green and gold color"
                      className="w-10 h-10 object-contain"
                      height={40}
                      src="https://storage.googleapis.com/a1aa/image/5796b2c9-3f95-439d-7aa3-76b4184dbc51.jpg"
                      width={40}
                    />
                    <span>Rose Gold Earring</span>
                  </td>
                  <td className="text-center">$80</td>
                  <td className="text-center">
                    <div className="inline-flex border border-gray-200 rounded-md overflow-hidden">
                      <button
                        aria-label="Decrease quantity"
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input
                        className="w-8 text-center text-xs border-l border-r border-gray-200 focus:outline-none"
                        readOnly
                        type="text"
                        defaultValue={1}
                      />
                      <button
                        aria-label="Increase quantity"
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-center">$80</td>
                  <td className="text-center">
                    <button aria-label="Delete item">
                      <i className="fas fa-trash-alt text-gray-400 hover:text-gray-600"></i>
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border border-gray-100 rounded-md align-middle">
                  <td className="pl-2 py-3 flex items-center space-x-3">
                    <img
                      alt="Apple product box beige color"
                      className="w-10 h-10 object-contain"
                      height={40}
                      src="https://storage.googleapis.com/a1aa/image/5892f859-9530-4ba9-5e79-679aa1a1c644.jpg"
                      width={40}
                    />
                    <span>Apple</span>
                  </td>
                  <td className="text-center">$12</td>
                  <td className="text-center">
                    <div className="inline-flex border border-gray-200 rounded-md overflow-hidden">
                      <button
                        aria-label="Decrease quantity"
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input
                        className="w-8 text-center text-xs border-l border-r border-gray-200 focus:outline-none"
                        readOnly
                        type="text"
                        defaultValue={1}
                      />
                      <button
                        aria-label="Increase quantity"
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-center">$12</td>
                  <td className="text-center">
                    <button aria-label="Delete item">
                      <i className="fas fa-trash-alt text-gray-400 hover:text-gray-600"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-6">
              <a
                className="text-xs text-gray-600 underline hover:text-gray-800"
                href="#"
              >
                Continue Shopping
              </a>
              <button className="bg-green-400 text-white text-xs px-4 py-1 rounded-md hover:bg-green-500">
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
     <div className="flex gap-4 p-3">
            {data?.slice(0, 4).map((item) => (
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

export default Cart;
