"use client";

import { useLogin } from "@/src/hooks/useLogin";
import { ILoginData } from "@/src/interfaces";
import { login } from "@/src/redux/features/auth/authSlice";
import { loginSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginData>({
    resolver: zodResolver(loginSchema),
  });
  const { mutate, isLoading } = useLogin();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = (data: ILoginData) => {
    mutate(data, {
      onSuccess: (response) => {
        dispatch(login(response));
        reset();
        router.push("/");
        toast.success(response.message);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="order-last md:order-first">
          <Image
            src="/images/login.jpg"
            alt="Login"
            width={1080}
            height={1920}
            priority
            className="w-full h-full object-cover"
          />
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
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Type your password"
              className="input input-bordered w-full"
            />
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
            {isLoading ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="animate-spin" />
                Processing
              </span>
            ) : (
              "Submit"
            )}
          </button>
          <p className="mt-1">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="link link-hover font-bold">
              Register
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default SignInPage;
