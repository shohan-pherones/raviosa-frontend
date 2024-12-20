"use client";

import Loading from "@/src/components/Loading";
import { useGetProduct } from "@/src/hooks/useGetProduct";
import { ICategory } from "@/src/interfaces";
import { addItem } from "@/src/redux/features/cart/cartSlice";
import { scaleDown } from "@/src/utils/motion";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { data, isLoading } = useGetProduct(productId as string);
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();
  const router = useRouter();

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

  const handleAddToCart = () => {
    dispatch(
      addItem({
        ...data.product,
        quantity,
      })
    );
    router.push("/cart");
  };

  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div className="w-full h-[calc(100vh-4rem)] order-1 md:order-first xl:col-span-2 overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={scaleDown(0, 1)}
            className="w-full h-full"
          >
            <Image
              src={data.product.image as string}
              alt={data.product.name}
              width={1080}
              height={1920}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        <div className="flex flex-col gap-5 justify-center wrapper">
          <div className="flex justify-between gap-5 items-center">
            <div className="flex items-center gap-2 flex-wrap">
              {data.product.categories.map((category: ICategory) => (
                <div
                  key={category._id}
                  className="badge badge-primary badge-outline uppercase whitespace-nowrap"
                >
                  {category.name}
                </div>
              ))}
            </div>
            <p className="flex-shrink-0 whitespace-nowrap">
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
                disabled={data.product.stock === 0}
                onClick={handleDecreaseQuantity}
                className="btn w-14 h-10 flex items-center justify-center"
              >
                <Minus size={16} />
              </button>
              <p className="w-14 h-10 flex items-center justify-center">
                {quantity}
              </p>
              <button
                disabled={data.product.stock === 0}
                onClick={handleIncreaseQuantity}
                className="btn w-14 h-10 flex items-center justify-center"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 items-center">
            <button className="btn" onClick={() => router.back()}>
              Go Back
            </button>
            <button
              disabled={data.product.stock === 0}
              onClick={handleAddToCart}
              className="btn btn-primary"
            >
              Add to Cart
            </button>
          </div>
          <p className="-mt-3 text-sm opacity-50">
            Please note, the quantity is fixed once the item is added to your
            cart. You can either proceed to checkout or continue shopping.
          </p>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailsPage;
