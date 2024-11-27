import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { cn } from "../lib/utils";
import ReactQueryClientProvider from "../providers/ReactQueryClientProvider";
import ReduxStoreProvider from "../providers/ReduxStoreProvider";
import "./globals.css";

export const runtime = "edge";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raviosa - Premium Cosmetics & Beauty",
  description:
    "Explore Raviosa for luxurious cosmetics and skincare essentials. Elevate your beauty routine with our curated collection of timeless and trendy products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en" data-theme="lofi">
        <body
          className={cn(
            spaceGrotesk.className,
            "antialiased overflow-x-hidden"
          )}
        >
          <ReduxStoreProvider>
            <Toaster
              position="bottom-right"
              reverseOrder={false}
              toastOptions={{
                duration: 5000,
              }}
            />
            <Navbar />
            {children}
            <Footer />
          </ReduxStoreProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
