import { useEffect, useState } from "react";
// import axios from 'axios';
import { Link } from "react-router-dom";
import { useProducts } from "hooks/useProduct";
import Brand from "./components/Brand";
import Del from "./components/Del";

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
          <Brand />
          <Del />
          
          <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-lg p-0">
  <img
    alt="Three green fruit care product bottles with leaves on label and a white container behind"
    className="w-full h-full object-cover rounded-lg"
    src="/assets/images/Background2.png"
  />
</div>

        <section className="mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <div>
     <h2 className="text-gray-800 text-lg font-bold">
              New Arrivals
                <span className="text-green-700 ml-1">Deal</span>

              </h2>
              <p className="text-xs text-gray-500 font-light">
Shop online for new arrivals and get free shipping!
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
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-3">
  {data?.map((item) => (
    <Link
      to={`/products/${item._id}`}
      key={item._id}
      className="border border-gray-200 rounded-md p-3 flex flex-col items-center text-center shadow hover:shadow-lg transition hover:scale-105"
    >
      <img
        src={item.images?.[0]}
        alt={item.name}
        className="mb-3 w-full h-48 object-contain rounded"
      />
<div className="w-full h-px bg-gray-200 mb-3" />
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

        </section>
      </main>
    </div>
  );
}

export default Home;
