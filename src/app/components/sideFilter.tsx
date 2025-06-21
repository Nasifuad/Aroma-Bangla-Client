"use client";
import React from "react";
import { useProductStore } from "@/store/useProductStore";
import { useUIStore } from "@/store/uiStore";
const SideFilters = () => {
  const { filters, setFilter, clearFilters } = useProductStore();
  const { isDarkMode } = useUIStore();
  console.log("Dark Mode:", isDarkMode);
  const brandOptions = [
    "Davidoff",
    "Nestle",
    "Nescafe",
    "Starbucks",
    "Lavazza",
    "Illy",
    "Peet's Coffee",
    "Keurig",
    "Folgers",
    "Maxwell House",
  ];

  const handlePriceChange = (range: string) => {
    switch (range) {
      case "under-500":
        setFilter("minPrice", 0);
        setFilter("maxPrice", 499);
        break;
      case "500-1000":
        setFilter("minPrice", 500);
        setFilter("maxPrice", 999);
        break;
      case "over-1000":
        setFilter("minPrice", 1000);
        setFilter("maxPrice", 10000);
        break;
      default:
        setFilter("minPrice", 0);
        setFilter("maxPrice", 10000);
    }
  };

  return (
    <aside
      className={`w-full md:w-64 p-4 rounded shadow transition-colors duration-200 ${
        isDarkMode ? "bg-gray-800 shadow-gray-700" : "bg-white shadow-gray-200"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2
          className={`text-lg font-semibold ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Filters
        </h2>
        <button
          onClick={clearFilters}
          className={`text-sm ${
            isDarkMode
              ? "text-indigo-400 hover:text-indigo-300"
              : "text-indigo-600 hover:text-indigo-800"
          }`}
        >
          Clear all
        </button>
      </div>

      {/* Price Range - Radio group */}
      <div className="mb-4">
        <h3
          className={`text-sm font-semibold mb-2 ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Price Range
        </h3>
        <div className="flex flex-col gap-2">
          <label
            className={`flex items-center ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            <input
              type="radio"
              name="price"
              className={`mr-2 ${
                isDarkMode
                  ? "text-indigo-400 focus:ring-indigo-300"
                  : "text-indigo-600 focus:ring-indigo-500"
              }`}
              checked={filters.minPrice === 0 && filters.maxPrice === 499}
              onChange={() => handlePriceChange("under-500")}
            />
            Under 500
          </label>
          <label
            className={`flex items-center ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            <input
              type="radio"
              name="price"
              className={`mr-2 ${
                isDarkMode
                  ? "text-indigo-400 focus:ring-indigo-300"
                  : "text-indigo-600 focus:ring-indigo-500"
              }`}
              checked={filters.minPrice === 500 && filters.maxPrice === 999}
              onChange={() => handlePriceChange("500-1000")}
            />
            500 - 1000
          </label>
          <label
            className={`flex items-center ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            <input
              type="radio"
              name="price"
              className={`mr-2 ${
                isDarkMode
                  ? "text-indigo-400 focus:ring-indigo-300"
                  : "text-indigo-600 focus:ring-indigo-500"
              }`}
              checked={filters.minPrice === 1000 && filters.maxPrice === 10000}
              onChange={() => handlePriceChange("over-1000")}
            />
            Over 1000
          </label>
        </div>
      </div>

      {/* Brand - Radio group */}
      <div className="mb-4">
        <h3
          className={`text-sm font-semibold mb-2 ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Brand
        </h3>
        <div className="flex flex-col gap-2">
          {brandOptions.map((brand) => (
            <label
              key={brand}
              className={`flex items-center ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <input
                type="radio"
                name="brand"
                className={`mr-2 ${
                  isDarkMode
                    ? "text-indigo-400 focus:ring-indigo-300"
                    : "text-indigo-600 focus:ring-indigo-500"
                }`}
                checked={filters.brand === brand}
                onChange={() => setFilter("brand", brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Type - Radio group */}
      <div>
        <h3
          className={`text-sm font-semibold mb-2 ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Type
        </h3>
        <div className="flex flex-col gap-2">
          {["Instant Coffee", "Ground Coffee"].map((type) => (
            <label
              key={type}
              className={`flex items-center ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <input
                type="radio"
                name="type"
                className={`mr-2 ${
                  isDarkMode
                    ? "text-indigo-400 focus:ring-indigo-300"
                    : "text-indigo-600 focus:ring-indigo-500"
                }`}
                checked={filters.category === type}
                onChange={() => setFilter("category", type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SideFilters;
