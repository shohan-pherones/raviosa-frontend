"use client";

import { fadeUp } from "@/src/utils/motion";
import { motion } from "framer-motion";
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
        <div className="overflow-hidden">
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeUp()}
            className="text-5xl font-bold"
          >
            Success!
          </motion.p>
        </div>
        <div className="overflow-hidden">
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeUp(0.1)}
            className="text-xl"
          >
            Your order has been confirmed and is now being processed for
            shipping. You&apos;ll be notified once it&apos;s on its way.
          </motion.p>
        </div>
        <div className="mt-5 flex items-center justify-center gap-5 flex-wrap">
          <div className="overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp(0.2)}
            >
              <Link href="/products" className="btn btn-primary">
                Continue Shopping
              </Link>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp(0.3)}
            >
              <Link href="/orders" className="btn">
                View Orders
              </Link>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp(0.4)}
            >
              <Link href="/" className="btn">
                Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderSuccessPage;
