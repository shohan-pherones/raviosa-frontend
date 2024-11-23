"use client";

import Loading from "@/src/components/Loading";
import { useGetProducts } from "@/src/hooks/useGetProducts";
import Link from "next/link";
import { notFound } from "next/navigation";

const ManageProducts = () => {
  const { data, isLoading } = useGetProducts();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.products.length) {
    return notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="wrapper">
        <h3 className="text-2xl md:text-3xl font-bold">Manage Products</h3>
        <p className="text-sm opacity-50">
          Carefully review and manage the details of each product to ensure
          accuracy and prompt updates. Keeping the product catalog
          well-organized helps maintain customer satisfaction and streamline the
          shopping experience.
        </p>
        <div className="overflow-x-auto mt-5">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Categories</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Orders</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>
                    {product.categories.map((cat, index, arr) => (
                      <span key={cat._id}>
                        {cat.name}
                        {arr.length - 1 === index ? null : ", "}
                      </span>
                    ))}
                  </td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.orders?.length || 0}</td>
                  <td className="flex items-center gap-2">
                    <Link
                      className="btn btn-primary whitespace-nowrap"
                      href={`/products/${product._id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn whitespace-nowrap"
                      href={`/manage/products/${product._id}`}
                    >
                      Update
                    </Link>
                    <button className="btn whitespace-nowrap">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Categories</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Orders</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </main>
  );
};

export default ManageProducts;
