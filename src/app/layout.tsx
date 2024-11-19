import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | Raviosa - Trendy Apparel & Fashion",
  description:
    "Discover the latest styles and premium collections at Raviosa, your go-to clothing shop for timeless and trendy fashion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="lofi">
      <body className={cn(spaceGrotesk.className, "antialiased")}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
