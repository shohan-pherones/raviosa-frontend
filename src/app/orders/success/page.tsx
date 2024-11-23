"use client";

import Link from "next/link";

const OrderSuccessPage = () => {
  return (
    <main
      style={{
        backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
      url(/images/order-success.jpg)
    `,
      }}
      className="h-[calc(100vh-4rem)] bg-center bg-cover flex items-center justify-center"
    >
      <section className="wrapper flex flex-col items-center justify-center gap-2 text-center text-neutral-content">
        <p className="text-5xl font-bold">Success!</p>
        <p className="text-xl">
          Your order has been confirmed and is now being processed for shipping.
          You&apos;ll be notified once it&apos;s on its way.
        </p>
        <div className="mt-5 flex items-center justify-center gap-5 flex-wrap">
          <Link href="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
          <Link href="/orders" className="btn">
            View Orders
          </Link>
          <Link href="/" className="btn">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
};

export default OrderSuccessPage;
