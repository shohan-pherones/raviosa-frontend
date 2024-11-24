"use client";

import Loading from "@/src/components/Loading";
import { useGetCategories } from "@/src/hooks/useGetCategories";
import { notFound } from "next/navigation";

const ManageCategoriesPage = () => {
  const { data, isLoading } = useGetCategories();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.categories?.length) {
    return notFound();
  }

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
                    <button className="btn btn-primary whitespace-nowrap">
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
    </main>
  );
};

export default ManageCategoriesPage;
