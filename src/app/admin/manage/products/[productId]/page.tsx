"use client";

import Loading from "@/src/components/Loading";
import Processing from "@/src/components/Processing";
import { useGetProduct } from "@/src/hooks/useGetProduct";
import { useUpdateProduct } from "@/src/hooks/useUpdateProduct";
import { IProduct } from "@/src/interfaces";
import { updateProductSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateProductPage = () => {
  const { productId } = useParams();
  const { data: productData, isLoading: isProductLoading } = useGetProduct(
    productId as string
  );
  const { mutate, isLoading: isUpdateProductLoading } = useUpdateProduct(
    productId as string
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProduct>({
    resolver: zodResolver(updateProductSchema),
  });

  useEffect(() => {
    if (productData) {
      reset({
        name: productData.product.name,
        description: productData.product.description,
        price: productData.product.price,
        stock: productData.product.stock,
      });
    }
  }, [productData, reset]);

  const onSubmit = (data: IProduct) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
        router.push("/admin/manage/products");
      },
      onError: (err) => {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data?.message || "An error occurred");
        } else {
          toast.error(err.message || "An unexpected error occurred");
        }
      },
    });
  };

  if (isProductLoading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen">
      <section className="wrapper flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <h3 className="text-2xl md:text-3xl font-bold">
            Update Product Details
          </h3>
          <p className="text-sm opacity-50 max-w-xl">
            Modify the existing product details to ensure your catalog stays
            accurate and appealing to customers. Keep the information updated to
            maintain trust and drive sales.
          </p>
          <label htmlFor="name" className="form-control w-full">
            <div className="label">
              <span className="label-text">Product Name</span>
            </div>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Enter the product name (e.g., Hydrating Face Serum)"
              className="input input-bordered w-full max-w-xl"
            />
            {errors.name && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.name.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="description" className="form-control w-full">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <input
              {...register("description")}
              type="text"
              id="description"
              placeholder="Enter a brief product description (e.g., A lightweight serum for deep hydration)"
              className="input input-bordered w-full max-w-xl"
            />
            {errors.description && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.description.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="price" className="form-control w-full">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input
              {...register("price", { valueAsNumber: true })}
              type="text"
              id="price"
              placeholder="Enter the price (e.g., 29.99)"
              className="input input-bordered w-full max-w-xl"
            />
            {errors.price && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.price.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="stock" className="form-control w-full">
            <div className="label">
              <span className="label-text">Stock</span>
            </div>
            <input
              {...register("stock", { valueAsNumber: true })}
              type="text"
              id="stock"
              placeholder="Enter the available stock quantity (e.g., 150)"
              className="input input-bordered w-full max-w-xl"
            />
            {errors.stock && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.stock.message}
                </span>
              </div>
            )}
          </label>
          <button
            disabled={isUpdateProductLoading}
            type="submit"
            className="mt-3 btn btn-primary max-w-xl"
          >
            {isUpdateProductLoading ? <Processing /> : "Update"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default UpdateProductPage;
