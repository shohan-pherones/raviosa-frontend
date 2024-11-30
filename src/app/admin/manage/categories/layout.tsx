import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Manage Categories",
};

const ManageCategoriesLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default ManageCategoriesLayout;
