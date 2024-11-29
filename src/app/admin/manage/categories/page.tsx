"use client";

import Loading from "@/src/components/Loading";
import Processing from "@/src/components/Processing";
import { useGetCategories } from "@/src/hooks/useGetCategories";
import { useUpdateCategory } from "@/src/hooks/useUpdateCategory";
import { ICategory } from "@/src/interfaces";
import { createCategorySchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { X } from "lucide-react";
import { notFound } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ManageCategoriesPage = () => {
  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ICategory>({
    resolver: zodResolver(createCategorySchema),
  });
  const { data, isLoading, refetch } = useGetCategories();
  const { mutate, isLoading: isUpdateCategoryLoading } = useUpdateCategory(
    activeCategory?._id as string
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.categories?.length) {
    return notFound();
  }

  const onSubmit = (formData: ICategory) => {
    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response.message);
        setActiveCategory(null);
        reset();
        refetch();
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
      <section className="wrapper">
        <h3 className="text-2xl md:text-3xl font-bold">Manage Categories</h3>
        <p className="text-sm opacity-50">
          Carefully review and manage the details of each category to ensure
          accuracy and prompt updates. Keeping the category structure
          well-organized helps maintain customer satisfaction and streamline the
          shopping experience.
        </p>
        <div className="overflow-x-auto mt-5">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Products</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.categories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category?.products?.length || 0}</td>
                  <td>
                    <button
                      onClick={() => setActiveCategory(category)}
                      className="btn btn-primary whitespace-nowrap"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Products</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
      {activeCategory && (
        <>
          <span
            onClick={() => setActiveCategory(null)}
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[49] bg-black/20"
          ></span>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-base-100 w-full md:w-96 p-10 rounded shadow-lg"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className="absolute top-4 right-4"
              type="button"
            >
              <X size={16} />
            </button>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-4">
                  <label htmlFor="name" className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Category Name</span>
                    </div>
                    <input
                      {...field}
                      defaultValue={activeCategory.name}
                      type="text"
                      id="name"
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
                  <button
                    disabled={isUpdateCategoryLoading}
                    type="submit"
                    className="btn btn-primary"
                  >
                    {isUpdateCategoryLoading ? <Processing /> : "Update"}
                  </button>
                </div>
              )}
            />
          </form>
        </>
      )}
    </main>
  );
};

export default ManageCategoriesPage;
