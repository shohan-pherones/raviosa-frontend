import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default ProfileLayout;
