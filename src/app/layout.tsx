import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raviosa - Trendy Apparel & Fashion",
  description:
    "Discover the latest styles and premium collections at Raviosa, your go-to clothing shop for timeless and trendy fashion.",
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
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 5000,
            }}
          />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
