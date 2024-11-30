import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Login",
};

const SignInLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default SignInLayout;
