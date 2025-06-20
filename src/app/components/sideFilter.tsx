"use client";
import React from "react";
import { useProductStore } from "@/store/useProductStore";

const SideFilters = () => {
  const { filters, setFilter, clearFilters } = useProductStore();
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
    <aside className="w-full md:w-64 bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          Clear all
        </button>
      </div>

      {/* Price Range - Should be radio group */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Price Range</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              className="mr-2"
              checked={filters.minPrice === 0 && filters.maxPrice === 499}
              onChange={() => handlePriceChange("under-500")}
            />
            Under 500
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              className="mr-2"
              checked={filters.minPrice === 500 && filters.maxPrice === 999}
              onChange={() => handlePriceChange("500-1000")}
            />
            500 - 1000
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              className="mr-2"
              checked={filters.minPrice === 1000}
              onChange={() => handlePriceChange("over-1000")}
            />
            Over 1000
          </label>
        </div>
      </div>

      {/* Brand - Should be radio group */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Brand</h3>
        <div className="flex flex-col gap-2">
          {brandOptions.map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="radio"
                name="brand"
                className="mr-2"
                checked={filters.brand === brand}
                onChange={() => setFilter("brand", brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Type - Should be radio group */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Type</h3>
        <div className="flex flex-col gap-2">
          {["Instant Coffee", "Ground Coffee"].map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="type"
                className="mr-2"
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
