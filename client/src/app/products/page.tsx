"use client";

import { useCreateProductMutation, useGetProductsQuery } from "@/lib/state/api";
import { useState } from "react";
import Image from "next/image";
import Loading from "@/Loading.json";
import Lottie from "lottie-react";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import Header from "@/(components)/Header";
import Rating from "@/(components)/Rating/Rating";
import CreateProductModal from "./_components/CreateProductModal";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating?: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  /**
   * * Handle product creation and call the mutation to create a new product.
   * @param productData - The data of the product to be created.
   * @returns void
   * @description This function is called when the user submits the product creation form.
   */
  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <Lottie animationData={Loading} loop={true} className="w-1/2 h-1/2" />
      </div>
    );

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5  m-2 text-gray-500" />
          <input
            type="text"
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w05 h05 mr-2 text-gray-200" />
          Create Product
        </button>
      </div>

      {/* BODY PRODUCT LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Lottie
              animationData={Loading}
              loop={true}
              className="w-1/2 h-1/2"
            />
          </div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={`https://s3-inventory-management-bucket1.s3.ca-central-1.amazonaws.com/product${
                    Math.floor(Math.random() * 3) + 1
                  }.png`}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="mb-3 rounded-2xl h-36 w-36"
                />

                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>

                <p className="text-gray-800">${product.price.toFixed(2)}</p>

                <div className="text-sm text-gray-600 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
