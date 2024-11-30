import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Registration",
};

const SignUpLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default SignUpLayout;
