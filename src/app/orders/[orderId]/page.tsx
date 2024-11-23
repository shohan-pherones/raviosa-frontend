"use client";

import Loading from "@/src/components/Loading";
import SectionTitle from "@/src/components/SectionTitle";
import { useGetOrderDetails } from "@/src/hooks/useGetOrderDetails";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const { data, isLoading } = useGetOrderDetails(orderId as string);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.orderedItems?.items?.length) {
    return notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="wrapper">
        <SectionTitle title={`Order ID: ${String(orderId).toUpperCase()}`} />
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Calculated Price</th>
              </tr>
            </thead>
            <tbody>
              {data.orderedItems.items.map((item) => (
                <tr key={item.product._id}>
                  <td>
                    <Link
                      href={`/products/${item.product._id}`}
                      className="flex items-center gap-3"
                    >
                      <div className="avatar">
                        <div className="mask mask-square h-16 w-16 md:h-20 md:w-20">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={512}
                            height={512}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.product.name}</div>
                        <div className="text-sm opacity-50 hidden md:block">
                          {item.product.description}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td>${item.product.price}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default OrderDetailsPage;
