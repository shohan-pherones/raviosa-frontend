"use client";

import Processing from "@/src/components/Processing";
import { useCreateCategory } from "@/src/hooks/useCreateCategory";
import { ICategory } from "@/src/interfaces";
import { createCategorySchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateCategoryPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICategory>({
    resolver: zodResolver(createCategorySchema),
  });
  const { mutate, isLoading } = useCreateCategory();

  const onSubmit = (data: ICategory) => {
    mutate(data, {
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
            Create a New Category
          </h3>
          <p className="text-sm opacity-50 max-w-xl">
            Add a new category to organize your products effectively. A
            well-structured catalog enhances user experience and helps customers
            find what they need quickly.
          </p>
          <label htmlFor="name" className="form-control w-full">
            <div className="label">
              <span className="label-text">Category Name</span>
            </div>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Makeup"
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
            disabled={isLoading}
            type="submit"
            className="mt-3 btn btn-primary max-w-xl"
          >
            {isLoading ? <Processing /> : "Create"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateCategoryPage;
