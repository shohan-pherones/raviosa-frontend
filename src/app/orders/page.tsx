"use client";

import Loading from "@/src/components/Loading";
import { useGetOrdersByUserId } from "@/src/hooks/useGetOrdersByUserId";
import { IOrder } from "@/src/interfaces";
import { cn } from "@/src/lib/utils";
import { format } from "date-fns";
import { notFound } from "next/navigation";

const orderStatusColors = new Map<string, string>([
  ["placed", "text-balck"],
  ["confirmed", "text-sky-500"],
  ["paid", "text-green-500"],
  ["processing", "text-yellow-500"],
  ["shipping", "text-amber-500"],
  ["shipped", "text-blue-500"],
  ["cancelled", "text-red-500"],
]);

const OrderPage = () => {
  const { data, isLoading } = useGetOrdersByUserId();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.orders.length) {
    return notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="wrapper">
        <h3 className="text-2xl md:text-3xl font-bold">My Orders</h3>
        <p className="text-sm opacity-50">
          All confirmed deliveries will be shipped within 3 to 5 business days.
        </p>
        <div className="overflow-x-auto mt-5">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Payment Method</th>
                <th>Shipping Address</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order: IOrder, index: number) => (
                <tr key={order._id}>
                  <th>{index + 1}</th>
                  <th>{order._id?.toUpperCase()}</th>
                  <th>{format(order.createdAt!, "dd/MM/yyyy")}</th>
                  <th>${order.totalPrice.toFixed(2)}</th>
                  <th>
                    {order.shippingDetails?.paymentMethod
                      .replaceAll("-", " ")
                      .toUpperCase()}
                  </th>
                  <th>{order.shippingDetails?.address}</th>
                  <th>{order.shippingDetails?.email}</th>
                  <th>{order.shippingDetails?.phone}</th>
                  <th className={cn(orderStatusColors.get(order.status!))}>
                    {order.status?.toUpperCase()}
                  </th>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Payment Method</th>
                <th>Shipping Address</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Order Status</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </main>
  );
};

export default OrderPage;
