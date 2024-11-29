"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fadeUp } from "../utils/motion";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <main
      style={{
        backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
      url(/images/not-found.jpg)
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
            404
          </motion.p>
        </div>
        <div className="overflow-hidden">
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeUp(0.1)}
          >
            Oops! The page you&apos;re looking for was not found. Please try
            refreshing the page or go back to the homepage.
          </motion.p>
        </div>
        <div className="mt-5 flex items-center justify-center gap-5 flex-wrap">
          <div className="overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp(0.2)}
            >
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Refresh Page
              </button>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp(0.3)}
            >
              <button onClick={() => router.back()} className="btn">
                Go Back
              </button>
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

export default NotFoundPage;
