import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Products",
};

const ProductsLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default ProductsLayout;
