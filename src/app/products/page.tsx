"use client";

import Loading from "@/components/Loading";
import Products from "@/components/Products";
import { useGetProducts } from "@/hooks/useGetProducts";
import { notFound } from "next/navigation";

const ProductsPage = () => {
  const { data, isLoading } = useGetProducts();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.products?.length) {
    return notFound();
  }

  return (
    <main>
      <Products products={data.products} />
    </main>
  );
};

export default ProductsPage;
