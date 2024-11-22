"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";
import { RootState } from "../redux/store";

const Navbar = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const navItems = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/products">Products</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/contact">Contact</Link>
      </li>
    </>
  );

  return (
    <header className="navbar bg-base-100/90 h-16 max-h-16 sticky top-0 left-0 right-0 z-50 backdrop-blur-lg">
      <nav className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100/90 backdrop-blur-lg rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          Raviosa
        </Link>
      </nav>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end gap-5">
        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar mt-2">
              <div className="w-10 rounded-full">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={512}
                  height={512}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100/90 backdrop-blur-lg rounded-box z-[1] mt-2 w-52 p-2 shadow"
            >
              <li>
                <Link href="/orders">My Orders</Link>
              </li>
              <li>
                <button onClick={() => dispatch(logout())}>Logout</button>
              </li>
            </ul>
          </div>
        )}
        <Link href="/cart" className="relative">
          <ShoppingBag />
          <span className="absolute w-5 h-5 -left-2 -bottom-2 rounded-full bg-base-content text-neutral-content text-xs flex items-center justify-center">
            {items.length}
          </span>
        </Link>
        {!user?.name && (
          <Link href="/sign-in" className="btn btn-primary">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
