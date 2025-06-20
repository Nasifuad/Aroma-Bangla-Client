// app/product/[id]/page.tsx

"use client";

import { use, useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import ProductDetails from "./details/page";

export default function ProductEntry({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { getProductById } = useProductStore((s) => s);
  const { id } = use(params); // 👈 unwrap async params

  useEffect(() => {
    getProductById(id);
  }, [id, getProductById]);

  return <ProductDetails />;
}
