import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Categories",
};

const CategoriesLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default CategoriesLayout;
