"use client";

import Loading from "@/src/components/Loading";
import SectionTitle from "@/src/components/SectionTitle";
import { useGetOrderDetails } from "@/src/hooks/useGetOrderDetails";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const { data, isLoading } = useGetOrderDetails(orderId as string);
  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.orderedItems?.items?.length) {
    return notFound();
  }

  return (
    <main>
      <section className="wrapper grid grid-cols-1 xl:grid-cols-3 gap-10 xl:min-h-screen">
        <div className="xl:col-span-2">
          <SectionTitle
            title={`Order ID: ${String(orderId.slice(17, -1)).toUpperCase()}`}
          />
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
          <button
            onClick={() => router.back()}
            className="btn btn-primary mt-5"
          >
            Go Back
          </button>
        </div>
        <div>
          <SectionTitle title="Summary" />
          <div className="flex flex-col gap-2">
            <p className="flex gap-2 items-center justify-between">
              <span className="flex-shrink-0 whitespace-nowrap">Subtotal</span>
              <span className="w-full h-px border border-dashed"></span>
              <span className="flex-shrink-0 whitespace-nowrap">
                ${data.orderedItems.orderCosts.subtotal.toFixed(2)}
              </span>
            </p>
            <p className="flex gap-2 items-center justify-between">
              <span className="flex-shrink-0 whitespace-nowrap">Shipping</span>
              <span className="w-full h-px border border-dashed"></span>
              <span className="flex-shrink-0 whitespace-nowrap">
                ${data.orderedItems.orderCosts.shippingCost.toFixed(2)}
              </span>
            </p>
            <p className="flex gap-2 items-center justify-between">
              <span className="flex-shrink-0 whitespace-nowrap">Tax (5%)</span>
              <span className="w-full h-px border border-dashed"></span>
              <span className="flex-shrink-0 whitespace-nowrap">
                ${data.orderedItems.orderCosts.tax.toFixed(2)}
              </span>
            </p>
            <p className="flex gap-2 items-center justify-between">
              <span className="flex-shrink-0 whitespace-nowrap font-bold">
                Total
              </span>
              <span className="w-full h-px border border-dashed"></span>
              <span className="flex-shrink-0 whitespace-nowrap font-bold">
                ${data.orderedItems.orderCosts.totalPrice.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderDetailsPage;
