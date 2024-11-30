import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Product Details | Raviosa - Premium Cosmetics & Beauty",
};

const ProductDetailsLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default ProductDetailsLayout;
