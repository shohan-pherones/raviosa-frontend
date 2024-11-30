import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Update Product | Raviosa - Premium Cosmetics & Beauty",
};

const UpdateProductLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default UpdateProductLayout;
