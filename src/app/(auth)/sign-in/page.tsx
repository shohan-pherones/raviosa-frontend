"use client";

import Processing from "@/src/components/Processing";
import { useLogin } from "@/src/hooks/useLogin";
import { ILoginData } from "@/src/interfaces";
import { saveCredentials } from "@/src/redux/features/auth/authSlice";
import { loginSchema } from "@/src/schemas";
import { scaleDown } from "@/src/utils/motion";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { motion } from "framer-motion";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const SignInPage = () => {
  const [shouldPasswordVisible, setShouldPasswordVisible] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({
    resolver: zodResolver(loginSchema),
  });
  const { mutate, isLoading } = useLogin();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const onSubmit = (data: ILoginData) => {
    mutate(data, {
      onSuccess: (response) => {
        dispatch(saveCredentials(response));
        setTimeout(() => {
          router.push(redirectPath || "/");
        }, 100);
      },
      onError: (err) => {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data?.message || "An error occurred");
        } else {
          toast.error(err.message || "An unexpected error occurred");
        }
      },
    });
  };

  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="order-last md:order-first overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={scaleDown(0, 1)}
            className="w-full h-full"
          >
            <Image
              src="/images/login.jpg"
              alt="Login"
              width={1080}
              height={1920}
              priority
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="wrapper flex flex-col gap-2 justify-center  md:h-[calc(100vh-4rem)]"
        >
          <h3 className="text-2xl md:text-3xl font-bold">
            Login to your account
          </h3>
          <p className="text-sm opacity-50">
            Access your account to enjoy personalized experiences, faster
            checkouts, and order tracking. We&apos;re glad to have you back!
          </p>
          <label htmlFor="email" className="form-control w-full">
            <div className="label">
              <span className="label-text">Email address</span>
            </div>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="sarah@example.com"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.email.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="password" className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <div className="relative">
              <input
                {...register("password")}
                type={shouldPasswordVisible ? "text" : "password"}
                id="password"
                placeholder="Type your password"
                className="input input-bordered w-full"
              />
              <button
                onClick={() => setShouldPasswordVisible(!shouldPasswordVisible)}
                type="button"
                aria-label={
                  !shouldPasswordVisible ? "Show Password" : "Hide Password"
                }
                className="absolute top-1/2 -translate-y-1/2 right-2"
              >
                {!shouldPasswordVisible ? <Eye /> : <EyeClosed />}
              </button>
            </div>
            {errors.password && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.password.message}
                </span>
              </div>
            )}
          </label>
          <button
            disabled={isLoading}
            type="submit"
            className="mt-3 btn btn-primary"
          >
            {isLoading ? <Processing /> : "Submit"}
          </button>
          <p className="mt-1">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() =>
                router.push(
                  redirectPath
                    ? `/sign-up?redirect=${redirectPath}`
                    : "/sign-up"
                )
              }
              className="link link-hover font-bold"
            >
              Register
            </button>
          </p>
        </form>
      </section>
    </main>
  );
};

export default SignInPage;
