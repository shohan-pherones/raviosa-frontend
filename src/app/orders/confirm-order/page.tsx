"use client";

import Loading from "@/src/components/Loading";
import Processing from "@/src/components/Processing";
import { useConfirmOrder } from "@/src/hooks/useConfirmOrder";
import { useGetOrderForConfirm } from "@/src/hooks/useGetOrderForConfirm";
import { IShippingData } from "@/src/interfaces";
import { clearCart } from "@/src/redux/features/cart/cartSlice";
import { RootState } from "@/src/redux/store";
import { shippingSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ConfirmOrderPage = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);
  const { data, isLoading } = useGetOrderForConfirm();
  const { mutate, isLoading: isConfirmLoading } = useConfirmOrder();
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IShippingData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      address: user?.address,
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.order?.totalPrice) {
    return notFound();
  }

  const onSubmit = (value: IShippingData) => {
    const confirmedOrderData = {
      orderId: data.order._id!,
      shippingDetails: value,
      items,
    };

    mutate(confirmedOrderData, {
      onSuccess: (response) => {
        toast.success(response.message);
        dispatch(clearCart());
        setTimeout(() => {
          router.push("/orders/success");
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

  const onCancel = () => {
    dispatch(clearCart());
    router.push("/cart");
    toast.success("Your order has been cancelled successfully.");
  };

  return (
    <main className="min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        {/* Confirm Products */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold">Confirm Products</h3>
          <p className="text-sm opacity-50">
            Please review the products in your order below. Ensure that all
            details are correct before proceeding. Enjoy a seamless shopping
            experience!
          </p>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Calculated Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <Link
                        href={`/products/${item._id}`}
                        className="flex items-center gap-3"
                      >
                        <div className="avatar">
                          <div className="mask mask-square h-16 w-16 md:h-20 md:w-20">
                            <Image
                              src={item.image as string}
                              alt={item.name}
                              width={512}
                              height={512}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                          <div className="text-sm opacity-50 hidden md:block">
                            {item.description.substring(0, 100)}...
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {/* Confirm Shipping Details */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">
              Confirm Shipping Details
            </h3>
            <p className="text-sm opacity-50">
              Please verify your shipping details below to ensure accurate
              delivery. Double-check the address and contact information before
              proceeding.
            </p>
            <div className="flex flex-col gap-2 justify-center">
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
              <label htmlFor="phone" className="form-control w-full">
                <div className="label">
                  <span className="label-text">Phone</span>
                </div>
                <input
                  {...register("phone")}
                  type="text"
                  id="phone"
                  placeholder="+123456789"
                  className="input input-bordered w-full"
                />
                {errors.phone && (
                  <div className="label">
                    <span className="label-text-alt text-rose-500">
                      {errors.phone.message}
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
            </div>
          </div>
          {/* Confirm Order Costs */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">
              Confirm Order Costs
            </h3>
            <p className="text-sm opacity-50">
              Please review the cost breakdown of your order below. Ensure that
              all charges, including taxes and shipping, are accurate before
              finalizing your purchase.
            </p>
            <div className="mt-2 flex flex-col gap-2">
              <p className="flex gap-2 items-center justify-between">
                <span className="flex-shrink-0 whitespace-nowrap">
                  Subtotal
                </span>
                <span className="w-full h-px border border-dashed"></span>
                <span className="flex-shrink-0 whitespace-nowrap">
                  ${data.order.subtotal.toFixed(2)}
                </span>
              </p>
              <p className="flex gap-2 items-center justify-between">
                <span className="flex-shrink-0 whitespace-nowrap">
                  Shipping
                </span>
                <span className="w-full h-px border border-dashed"></span>
                <span className="flex-shrink-0 whitespace-nowrap">
                  ${data.order.shippingCost.toFixed(2)}
                </span>
              </p>
              <p className="flex gap-2 items-center justify-between">
                <span className="flex-shrink-0 whitespace-nowrap">
                  Tax (5%)
                </span>
                <span className="w-full h-px border border-dashed"></span>
                <span className="flex-shrink-0 whitespace-nowrap">
                  ${data.order.tax.toFixed(2)}
                </span>
              </p>
              <p className="flex gap-2 items-center justify-between">
                <span className="flex-shrink-0 whitespace-nowrap font-bold">
                  Total
                </span>
                <span className="w-full h-px border border-dashed"></span>
                <span className="flex-shrink-0 whitespace-nowrap font-bold">
                  ${data.order.totalPrice.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
          {/* Select Your Payment Method */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">
              Select Your Payment Method
            </h3>
            <p className="text-sm opacity-50">
              Please choose your preferred payment method below. For the most
              secure option, we recommend selecting Cash on Delivery.
            </p>
            <label className="label cursor-pointer w-fit">
              <input
                {...register("paymentMethod")}
                type="radio"
                className="radio"
                value="cash-on-delivery"
                defaultChecked
              />
              <span className="ml-2">Cash On Delivery</span>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <button
              disabled={isConfirmLoading}
              type="submit"
              className="btn btn-primary"
            >
              {isConfirmLoading ? <Processing /> : "Confirm Order"}
            </button>
            <button onClick={onCancel} type="button" className="btn">
              Cancel Order
            </button>
          </div>
          <p className="-mt-8 text-sm opacity-50">
            After confirming your order, it will be marked as confirmed, and we
            will begin processing your products. You also have the option to
            cancel the order if needed.
          </p>
        </div>
      </form>
    </main>
  );
};

export default ConfirmOrderPage;
