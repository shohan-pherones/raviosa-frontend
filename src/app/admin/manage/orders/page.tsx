"use client";

import Loading from "@/src/components/Loading";
import ManageOrderTableBody from "@/src/components/ManageOrderTableBody";
import { useGetAllOrders } from "@/src/hooks/useGetAllOrders";
import { notFound } from "next/navigation";

const ManageOrdersPage = () => {
  const { data, isLoading, refetch } = useGetAllOrders();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.orders.length) {
    return notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="wrapper">
        <h3 className="text-2xl md:text-3xl font-bold">Manage Orders</h3>
        <p className="text-sm opacity-50">
          Carefully review and manage the status of each order to ensure
          accuracy and prompt updates. Keeping track of all orders helps
          maintain customer satisfaction and streamline the delivery process.
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
              {data.orders.map((order, index) => (
                <ManageOrderTableBody
                  key={order._id}
                  order={order}
                  index={index}
                  refetch={refetch}
                />
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

export default ManageOrdersPage;
