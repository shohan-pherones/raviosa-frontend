"use client";

import Loading from "@/components/Loading";
import { useGetProduct } from "@/hooks/useGetProduct";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { data, isLoading } = useGetProduct(productId as string);
  const [quantity, setQuantity] = useState<number>(1);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.product) {
    return notFound();
  }

  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      toast.error("Minimum quantity reached. You cannot decrease further.");
      return;
    }

    setQuantity((prev) => prev - 1);
  };

  const handleIncreaseQuantity = () => {
    if (quantity === data.product.stock) {
      toast.error("Maximum stock limit reached. You cannot add more.");
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div className="w-full h-[calc(100vh-4rem)] order-1 md:order-first xl:col-span-2">
          <Image
            src={
              data.product.images?.at(0) || "/images/product-placeholder.svg"
            }
            alt={data.product.name}
            width={1080}
            height={1920}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-5 justify-center wrapper">
          <div className="flex justify-between gap-5 items-center">
            <div className="flex items-center gap-2">
              {data.product.categories.map((category) => (
                <div
                  key={category._id}
                  className="badge badge-primary badge-outline uppercase"
                >
                  {category.name}
                </div>
              ))}
            </div>
            <p>
              Stocks:{" "}
              <span className="badge badge-primary">{data.product.stock}</span>
            </p>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold">
            {data.product.name}
          </h3>
          <p>{data.product.description}</p>
          <div className="grid grid-cols-2 gap-5 items-center">
            <h3 className="text-2xl md:text-3xl font-bold">
              ${(data.product.price * quantity).toFixed(2)}
            </h3>
            <div className="flex items-center justify-end">
              <button
                onClick={handleDecreaseQuantity}
                className="btn w-14 h-10 flex items-center justify-center"
              >
                <Minus size={16} />
              </button>
              <p className="w-14 h-10 flex items-center justify-center">
                {quantity}
              </p>
              <button
                onClick={handleIncreaseQuantity}
                className="btn w-14 h-10 flex items-center justify-center"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailsPage;
