"use client";
import React from "react";
import { useProductStore } from "@/store/useProductStore";
import { useUIStore } from "@/store/uiStore"; // ✅ Import the UI store

const TopFilters = () => {
  const filters = useProductStore((state) => state.filters);
  const setFilter = useProductStore((state) => state.setFilter);
  const isDarkMode = useUIStore((state) => state.isDarkMode); // ✅ Subscribe to isDarkMode

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter("sortby", e.target.value);
  };

  return (
    <div
      className={`flex justify-between items-center mb-4 p-3 rounded-lg transition-colors duration-200 ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="text-sm font-medium flex flex-wrap gap-2">
        {filters.brand && (
          <span
            className={`px-2 py-1 rounded-full ${
              isDarkMode
                ? "bg-indigo-900 text-indigo-100"
                : "bg-indigo-100 text-indigo-800"
            }`}
          >
            Brand: {filters.brand}
          </span>
        )}
        {filters.category && (
          <span
            className={`px-2 py-1 rounded-full ${
              isDarkMode
                ? "bg-indigo-900 text-indigo-100"
                : "bg-indigo-100 text-indigo-800"
            }`}
          >
            Type: {filters.category}
          </span>
        )}
        {(filters.minPrice !== 0 || filters.maxPrice !== 0) && (
          <span
            className={`px-2 py-1 rounded-full ${
              isDarkMode
                ? "bg-indigo-900 text-indigo-100"
                : "bg-indigo-100 text-indigo-800"
            }`}
          >
            Price: ৳{filters.minPrice} - ৳{filters.maxPrice}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <label
          htmlFor="sortby"
          className={`text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Sort by:
        </label>
        <select
          id="sortby"
          value={filters.sortby}
          onChange={handleSortChange}
          className={`border rounded px-3 py-1 text-sm focus:outline-none transition-colors ${
            isDarkMode
              ? "bg-gray-700 text-gray-100 border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
          }`}
        >
          <option value="Newest">Newest</option>
          <option value="Price: High to Low">Price: High to Low</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Best Rated">Best Rated</option>
        </select>
      </div>
    </div>
  );
};

export default TopFilters;
