"use client";

import Loading from "@/components/Loading";
import { useGetProducts } from "@/hooks/useGetProducts";
import { notFound } from "next/navigation";

const ProductsPage = () => {
  const { products, isLoading } = useGetProducts();

  if (isLoading) {
    return <Loading />;
  }

  if (!products?.length) {
    return notFound();
  }

  return <main>ProductsPage</main>;
};

export default ProductsPage;
