"use client";
import React from "react";
import { useProductStore } from "@/store/useProductStore";

const TopFilters = () => {
  const { filters, setFilter } = useProductStore();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter("sortby", e.target.value);
  };

  return (
    <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg">
      <div className="text-sm font-medium">
        {filters.brand && (
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full mr-2">
            Brand: {filters.brand}
          </span>
        )}
        {filters.category && (
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full mr-2">
            Type: {filters.category}
          </span>
        )}
        {(filters.minPrice !== 0 || filters.maxPrice !== 10000) && (
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
            Price: ৳{filters.minPrice} - ৳{filters.maxPrice}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="sortby" className="text-sm text-gray-600">
          Sort by:
        </label>
        <select
          id="sortby"
          value={filters.sortby}
          onChange={handleSortChange}
          className="border rounded px-3 py-1 text-sm focus:outline-none"
        >
          <option value="newest">Newest</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="bestRated">Best Rated</option>
        </select>
      </div>
    </div>
  );
};

export default TopFilters;
