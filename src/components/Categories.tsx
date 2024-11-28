"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryImages } from "../constants";
import { useGetCategories } from "../hooks/useGetCategories";
import { cn } from "../lib/utils";
import Loading from "./Loading";
import SectionTitle from "./SectionTitle";
import { motion } from "framer-motion";
import { fadeUp } from "../utils/motion";

const Categories = ({ isHome }: { isHome?: boolean }) => {
  const { data, isLoading } = useGetCategories();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.categories?.length) {
    return notFound();
  }

  return (
    <section className="wrapper">
      <SectionTitle title="Categories" />
      <div className="grid-container">
        {data.categories
          .slice()
          .sort(
            (a, b) =>
              (b.products?.length as number) - (a.products?.length as number)
          )
          .slice(0, isHome ? 12 : undefined)
          .map((category, index) => (
            <div key={category._id} className="overflow-hidden">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeUp(isHome ? index * 0.1 : undefined)}
              >
                <Link
                  href={`/categories/${category._id}`}
                  className={cn(
                    isHome ? "h-40" : "h-96",
                    "w-full relative flex justify-center items-center shadow rounded overflow-hidden"
                  )}
                >
                  <div className="w-full h-full absolute top-0 left-0 bottom-0 right-0 z-[-2]">
                    <Image
                      src={categoryImages.get(category.name as string)!}
                      alt={category.name!}
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={cn(
                      isHome ? "bg-black/75" : "bg-black/50",
                      "absolute z-[-1] top-0 left-0 right-0 bottom-0 w-full h-full"
                    )}
                  ></div>
                  <h4 className="card-title text-neutral-content">
                    {category.name}
                  </h4>
                </Link>
              </motion.div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Categories;
