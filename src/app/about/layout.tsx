import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "About",
};

const AboutLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default AboutLayout;
