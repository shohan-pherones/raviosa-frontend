"use client";

import Processing from "@/src/components/Processing";
import { useRegistration } from "@/src/hooks/useRegistration";
import { IRegistrationData } from "@/src/interfaces";
import { saveCredentials } from "@/src/redux/features/auth/authSlice";
import { registerSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegistrationData>({
    resolver: zodResolver(registerSchema),
  });
  const { mutate, isLoading } = useRegistration();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const onSubmit = (data: IRegistrationData) => {
    mutate(data, {
      onSuccess: (response) => {
        dispatch(saveCredentials(response));
        reset();
        setTimeout(() => {
          router.push(redirectPath || "/");
        }, 1000);
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
        <div className="order-last md:order-first">
          <Image
            src="/images/registration.jpg"
            alt="Registration"
            width={1080}
            height={1920}
            priority
            className="w-full h-full object-cover"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="wrapper flex flex-col gap-2 justify-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold">Create an account</h3>
          <p className="text-sm opacity-50">
            To create an account, please provide your details below. Enjoy
            faster checkouts, order tracking, and exclusive offers once
            you&apos;re signed up!
          </p>
          <label htmlFor="username" className="form-control w-full">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              {...register("username")}
              type="text"
              id="username"
              placeholder="sarah_parker"
              className="input input-bordered w-full"
            />
            {errors.username && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.username.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="name" className="form-control w-full">
            <div className="label">
              <span className="label-text">Fullname</span>
            </div>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Sarah Parker"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.name.message}
                </span>
              </div>
            )}
          </label>
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
              placeholder="Type a strong password"
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
          <label htmlFor="image" className="form-control w-full">
            <div className="label">
              <span className="label-text">Image</span>
            </div>
            <input
              {...register("image")}
              type="text"
              id="image"
              placeholder="Paste your image url"
              className="input input-bordered w-full"
            />
            {errors.image && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.image.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="address" className="form-control w-full">
            <div className="label">
              <span className="label-text">Address</span>
            </div>
            <input
              {...register("address")}
              type="text"
              id="address"
              placeholder="123 Main Street, NY"
              className="input input-bordered w-full"
            />
            {errors.address && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.address.message}
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
            Already have an account?{" "}
            <button
              type="button"
              onClick={() =>
                router.push(
                  redirectPath
                    ? `/sign-in?redirect=${redirectPath}`
                    : "/sign-in"
                )
              }
              className="link link-hover font-bold"
            >
              Login
            </button>
          </p>
        </form>
      </section>
    </main>
  );
};

export default SignUpPage;
