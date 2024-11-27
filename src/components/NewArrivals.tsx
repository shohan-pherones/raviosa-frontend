"use client";

import Loading from "@/src/components/Loading";
import Products from "@/src/components/Products";
import { useGetProducts } from "@/src/hooks/useGetProducts";
import { notFound } from "next/navigation";

const NewArrivals = () => {
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
        isNewArrivals
        products={data.products
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt as string).getTime() -
              new Date(a.createdAt as string).getTime()
          )
          .slice(0, 12)}
      />
    </main>
  );
};

export default NewArrivals;
