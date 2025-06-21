"use client";
import React from "react";
import TopFilters from "../components/filter";
import SideFilters from "../components/sideFilter";
import ProductList from "../components/Products/Product";
import { useUIStore } from "@/store/uiStore"; // ✅ Import UI store

const ProductPage = () => {
  const isDarkMode = useUIStore((state) => state.isDarkMode); // ✅ Get dark mode state

  return (
    <div
      className={`flex flex-col md:flex-row gap-4 p-4 min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Sidebar (Left) */}
      <aside className="w-full md:w-64">
        <SideFilters />
      </aside>

      {/* Main Content (Right) */}
      <main className="flex-1">
        <TopFilters />
        <ProductList />
      </main>
    </div>
  );
};

export default ProductPage;
