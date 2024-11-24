import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="flex items-center gap-x-4 flex-wrap justify-center">
        <Link href="/" className="link link-hover">
          Home
        </Link>
        <Link href="/categories" className="link link-hover">
          Categories
        </Link>
        <Link href="/products" className="link link-hover">
          Products
        </Link>
        <Link href="/about" className="link link-hover">
          About
        </Link>
        <Link href="/contact" className="link link-hover">
          Contact
        </Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link href="/" target="_blank">
            <Facebook />
          </Link>
          <Link href="/" target="_blank">
            <Instagram />
          </Link>
          <Link href="/" target="_blank">
            <Twitter />
          </Link>
          <Link href="/" target="_blank">
            <Youtube />
          </Link>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by{" "}
          <Link href="/" className="link link-hover">
            Raviosa Apparel & Fashion Co.
          </Link>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
