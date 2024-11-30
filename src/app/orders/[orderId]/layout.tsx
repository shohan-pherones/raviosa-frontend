import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default OrderDetailsLayout;
