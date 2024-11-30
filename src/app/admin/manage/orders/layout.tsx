import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Manage Orders",
};

const ManageOrdersLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default ManageOrdersLayout;
