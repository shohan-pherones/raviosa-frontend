import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Confirm Order",
};

const ConfirmOrderLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default ConfirmOrderLayout;
