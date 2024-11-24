"use client";

import Loading from "@/src/components/Loading";
import Products from "@/src/components/Products";
import { useGetProducts } from "@/src/hooks/useGetProducts";
import { notFound } from "next/navigation";

const BestSellingProducts = () => {
  const { data, isLoading } = useGetProducts();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.products?.length) {
    return notFound();
  }

  return (
    <main>
      <Products
        isBestSelling
        products={data.products
          .slice()
          .sort((a, b) => (b.orders?.length || 0) - (a.orders?.length || 0))
          .slice(0, 12)}
      />
    </main>
  );
};

export default BestSellingProducts;
