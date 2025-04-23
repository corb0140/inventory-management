'use client";';

import { useGetDashboardMetricsQuery } from "@/lib/state/api";
import { ShoppingBag } from "lucide-react";
import Rating from "@/(components)/Rating/Rating";
import Loading from "@/Loading.json";
import Lottie from "lottie-react";
import Image from "next/image";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Lottie animationData={Loading} loop={true} className="w-1/2 h-1/2" />
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular Products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {dashboardMetrics?.popularProducts.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-3">
                  <Image
                    src={`https://s3-inventory-management-bucket1.s3.ca-central-1.amazonaws.com/product${
                      Math.floor(Math.random() * 3) + 1
                    }.png`}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="rounded-lg h-14 w-14"
                  />
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">
                      {product.name}
                    </div>
                    <div className="flex text-sm items-center">
                      <span className="font-bold text-blue-500 text-xs">
                        ${product.price}
                      </span>
                      <span className="mx-2">|</span>
                      <Rating rating={product.rating || 0} />
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="text-xs flex items-center">
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {Math.round(product.stockQuantity / 1000)}k sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
