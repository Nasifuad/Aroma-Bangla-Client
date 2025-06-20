/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import { useProductStore } from "@/store/useProductStore";
import { NewProductInput } from "@/store/interface";

const AddProductPage = () => {
  const { addProduct } = useProductStore();
  const [form, setForm] = useState<NewProductInput>({
    name: "",
    brand: "",
    description: "",
    tags: "",
    price: "",
    discount: 0,
    quantity: "",
    sold: "0",
    netWeight: "",
    type: "",
    flavor: "",
    reviews: "",
    rating: "",
    user: "",
    image_small: [],
    image_big: [],
  });

  const [imageSmallPreviews, setImageSmallPreviews] = useState<string[]>([]);
  const [imageBigPreviews, setImageBigPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const smallImageInputRef = useRef<HTMLInputElement>(null);
  const bigImageInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "small" | "big"
  ) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => URL.createObjectURL(file));

    if (type === "small") {
      setForm({ ...form, image_small: files });
      setImageSmallPreviews(previews);
    } else {
      setForm({ ...form, image_big: files });
      setImageBigPreviews(previews);
    }
  };

  const removeImage = (index: number, type: "small" | "big") => {
    if (type === "small") {
      const newImages = form.image_small.filter((_, i) => i !== index);
      const newPreviews = imageSmallPreviews.filter((_, i) => i !== index);
      setForm({ ...form, image_small: newImages });
      setImageSmallPreviews(newPreviews);
    } else {
      const newImages = form.image_big.filter((_, i) => i !== index);
      const newPreviews = imageBigPreviews.filter((_, i) => i !== index);
      setForm({ ...form, image_big: newImages });
      setImageBigPreviews(newPreviews);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "Product name is required";
    if (!form.brand) newErrors.brand = "Brand is required";
    if (!form.price) newErrors.price = "Price is required";
    if (!form.quantity) newErrors.quantity = "Quantity is required";
    if (form.image_small.length === 0)
      newErrors.imageSmall = "At least one small image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      await addProduct(form);
      setIsSubmitting(false);

      // Reset form
      setForm({
        name: "",
        brand: "",
        description: "",
        tags: "",
        price: "",
        discount: 0,
        quantity: "",
        sold: "0",
        netWeight: "",
        type: "",
        flavor: "",
        reviews: "",
        rating: "",
        user: "",
        image_small: [],
        image_big: [],
      });
      setImageSmallPreviews([]);
      setImageBigPreviews([]);
      if (smallImageInputRef.current) smallImageInputRef.current.value = "";
      if (bigImageInputRef.current) bigImageInputRef.current.value = "";

      // Show success message
      document.getElementById("success-message")?.classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("success-message")?.classList.add("hidden");
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    }
  };

  const formFields = [
    { name: "name", label: "Product Name", type: "text", required: true },
    { name: "brand", label: "Brand", type: "text", required: true },
    { name: "price", label: "Price ($)", type: "text", required: true },
    { name: "quantity", label: "Quantity", type: "text", required: true },
    { name: "discount", label: "Discount (%)", type: "text" },
    { name: "netWeight", label: "Net Weight", type: "text" },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: [
        "Instant Coffee",
        "Ground Coffee",
        "Coffee Beans",
        "Coffee Pods",
      ],
    },
    {
      name: "flavor",
      label: "Flavor",
      type: "select",
      options: [
        "Original",
        "Vanilla",
        "Caramel",
        "Hazelnut",
        "Mocha",
        "Chocolate",
      ],
    },
    {
      name: "rating",
      label: "Initial Rating",
      type: "select",
      options: ["1", "2", "3", "4", "5"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Product Dashboard</h1>
            <p className="text-gray-400 mt-1">Manage your coffee products</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors">
              View Products
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors">
              Dashboard
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Sidebar */}
            <div className="lg:col-span-1 bg-gray-900 p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-indigo-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Add New Product
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-300 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-indigo-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Product Requirements
                  </h3>
                  <ul className="mt-2 text-sm text-gray-400 space-y-1">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Product name and brand are required
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Price and quantity must be specified
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      At least one small image is required
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-300 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-indigo-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Image Guidelines
                  </h3>
                  <ul className="mt-2 text-sm text-gray-400 space-y-1">
                    <li>• Small images: 500x500 pixels</li>
                    <li>• Large images: 1200x800 pixels</li>
                    <li>• JPG or PNG format</li>
                    <li>• Max file size: 2MB each</li>
                  </ul>
                </div>

                <div className="bg-indigo-900/30 border border-indigo-500/30 p-4 rounded-lg">
                  <h3 className="font-medium text-indigo-300 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Pro Tips
                  </h3>
                  <p className="mt-2 text-sm text-indigo-200">
                    Use descriptive tags separated by commas to help customers
                    find your products. Include relevant keywords like ```color,
                    material, size, and more```.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Form */}
            <div className="lg:col-span-2 p-6">
              <div
                id="success-message"
                className="hidden bg-green-900/30 border border-green-500/30 p-4 rounded-lg mb-6 transition-all"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-400 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium text-green-300">
                    Product added successfully!
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">
                    Product Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formFields.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          {field.label}
                          {field.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        {field.type === "select" ? (
                          <select
                            name={field.name}
                            value={
                              form[
                                field.name as keyof NewProductInput
                              ] as string
                            }
                            onChange={handleChange}
                            className={`w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                              errors[field.name] ? "border-red-500" : ""
                            }`}
                          >
                            <option value="">Select {field.label}</option>
                            {field.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={
                              form[
                                field.name as keyof NewProductInput
                              ] as string
                            }
                            onChange={handleChange}
                            className={`w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                              errors[field.name] ? "border-red-500" : ""
                            }`}
                            placeholder={field.label}
                          />
                        )}
                        {errors[field.name] && (
                          <p className="text-red-400 text-sm flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {errors[field.name]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">
                    Product Details
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Describe the product features, taste, and benefits..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        name="tags"
                        value={form.tags}
                        onChange={handleChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="e.g., organic, dark roast, arabica"
                      />
                      <p className="text-gray-400 text-sm">
                        Separate tags with commas
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">
                    Product Images
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Small Images */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Small Images <span className="text-red-500">*</span>
                        </label>
                        <div
                          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 transition-colors"
                          onClick={() => smallImageInputRef.current?.click()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mx-auto text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="mt-2 text-sm text-gray-400">
                            Click to upload small images
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Recommended: 500x500 pixels
                          </p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          ref={smallImageInputRef}
                          onChange={(e) => handleImageChange(e, "small")}
                          className="hidden"
                        />
                        {errors.imageSmall && (
                          <p className="text-red-400 text-sm mt-2 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {errors.imageSmall}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {imageSmallPreviews.map((preview, index) => (
                          <div key={index} className="relative aspect-square">
                            <div className="bg-gray-700 rounded-lg overflow-hidden w-full h-full">
                              <img
                                src={preview}
                                alt={`Small preview ${index}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index, "small")}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Big Images */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Big Images
                        </label>
                        <div
                          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 transition-colors"
                          onClick={() => bigImageInputRef.current?.click()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mx-auto text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="mt-2 text-sm text-gray-400">
                            Click to upload large images
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Recommended: 1200x800 pixels
                          </p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          ref={bigImageInputRef}
                          onChange={(e) => handleImageChange(e, "big")}
                          className="hidden"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {imageBigPreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <div className="bg-gray-700 rounded-lg overflow-hidden aspect-video">
                              <img
                                src={preview}
                                alt={`Big preview ${index}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index, "big")}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-gray-700">
                  <button
                    type="button"
                    className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                    onClick={() => {
                      setForm({
                        name: "",
                        brand: "",
                        description: "",
                        tags: "",
                        price: "",
                        discount: 0,
                        quantity: "",
                        sold: "0",
                        netWeight: "",
                        type: "",
                        flavor: "",
                        reviews: "",
                        rating: "",
                        user: "",
                        image_small: [],
                        image_big: [],
                      });
                      setImageSmallPreviews([]);
                      setImageBigPreviews([]);
                    }}
                  >
                    Clear Form
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Adding...
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add Product
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
