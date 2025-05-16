import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;  // Lấy URL từ .env

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/data-endpoint`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* <h1>Data from Backend API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
   <section className="flex flex-col md:flex-row items-center bg-gray-100 rounded-lg p-6 md:p-10 gap-6 md:gap-12">
    <div className="flex-1 max-w-md">
     <p className="text-sm text-green-700 font-semibold mb-2">
      Starting at
      <span className="text-green-700">
       $ 29.99
      </span>
     </p>
     <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 leading-tight mb-6">
      Explore fresh &amp;
      <br/>
      juicy fruits
     </h1>
     <button className="bg-gray-800 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-gray-900 transition" type="button">
      Shop Now »
     </button>
    </div>
    <div className="flex-1 flex justify-center">
     <img alt="Three green fruit care product bottles with leaves on label and a white container behind" className="max-w-full h-auto rounded-md" height="200" src="https://storage.googleapis.com/a1aa/image/892d8aa0-cf6e-4739-fd84-1f68fdab2cf8.jpg" width="400"/>
    </div>
   </section>
   <section className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
    <div className="border border-gray-300 rounded-md p-4 flex flex-col items-center relative">
     <div className="absolute top-2 right-2 bg-gray-300 text-xs text-gray-700 font-semibold px-1.5 rounded">
      20%
     </div>
     <i className="fas fa-user text-xl mb-2">
     </i>
     <h3 className="text-center font-semibold text-gray-800 mb-1">
      Natural
     </h3>
     <p className="text-xs text-gray-500">
      320 Items
     </p>
    </div>
    <div className="border border-green-200 rounded-md p-4 flex flex-col items-center relative">
     <div className="absolute top-2 right-2 bg-green-200 text-xs text-green-700 font-semibold px-1.5 rounded">
      30%
     </div>
     <i className="fas fa-cannabis text-xl mb-2">
     </i>
     <h3 className="text-center font-semibold text-gray-800 mb-1">
      Tobacco
     </h3>
     <p className="text-xs text-gray-500">
      45 Items
     </p>
    </div>
    <div className="border border-pink-200 rounded-md p-4 flex flex-col items-center relative">
     <div className="absolute top-2 right-2 bg-pink-200 text-xs text-pink-700 font-semibold px-1.5 rounded">
      85%
     </div>
     <i className="fas fa-shower text-xl mb-2">
     </i>
     <h3 className="text-center font-semibold text-gray-800 mb-1">
      Shampoo
     </h3>
     <p className="text-xs text-gray-500">
      541 Items
     </p>
    </div>
    <div className="border border-purple-200 rounded-md p-4 flex flex-col items-center relative">
     <div className="absolute top-2 right-2 bg-purple-200 text-xs text-purple-700 font-semibold px-1.5 rounded">
      10%
     </div>
     <i className="fas fa-head-side-water text-xl mb-2">
     </i>
     <h3 className="text-center font-semibold text-gray-800 mb-1">
      Hair Washing
     </h3>
     <p className="text-xs text-gray-500">
      48 Items
     </p>
    </div>
    <div className="border border-blue-200 rounded-md p-4 flex flex-col items-center relative">
     <i className="fas fa-cut text-xl mb-2">
     </i>
     <h3 className="text-center font-semibold text-gray-800 mb-1">
      Hairdresser
     </h3>
     <p className="text-xs text-gray-500">
      511 Items
     </p>
    </div>
    <div className="border border-yellow-200 rounded-md p-4 flex flex-col items-center relative">
     <i className="fas fa-broom text-xl mb-2">
     </i>
     <h3 className="text-center font-semibold text-gray-800 mb-1">
      Hair Cleanser
     </h3>
     <p className="text-xs text-gray-500">
      845 Items
     </p>
    </div>
   </section>
   <section className="mt-12">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
     <div>
      <h2 className="text-gray-800 font-semibold text-lg mb-1">
       Day Of The
       <span className="text-green-700">
        Deal
       </span>
      </h2>
      <p className="text-xs text-gray-500 font-light">
       Don't wait. The time will never be just right.
      </p>
     </div>
     <div>
      <p className="text-xs font-mono text-gray-700 border border-gray-300 rounded px-2 py-1">
       25 Days
       <span className="font-semibold">
        23
       </span>
       :
       <span className="font-semibold">
        59
       </span>
       :
       <span className="font-semibold">
        64
       </span>
      </p>
     </div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
     <article className="border border-gray-200 rounded-md p-3 flex flex-col items-center text-center">
      <img alt="Bottle of Mixed Nuts Berries Pack product with dark red label" className="mb-3 max-w-full h-auto" height="160" src="https://storage.googleapis.com/a1aa/image/6b1caa7f-f750-4aa5-ca12-1f413a618fec.jpg" width="120"/>
      <p className="text-xs text-gray-500 mb-1">
       Dried Fruits
      </p>
      <h3 className="text-xs font-semibold text-gray-800 mb-1">
       Mixed Nuts Berries Pack
      </h3>
      <div className="flex items-center gap-1 mb-1">
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="far fa-star text-yellow-400 text-xs">
       </i>
      </div>
      <div className="flex gap-2 items-center">
       <span className="text-sm font-bold text-gray-900">
        $56.00
       </span>
       <span className="text-xs line-through text-gray-400">
        $45.00
       </span>
      </div>
     
     </article>
     <article className="border border-gray-200 rounded-md p-3 flex flex-col items-center text-center relative">
      <img alt="Two boxes of Multi Grain Combo Cookies with beige packaging" className="mb-3 max-w-full h-auto" height="160" src="https://storage.googleapis.com/a1aa/image/5c59f301-d631-4967-e1ec-e4397c08c41d.jpg" width="120"/>
      <p className="text-xs text-gray-500 mb-1">
       Cookies
      </p>
      <h3 className="text-xs font-semibold text-gray-800 mb-1">
       Multi Grain Combo Cookies
      </h3>
      <div className="flex items-center gap-1 mb-1">
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="far fa-star text-yellow-400 text-xs">
       </i>
       <i className="far fa-star text-yellow-400 text-xs">
       </i>
      </div>
      <div className="flex gap-2 items-center">
       <span className="text-sm font-bold text-gray-900">
        $30.00
       </span>
       <span className="text-xs line-through text-gray-400">
        $25.00
       </span>
      </div>
      <span className="text-xs text-gray-400">
       10kg
      </span>
      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
       SALE
      </div>
     </article>
     <article className="border border-gray-200 rounded-md p-3 flex flex-col items-center text-center">
      <img alt="Fresh Mango Juice Pack bottle with yellow cap and mango image on label" className="mb-3 max-w-full h-auto" height="160" src="https://storage.googleapis.com/a1aa/image/aa0175a7-bc2c-4c9a-0413-8bde20e93daa.jpg" width="120"/>
      <p className="text-xs text-gray-500 mb-1">
       Foods
      </p>
      <h3 className="text-xs font-semibold text-gray-800 mb-1">
       Fresh Mango Juice Pack
      </h3>
      <div className="flex items-center gap-1 mb-1">
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="far fa-star text-yellow-400 text-xs">
       </i>
      </div>
      <div className="flex gap-2 items-center">
       <span className="text-sm font-bold text-gray-900">
        $65.00
       </span>
       <span className="text-xs line-through text-gray-400">
        $46.00
       </span>
      </div>
     </article>
     <article className="border border-gray-200 rounded-md p-3 flex flex-col items-center text-center relative">
      <img alt="Two bottles of Dates Value Fresh Pouch with red and white labels" className="mb-3 max-w-full h-auto" height="160" src="https://storage.googleapis.com/a1aa/image/4ec2bb6f-6323-4048-0676-dd1525a29b23.jpg" width="120"/>
      <p className="text-xs text-gray-500 mb-1">
       Dried Fruits
      </p>
      <h3 className="text-xs font-semibold text-gray-800 mb-1">
       Dates Value Fresh Pouch
      </h3>
      <div className="flex items-center gap-1 mb-1">
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="far fa-star text-yellow-400 text-xs">
       </i>
      </div>
      <div className="flex gap-2 items-center">
       <span className="text-sm font-bold text-gray-900">
        $85.00
       </span>
       <span className="text-xs line-through text-gray-400">
        $78.60
       </span>
      </div>
      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded" >
       SALE
      </div>
     </article>
     <article className="border border-gray-200 rounded-md p-3 flex flex-col items-center text-center">
      <img alt="Stick Fiber Masala Magic bottle with black label and pump" className="mb-3 max-w-full h-auto" height="160" src="https://storage.googleapis.com/a1aa/image/62a3b87e-5d4b-49f5-b0bf-04daef37ad03.jpg" width="120"/>
      <p className="text-xs text-gray-500 mb-1">
       Foods
      </p>
      <h3 className="text-xs font-semibold text-gray-800 mb-1">
       Stick Fiber Masala Magic
      </h3>
      <div className="flex items-center gap-1 mb-1">
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="fas fa-star text-yellow-400 text-xs">
       </i>
       <i className="far fa-star text-yellow-400 text-xs">
       </i>
      </div>
      <div className="flex gap-2 items-center">
       <span className="text-sm font-bold text-gray-900">
        $50.00
       </span>
       <span className="text-xs line-through text-gray-400">
        $45.00
       </span>
      </div>
      <span className="text-xs text-green-600 font-semibold">
       NEW
      </span>
     </article>
    </div>
   </section>
  </main>


    </div>
  );
}

export default Home;
