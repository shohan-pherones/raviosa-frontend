"use client";

import Loading from "@/src/components/Loading";
import Products from "@/src/components/Products";
import { useGetCategory } from "@/src/hooks/useGetCategory";
import { notFound } from "next/navigation";

const CategoryDetailsPage = ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const { data, isLoading } = useGetCategory(params.categoryId);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.category?.products?.length) {
    return notFound;
  }

  return (
    <main className="min-h-screen">
      <Products
        products={data.category.products}
        categoryName={data.category.name}
      />
    </main>
  );
};

export default CategoryDetailsPage;
