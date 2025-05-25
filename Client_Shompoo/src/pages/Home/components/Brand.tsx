import React from 'react'

const Brand = () => {
  return (
    <div>
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
    </div>
  )
}

export default Brand