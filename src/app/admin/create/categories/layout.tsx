import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Create Category",
};

const CreateCategoryLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default CreateCategoryLayout;
