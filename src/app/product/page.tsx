import Footer from "@/components/ui/footer";
import BestSeller from "@/app/components/Products/best-seller";
import React from "react";

const Product = () => {
  return (
    <>
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Featured products will be added here */}
            <p className="text-center text-gray-600">
              Featured products coming soon!
            </p>
          </div>
        </div>
        <BestSeller />
        <Footer />
      </section>
    </>
  );
};

export default Product;
