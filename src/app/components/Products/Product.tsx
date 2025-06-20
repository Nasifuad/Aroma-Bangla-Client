/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useMemo } from "react";
import { useProductStore } from "@/store/useProductStore";

interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  image_small: string;
  category: string;
  brand: string;
  rating: number; // Added to match the store/interface Product type
}

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useProductStore();
  // const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="bg-white rounded-lg overflow-hidden transition-all hover:shadow-sm border border-gray-100">
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
        <h3 className="font-medium text-gray-800 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.discount > 0 ? (
              <>
                <span className="text-lg font-bold text-gray-900">
                  ৳{(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  ৳{product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ৳{product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => addToCart(product, 1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  const { products, getProduct, filters } = useProductStore();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    getProduct().then(() => setIsLoading(false));
  }, [getProduct]);

  // Filter products according to filters in the store
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    console.log("Filters in ProductList:", filters);
    console.log("Filters in ProductList:2", filtered);
    // Filter by price range
    console.log("price range:", filters.maxPrice);
    if (filters.minPrice || filters.maxPrice) {
      if (filters.maxPrice < 500) {
        filtered = filtered.filter((p) => p.price < 500);
      } else if (filters.maxPrice >= 500 && filters.maxPrice < 1000) {
        filtered = filtered.filter((p) => p.price >= 500 && p.price < 1000);
      } else if (filters.maxPrice >= 1000) {
        filtered = filtered.filter((p) => p.price >= 1000);
      } else {
        filtered = filtered.filter((p) => p);
      }
    } else {
      return filtered; // No price filter applied
    }

    // Filter by brand
    console.log("brand:", filters.brand);
    if (filters.brand) {
      filtered = filtered.filter(
        (p) => p.brand?.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    // Filter by category/type
    if (filters.category) {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Sorting
    switch (filters.sortby) {
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Best Rated":
        // Assuming product has a rating field
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "Newest":
      default:
        // If you have createdAt or similar, sort by date desc
        // filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [products, filters]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-100 animate-pulse" />
              <div className="p-4 space-y-4">
                <div className="h-4 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
                <div className="h-6 w-1/2 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!filteredProducts.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-500">
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
// ""

export default ProductList;
// import React from "react";
// import { useProductStore } from "@/store/useProductStore";
// const ProdcutList = () => {
//   const { filters } = useProductStore();
//   console.log("Filters in ProductList:", filters);
//   return <div>allo</div>;
// };

// export default ProdcutList;
