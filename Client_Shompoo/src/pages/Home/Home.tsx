import { useEffect, useState } from "react";
// import axios from 'axios';
import { Link } from "react-router-dom";
import { useProducts } from "hooks/useProduct";

function Home() {
  const { data, loading } = useProducts();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <section className="flex flex-col md:flex-row items-center bg-gray-100 rounded-lg p-6 md:p-10 gap-6 md:gap-12">
          <div className="flex-1 max-w-md">
            <p className="text-sm text-green-700 font-semibold mb-2">
              Starting at
              <span className="text-green-700">$ 29.99</span>
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 leading-tight mb-6">
              Explore fresh &amp;
              <br />
              juicy fruits
            </h1>
            <button
              className="bg-gray-800 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-gray-900 transition"
              type="button"
            >

              Shop Now »
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              alt="Three green fruit care product bottles with leaves on label and a white container behind"
              className="max-w-full h-auto rounded-md"
              height="200"
              src="https://storage.googleapis.com/a1aa/image/892d8aa0-cf6e-4739-fd84-1f68fdab2cf8.jpg"
              width="400"
            />
          
          </div>
        </section>
        <section className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          <div className="border border-gray-300 rounded-md p-4 flex flex-col items-center relative">
            <div className="absolute top-2 right-2 bg-gray-300 text-xs text-gray-700 font-semibold px-1.5 rounded">
              20%
            </div>
            <i className="fas fa-user text-xl mb-2"></i>
            <h3 className="text-center font-semibold text-gray-800 mb-1">
              Natural
            </h3>
            <p className="text-xs text-gray-500">320 Items</p>
          </div>
          <div className="border border-green-200 rounded-md p-4 flex flex-col items-center relative">
            <div className="absolute top-2 right-2 bg-green-200 text-xs text-green-700 font-semibold px-1.5 rounded">
              30%
            </div>
            <i className="fas fa-cannabis text-xl mb-2"></i>
            <h3 className="text-center font-semibold text-gray-800 mb-1">
              Tobacco
            </h3>
            <p className="text-xs text-gray-500">45 Items</p>

          </div>
          <div className="border border-pink-200 rounded-md p-4 flex flex-col items-center relative">
            <div className="absolute top-2 right-2 bg-pink-200 text-xs text-pink-700 font-semibold px-1.5 rounded">
              85%
            </div>
            <i className="fas fa-shower text-xl mb-2"></i>
            <h3 className="text-center font-semibold text-gray-800 mb-1">
              Shampoo
            </h3>
            <p className="text-xs text-gray-500">541 Items</p>

          </div>
          <div className="border border-purple-200 rounded-md p-4 flex flex-col items-center relative">
            <div className="absolute top-2 right-2 bg-purple-200 text-xs text-purple-700 font-semibold px-1.5 rounded">
              10%
            </div>
            <i className="fas fa-head-side-water text-xl mb-2"></i>
            <h3 className="text-center font-semibold text-gray-800 mb-1">
              Hair Washing
            </h3>
            <p className="text-xs text-gray-500">48 Items</p>
          </div>
          <div className="border border-blue-200 rounded-md p-4 flex flex-col items-center relative">
            <i className="fas fa-cut text-xl mb-2"></i>
            <h3 className="text-center font-semibold text-gray-800 mb-1">
              Hairdresser
            </h3>
            <p className="text-xs text-gray-500">511 Items</p>
          </div>
          <div className="border border-yellow-200 rounded-md p-4 flex flex-col items-center relative">
            <i className="fas fa-broom text-xl mb-2"></i>
            <h3 className="text-center font-semibold text-gray-800 mb-1">
              Hair Cleanser
            </h3>
            <p className="text-xs text-gray-500">845 Items</p>

          </div>
        </section>
        <section className="mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <div>
              <h2 className="text-gray-800 font-semibold text-lg mb-1">
                Day Of The
                <span className="text-green-700">Deal</span>

              </h2>
              <p className="text-xs text-gray-500 font-light">
                Don't wait. The time will never be just right.
              </p>
            </div>
            <div>
              <p className="text-xs font-mono text-gray-700 border border-gray-300 rounded px-2 py-1">
                25 Days
                <span className="font-semibold">23</span>:
                <span className="font-semibold">59</span>:
                <span className="font-semibold">64</span>

              </p>
            </div>
          </div>
          <div className="flex overflow-x-auto gap-4 p-3">
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

                <h3 className="font-semibold text-lg">{item.name}</h3>
                <div className="text-sm text-gray-500">{item.origin}</div>
                <div className="mt-1 text-red-600 font-bold">
                  {item.discount_price.toLocaleString()}₫
                </div>
                <div className="text-gray-400 line-through text-sm">
                  {item.price.toLocaleString()}₫
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
