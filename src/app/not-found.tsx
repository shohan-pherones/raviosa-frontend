"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <main
      style={{
        backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
      url(/images/not-found.jpeg)
    `,
      }}
      className="h-[calc(100vh-4rem)] bg-center bg-cover flex items-center justify-center"
    >
      <section className="wrapper flex flex-col items-center justify-center gap-2 text-center text-neutral-content">
        <p className="text-5xl font-bold">404</p>
        <p>
          Oops! The page you&apos;re looking for was not found. Please try
          refreshing the page or go back to the homepage.
        </p>
        <div className="mt-5 flex items-center justify-center gap-5 flex-wrap">
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Refresh Page
          </button>
          <button onClick={() => router.back()} className="btn">
            Go Back
          </button>
          <Link href="/" className="btn">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
