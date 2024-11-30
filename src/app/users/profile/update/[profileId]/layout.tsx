import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Update Profile",
};

const UpdateProfileLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default UpdateProfileLayout;
