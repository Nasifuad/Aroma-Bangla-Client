/* eslint-disable @next/next/no-img-element */
"use client";

import { useProductStore } from "@/store/useProductStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  StarIcon,
  HeartIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";
import BestSeller from "@/app/components/Products/best-seller";

export default function ProductDetails() {
  const { specificProduct, isFetching, addToCart } = useProductStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!specificProduct && !isFetching) {
      router.push("/");
    }
  }, [specificProduct, isFetching, router]);

  useEffect(() => {
    setQuantity(1);
    setIsAddedToCart(false);
  }, [specificProduct]);

  const incrementQuantity = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    if (!specificProduct) return;
    console.log(`Added ${quantity} of ${specificProduct.name} to cart`);
    addToCart(specificProduct, quantity);
    setIsAddedToCart(true);
  };

  if (isFetching || !specificProduct) {
    return (
      <div className="max-w-6xl mx-auto p-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  const productImages = [
    specificProduct.image_small,
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1999&q=80",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80",
    "https://images.unsplash.com/photo-1611930022073-87f6ec6243ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80",
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen">
      <button
        onClick={() => router.push("/product")}
        className="flex items-center text-blue-600 mb-6 hover:text-blue-800 transition-colors"
      >
        <ChevronLeftIcon className="h-5 w-5 mr-1" />
        Back to products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-50 rounded-xl p-4 mb-4 h-[400px] flex items-center justify-center">
            <img
              src={productImages[selectedImage]}
              alt={specificProduct.name}
              className="max-h-[350px] object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border-2 rounded-lg overflow-hidden transition-all ${
                  selectedImage === index
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <img
                  src={img}
                  alt={`Product view ${index + 1}`}
                  className="h-20 w-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {specificProduct.name}
            </h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">(128 reviews)</span>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-2xl font-semibold text-gray-900">
              ${specificProduct.price.toFixed(2)}
            </p>
            <p className="text-green-600 mt-1">In stock • Ready to ship</p>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {
                "This premium product features high-quality materials and craftsmanship. Designed for durability and style, it's the perfect addition to your collection."
              }
            </p>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Specifications:</h3>
              <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <li className="flex">
                  <span className="font-medium w-24">Material:</span>
                  <span>Premium materials</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-24">Dimensions:</span>
                  <span>10 x 8 x 5 cm</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-24">Weight:</span>
                  <span>450g</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-24">Color:</span>
                  <span>Black</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={decrementQuantity}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`px-8 py-3 rounded-md font-medium transition-colors ${
                  isAddedToCart
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isAddedToCart ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button className="p-3 rounded-full border border-gray-300 hover:bg-gray-100">
                <HeartIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">
              Shipping & Returns
            </h3>
            <p className="text-sm text-blue-700">
              Free standard shipping on orders over $50. 30-day money-back
              guarantee. Easy returns within 14 days of delivery.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          You might also like
        </h2>
        <BestSeller />
      </div>
    </div>
  );
}
