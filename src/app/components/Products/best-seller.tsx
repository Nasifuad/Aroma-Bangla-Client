/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUIStore } from "@/store/uiStore";

import type { Product } from "@/store/interface";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [quantity, setQuantity] = React.useState(1);
  const { addToCart } = useProductStore();
  const { isDarkMode } = useUIStore();

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div
      className={`group rounded-2xl border overflow-hidden transition-all hover:shadow-md ${
        isDarkMode
          ? "border-gray-700 bg-gray-900 hover:shadow-gray-800"
          : "border-gray-100 bg-white"
      }`}
    >
      <Link href={`/product/${product._id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image_small}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.category && (
            <div
              className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                isDarkMode ? "bg-gray-800/90 text-gray-100" : "bg-white/90"
              }`}
            >
              {product.category}
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4 space-y-3">
        <Link
          href={`/product/${product._id}`}
          className={`block text-lg font-medium transition-colors line-clamp-2 ${
            isDarkMode
              ? "text-gray-100 hover:text-indigo-400"
              : "text-gray-900 hover:text-indigo-600"
          }`}
        >
          {product.name}
        </Link>

        <div className="flex items-center justify-between">
          {product.discount > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-red-500 line-through">
                {product.price.toFixed(2)}/-
              </span>
              <span
                className={`text-xl font-bold ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}
              >
                {(product.price * (1 - product.discount / 100)).toFixed(2)}/-
              </span>
            </div>
          ) : (
            <span
              className={`text-xl font-bold ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {product.price.toFixed(2)}/-
            </span>
          )}

          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-amber-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter
        className={`p-4 border-t ${
          isDarkMode ? "border-gray-700" : "border-gray-100"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center border rounded-full overflow-hidden">
            <button
              onClick={decrement}
              className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 ${
                isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-500"
              }`}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span
              className={`px-2 font-medium ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {quantity}
            </span>
            <button
              onClick={increment}
              className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 ${
                isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-500"
              }`}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <Button
            onClick={handleAddToCart}
            className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-4 py-2 text-white"
          >
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </div>
  );
};

const BestSeller: React.FC = () => {
  const { products, getProduct } = useProductStore();
  const { isDarkMode } = useUIStore();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      await getProduct();
      setIsLoading(false);
    };
    fetchProducts();
  }, [getProduct]);

  if (isLoading) {
    return (
      <section
        className={isDarkMode ? "bg-gray-900 py-20" : "bg-gray-50 py-20"}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-10 bg-gray-200 rounded-full w-1/3 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-200 rounded-full w-1/4 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden ${
                  isDarkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-100"
                }`}
              >
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={isDarkMode ? "bg-gray-900 py-20" : "bg-gray-50 py-20"}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-4 ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Premium Selection
          </h2>
          <p
            className={`max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Discover our most sought-after products, curated for exceptional
            quality
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/product">
            <Button
              variant="outline"
              className={`rounded-full px-8 py-6 ${
                isDarkMode
                  ? "border-indigo-400 text-indigo-400 hover:bg-gray-800"
                  : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
