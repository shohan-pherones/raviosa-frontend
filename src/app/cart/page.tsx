"use client";

import Processing from "@/src/components/Processing";
import SectionTitle from "@/src/components/SectionTitle";
import { useCreateOrder } from "@/src/hooks/useCreateOrder";
import { clearCart, removeItem } from "@/src/redux/features/cart/cartSlice";
import { RootState } from "@/src/redux/store";
import axios from "axios";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const { items, subtotal, shippingCost, tax, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { mutate, isLoading } = useCreateOrder();

  const handleCheckout = () => {
    if (!user) {
      return router.push(`/sign-in?redirect=${pathname}`);
    }

    const orderData = {
      items,
      user,
      subtotal,
      shippingCost,
      tax,
      totalPrice,
    };

    mutate(orderData, {
      onSuccess: (response) => {
        router.push("/orders/confirm-order");
        toast.success(response.message);
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
      {items.length === 0 && (
        <section className="wrapper min-h-screen flex flex-col gap-2 items-center justify-center text-center">
          <div className="w-48 md:w-80">
            <Image
              src="/images/empty-cart.jpg"
              alt="Empty cart"
              width={1280}
              height={720}
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold">
            Your cart is currently empty
          </h3>
          <p>
            Explore our products and find something you love to add to your
            cart!
          </p>
          <div className="mt-5 flex items-center justify-center gap-5 flex-wrap">
            <Link href="/products" className="btn btn-primary">
              Browse Products
            </Link>
            <button onClick={() => router.back()} className="btn">
              Go Back
            </button>
            <Link href="/" className="btn">
              Back to Home
            </Link>
          </div>
        </section>
      )}
      {items.length > 0 && (
        <section className="wrapper grid grid-cols-1 xl:grid-cols-3 gap-10 xl:min-h-screen">
          <div className="xl:col-span-2">
            <SectionTitle title={`Cart Items: ${items.length}`} />
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Calculated Price</th>
                    <th></th>
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
                                src={item.image}
                                alt={item.name}
                                width={512}
                                height={512}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-sm opacity-50 hidden md:block">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>${item.price}</td>
                      <td>{item.quantity}</td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => dispatch(removeItem(item._id))}
                          className="btn"
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 flex items-center gap-5 flex-wrap">
              <Link href="/products" className="btn btn-primary">
                Continue Shopping
              </Link>
              <button onClick={() => router.back()} className="btn">
                Go Back
              </button>
              <button onClick={() => dispatch(clearCart())} className="btn">
                Clear Cart
              </button>
            </div>
            <p className="mt-2 text-sm opacity-50">
              Use &quot;Continue Shopping&quot; to explore more products or
              &quot;Clear Cart&quot; to remove all items. Be sure to
              double-check your selections before proceeding to checkout.
            </p>
          </div>
          <div>
            <SectionTitle title="Summary" />
            <div className="flex flex-col gap-2">
              <p className="flex gap-2 items-center justify-between">
                <span className="flex-shrink-0 whitespace-nowrap">
                  Subtotal
                </span>
                <span className="w-full h-px border border-dashed"></span>
                <span className="flex-shrink-0 whitespace-nowrap">
                  ${subtotal.toFixed(2)}
                </span>
              </p>
              <p className="flex gap-2 items-center justify-between">
                <span className="flex-shrink-0 whitespace-nowrap">
                  Shipping
                </span>
                <span className="w-full h-px border border-dashed"></span>
                <span className="flex-shrink-0 whitespace-nowrap">
                  ${shippingCost.toFixed(2)}
                </span>
              </p>
              <p className="flex gap-2 items-center justify-between">
                <span className="flex-shrink-0 whitespace-nowrap">
                  Tax (5%)
                </span>
                <span className="w-full h-px border border-dashed"></span>
                <span className="flex-shrink-0 whitespace-nowrap">
                  ${tax.toFixed(2)}
                </span>
              </p>
              <p className="flex gap-2 items-center justify-between">
                <span className="flex-shrink-0 whitespace-nowrap font-bold">
                  Total
                </span>
                <span className="w-full h-px border border-dashed"></span>
                <span className="flex-shrink-0 whitespace-nowrap font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </p>
            </div>
            <button
              disabled={isLoading}
              onClick={handleCheckout}
              className="mt-5 btn btn-primary"
            >
              {isLoading ? <Processing /> : "Proceed to Checkout"}
            </button>
            <p className="mt-2 text-sm opacity-50">
              Ensure all items are in your cart before proceeding. You can
              review or update your order at checkout.
            </p>
          </div>
        </section>
      )}
    </main>
  );
};

export default CartPage;
