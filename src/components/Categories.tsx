"use client";

import { useGetCategories } from "@/hooks/useGetCategories";
import { notFound } from "next/navigation";
import Category from "./Category";
import Loading from "./Loading";
import SectionTitle from "./SectionTitle";

const Categories = () => {
  const { data, isLoading } = useGetCategories();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.categories?.length) {
    return notFound();
  }

  return (
    <section className="wrapper min-h-screen">
      <SectionTitle title="Categories" />
      <div className="grid-container">
        {data.categories.map((category) => (
          <Category key={category._id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
