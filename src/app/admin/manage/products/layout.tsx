import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Manage Products",
};

const ManageProductsLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default ManageProductsLayout;
