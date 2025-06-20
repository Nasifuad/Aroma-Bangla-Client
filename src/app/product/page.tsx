import React from "react";
import TopFilters from "../components/filter";
import SideFilters from "../components/sideFilter";
import ProductList from "../components/Products/Product";

const ProductPage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
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
