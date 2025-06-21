/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import { useUIStore } from "@/store/uiStore"; // ✅ Added for dark mode
import type { Product } from "@/store/interface";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useProductStore();
  const isDarkMode = useUIStore((state) => state.isDarkMode); // ✅
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
    setIsAddedToCart(true);
  };

  return (
    <div
      className={`rounded-lg overflow-hidden transition-all border ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 hover:shadow-md"
          : "bg-white border-gray-100 hover:shadow-sm"
      }`}
    >
      <div className="relative aspect-square">
        <img
          src={product.image_small}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <h3
          className={`font-medium line-clamp-2 ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.discount > 0 ? (
              <>
                <span
                  className={`text-lg font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  ৳{(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  ৳{product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span
                className={`text-lg font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                ৳{product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleAddToCart(product, 1)}
            className={`px-8 py-3 rounded-md font-medium transition-colors ${
              isAddedToCart
                ? "bg-green-600 hover:bg-green-700 text-white"
                : product.quantity > 0
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-400 cursor-not-allowed text-white"
            }`}
          >
            {isAddedToCart ? "Added to Cart" : "Add to Cart"}
            {product.quantity <= 0 && " (Out of Stock)"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  const { products, getProduct, filters } = useProductStore();
  const isDarkMode = useUIStore((state) => state.isDarkMode); // ✅
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProduct().then(() => setIsLoading(false));
  }, [getProduct]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (filters.minPrice !== 0 || filters.maxPrice !== 0) {
      const min = filters.minPrice || 0;
      const max = filters.maxPrice || Infinity;
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    if (filters.brand) {
      filtered = filtered.filter(
        (p) => p.brand?.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    switch (filters.sortby) {
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Best Rated":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "Newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [products, filters]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 bg-black">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`rounded-lg overflow-hidden ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div
                className={`aspect-square animate-pulse ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              />
              <div className="p-4 space-y-4">
                <div
                  className={`h-4 rounded animate-pulse ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                />
                <div
                  className={`h-4 w-3/4 rounded animate-pulse ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                />
                <div
                  className={`h-6 w-1/2 rounded animate-pulse ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!filteredProducts.length) {
    return (
      <div
        className={`max-w-7xl mx-auto px-4 py-8 text-center ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        No products found with the selected filters.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
