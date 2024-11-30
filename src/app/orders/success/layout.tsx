import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Order Success",
};

const OrderSuccessLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default OrderSuccessLayout;
