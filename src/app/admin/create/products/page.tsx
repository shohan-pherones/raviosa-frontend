"use client";

import Processing from "@/src/components/Processing";
import { useCreateProduct } from "@/src/hooks/useCreateProduct";
import { useGetCategories } from "@/src/hooks/useGetCategories";
import { IProduct } from "@/src/interfaces";
import { createProductSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IProduct>({
    resolver: zodResolver(createProductSchema),
  });
  const { data, isLoading: isGetCategoriesLoading } = useGetCategories();
  const { mutate, isLoading: isCreateProductLoading } = useCreateProduct();

  const onSubmit = (data: IProduct) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("stock", String(data.stock));

    if (data.image instanceof File) {
      formData.append("image", data.image);
    } else {
      toast.error("No valid file found for image");
    }

    if (data.categories && data.categories.length > 0) {
      data.categories.forEach((category) => {
        formData.append("categories[]", String(category));
      });
    }

    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response.message);
        reset();
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

  return (
    <main className="min-h-screen">
      <section className="wrapper flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <h3 className="text-2xl md:text-3xl font-bold">
            Create a New Product
          </h3>
          <p className="text-sm opacity-50 max-w-xl">
            Add a new product to your catalog with all necessary details to
            attract customers. A well-detailed product listing improves
            visibility and drives sales effectively.
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
              {...register("price")}
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
              {...register("stock")}
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
          <label htmlFor="image" className="form-control w-full">
            <div className="label">
              <span className="label-text">Image</span>
            </div>
            <input
              type="file"
              accept=".jpg, .png, .jpeg"
              id="image"
              className="file-input file-input-bordered w-full max-w-xl"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setValue("image", e.target.files[0]);
                }
              }}
            />
            {errors.image && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.image.message}
                </span>
              </div>
            )}
          </label>
          <fieldset className="form-control max-w-xl">
            <legend className="label">
              <span className="label-text">Categories</span>
            </legend>
            {isGetCategoriesLoading ? (
              <p className="flex items-center gap-2">
                <Loader2 className="animate-spin" />
                <span>Loading categories...</span>
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-x-10 md:grid-cols-3 gap-y-2">
                {data?.categories.map((category) => (
                  <label
                    key={category._id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      value={category._id}
                      {...register("categories")}
                      className="checkbox"
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            )}
            {errors.categories && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.categories.message}
                </span>
              </div>
            )}
          </fieldset>
          <button
            disabled={isCreateProductLoading}
            type="submit"
            className="mt-3 btn btn-primary max-w-xl"
          >
            {isCreateProductLoading ? <Processing /> : "Create"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateProductPage;
