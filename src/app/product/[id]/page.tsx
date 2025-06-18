"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/store/useProductStore";
import ProductDetails from "./details/page";
import React from "react"; // Import React for React.use()

function ProductEntry({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = React.use(paramsPromise); // Unwrap the params Promise
  const { getProductById } = useProductStore();
  const router = useRouter();
  const { id } = params; // Access id from the unwrapped params

  useEffect(() => {
    const fetchAndRedirect = async () => {
      await getProductById(id);
      router.push(`/product/${id}/details`);
    };

    fetchAndRedirect();
  }, [id, getProductById, router]);

  return (
    <>
      <ProductDetails />
    </>
  );
}

export default ProductEntry;
