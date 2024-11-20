"use client";

import { IRegistrationData } from "@/src/interfaces";
import { registerSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: IRegistrationData) => {
    console.log(data);
  };

  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2 order-last md:order-first">Image</div>
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
          <label htmlFor="username" className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Username *</span>
            </div>
            <input
              {...register("username")}
              type="text"
              id="username"
              placeholder="sarah_parker"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.username && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.username.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="name" className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Full name *</span>
            </div>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Sarah Parker"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.name.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="email" className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email address *</span>
            </div>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="sarah@exampl.com"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.email.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="password" className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password *</span>
            </div>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Type a strong password"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.password.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="image" className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Image</span>
            </div>
            <input
              {...register("image")}
              type="text"
              id="image"
              placeholder="Paste your image url"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.image && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.image.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="address" className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Address</span>
            </div>
            <input
              {...register("address")}
              type="text"
              id="address"
              placeholder="123 Main Street, NY"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.address && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.address.message}
                </span>
              </div>
            )}
          </label>
        </form>
      </section>
    </main>
  );
};

export default SignUpPage;
