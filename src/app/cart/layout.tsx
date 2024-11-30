import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Cart",
};

const CartLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default CartLayout;
