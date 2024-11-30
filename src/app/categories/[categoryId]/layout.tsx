import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Category Details | Raviosa - Premium Cosmetics & Beauty",
};

const CategoryDetailsLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default CategoryDetailsLayout;
