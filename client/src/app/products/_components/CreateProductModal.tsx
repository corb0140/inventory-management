"use client";

import Header from "@/(components)/Header";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import FormInput from "./FormInput";

interface ProductFormData {
  name: string;
  price: number;
  stockQuantity: number;
  rating?: number;
}

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  /**
   * Handle input changes and update the form data state.
   * @param e - The change event from the input field.
   * @returns void
   * @description This function updates the form data state based on the input field's name and value.
   * It converts the value to a number if the input field is for price, stock quantity, or rating.
   * It uses the spread operator to maintain the existing form data while updating the specific field.
   * The function is called on every change in the input field.
   * It uses the ChangeEvent type from React to ensure type safety.
   * The function is generic and can be used for any input field in the form.
   * @example
   * <input
   *   type="text"
   *   name="name"
   *   value={formData.name}
   *   onChange={handleChange}
   * />
   * <input
   *   type="number"
   *   name="price"
   *   value={formData.price}
   *   onChange={handleChange}
   * />
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-4">
          {/* PRODUCT NAME */}
          <FormInput
            label="Product Name"
            htmlFor="productName"
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            required
          />

          {/* PRODUCT PRICE */}
          <FormInput
            label="Product Price"
            htmlFor="productPrice"
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            required
          />

          {/* PRODUCT STOCK QUANTITY */}
          <FormInput
            label="Stock Quantity"
            htmlFor="stockQuantity"
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            required
          />

          {/* PRODUCT RATING */}
          <FormInput
            label="Product Rating"
            htmlFor="productRating"
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            required
          />

          {/* CREATE ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>

          <button
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
