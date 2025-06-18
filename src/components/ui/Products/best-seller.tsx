"use client";
import React, { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import { motion } from "framer-motion";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  image_small: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [quantity, setQuantity] = React.useState(1);
  const { addToCart } = useProductStore();

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-white"
    >
      <Link href={`/product/${product._id}`}>
        <motion.img
          src={product.image_small}
          alt={product.name}
          className="w-full h-56 object-cover"
          whileHover={{ y: -5 }}
        />
      </Link>
      <CardContent className="p-4 space-y-2">
        <Link
          href={`/product/${product._id}`}
          className="block text-xl font-bold hover:underline text-gray-900"
        >
          {product.name}
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-indigo-600">
            ${product.price.toFixed(2)}
          </span>
          <Badge variant="outline">Best Seller</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={decrement}
            aria-label="Decrease quantity"
          >
            -
          </Button>
          <span className="font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={increment}
            aria-label="Increase quantity"
          >
            +
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </motion.div>
  );
};

const BestSeller: React.FC = () => {
  const { products, getProduct } = useProductStore();

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
          Our Best Sellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
