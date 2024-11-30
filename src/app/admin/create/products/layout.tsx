import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Create Product",
};

const CreateProductLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default CreateProductLayout;
