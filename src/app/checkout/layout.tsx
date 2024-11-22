"use client";

import AuthCallback from "@/src/components/AuthCallback";
import { RootState } from "@/src/redux/store";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CheckoutLayout = ({ children }: PropsWithChildren) => {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      setIsPageLoading(false);
    }
  }, [user, router]);

  return isPageLoading ? <AuthCallback /> : <>{children}</>;
};

export default CheckoutLayout;
