"use client";
import React from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

const coffeeProducts: Product[] = [
  {
    id: 1,
    name: "Espresso",
    price: "$2.99",
    image: "/images/coffee/espresso.jpg",
    description: "Rich and bold shot of pure coffee flavor.",
  },
  {
    id: 2,
    name: "Cappuccino",
    price: "$3.99",
    image: "/images/coffee/cappuccino.jpg",
    description: "Espresso topped with steamed milk foam.",
  },
  {
    id: 3,
    name: "Latte",
    price: "$4.49",
    image: "/images/coffee/latte.jpg",
    description: "Smooth blend of espresso and steamed milk.",
  },
  {
    id: 4,
    name: "Americano",
    price: "$3.49",
    image: "/images/coffee/americano.jpg",
    description: "Espresso diluted with hot water for a clean taste.",
  },
  {
    id: 5,
    name: "Mocha",
    price: "$4.99",
    image: "/images/coffee/mocha.jpg",
    description: "Chocolate-infused latte topped with whipped cream.",
  },
  {
    id: 6,
    name: "Flat White",
    price: "$3.99",
    image: "/images/coffee/flatwhite.jpg",
    description: "Velvety microfoam over a double shot of espresso.",
  },
];

const BestSeller: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Best Sellers
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {coffeeProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col"
            >
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 flex-1">
                {product.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-green-700">
                  {product.price}
                </span>
                <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 focus:outline-none">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
