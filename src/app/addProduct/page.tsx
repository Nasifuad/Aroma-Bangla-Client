"use client";

import { useProductStore } from "@/store/useProductStore";
import { useState, useRef } from "react";
import Image from "next/image";
import { NewProductInput } from "@/store/interface";
const AddProductPage = () => {
  const { addProduct } = useProductStore();

  const [form, setForm] = useState<NewProductInput>({
    name: "",
    brand: "",
    description: "",
    tags: "",
    price: "",
    discount: "",
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

  const smallImageInputRef = useRef<HTMLInputElement>(null);
  const bigImageInputRef = useRef<HTMLInputElement>(null);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // Handle image selection and preview
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

  // Remove selected image
  const removeImage = (index: number, type: "small" | "big") => {
    if (type === "small") {
      const newImages = form.image_small.filter(
        (_: File, i: number) => i !== index
      );
      const newPreviews = imageSmallPreviews.filter((_, i) => i !== index);
      setForm({ ...form, image_small: newImages });
      setImageSmallPreviews(newPreviews);
    } else {
      const newImages = form.image_big.filter(
        (_: File, i: number) => i !== index
      );
      const newPreviews = imageBigPreviews.filter((_, i) => i !== index);
      setForm({ ...form, image_big: newImages });
      setImageBigPreviews(newPreviews);
    }
  };

  // Basic form validation
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await addProduct(form);
      alert("Product added successfully!");
      // Reset form
      setForm({
        name: "",
        brand: "",
        description: "",
        tags: "",
        price: "",
        discount: "",
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
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    }
  };

  // Form fields configuration, excluding image fields
  const formFields = [
    { name: "name", label: "Product Name", type: "text", required: true },
    { name: "brand", label: "Brand", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "tags", label: "Tags (comma-separated)", type: "text" },
    { name: "price", label: "Price ($)", type: "text", required: true },
    { name: "discount", label: "Discount (%)", type: "text" },
    { name: "quantity", label: "Quantity", type: "text", required: true },
    { name: "sold", label: "Sold (default 0)", type: "text" },
    { name: "netWeight", label: "Net Weight", type: "text" },
    { name: "type", label: "Type", type: "text" },
    { name: "flavor", label: "Flavor", type: "text" },
    { name: "rating", label: "Initial Rating (0-5)", type: "text" },
    { name: "reviews", label: "Reviews (JSON string)", type: "text" },
    { name: "user", label: "User ID", type: "text" },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={
                    form[
                      field.name as keyof Omit<
                        NewProductInput,
                        "image_small" | "image_big"
                      >
                    ]
                  }
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={
                    form[
                      field.name as keyof Omit<
                        NewProductInput,
                        "image_small" | "image_big"
                      >
                    ]
                  }
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={field.label}
                />
              )}
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Image Upload Sections */}
        <div className="space-y-6">
          {/* Small Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Small Images <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              ref={smallImageInputRef}
              onChange={(e) => handleImageChange(e, "small")}
              className="w-full p-3 border rounded-md"
            />
            {errors.imageSmall && (
              <p className="text-red-500 text-sm mt-1">{errors.imageSmall}</p>
            )}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {imageSmallPreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <Image
                    src={preview}
                    alt={`Small preview ${index}`}
                    width={150}
                    height={150}
                    className="object-cover rounded-md"
                  />
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Big Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              ref={bigImageInputRef}
              onChange={(e) => handleImageChange(e, "big")}
              className="w-full p-3 border rounded-md"
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {imageBigPreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <Image
                    src={preview}
                    alt={`Big preview ${index}`}
                    width={150}
                    height={150}
                    className="object-cover rounded-md"
                  />
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

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
