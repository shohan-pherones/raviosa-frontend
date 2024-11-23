"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutateOrderStatus } from "../hooks/useMutateOrderStatus";
import { IOrder } from "../interfaces";
import { orderStatusSchema, TOrderStatus } from "../schemas";
import Processing from "./Processing";

const statusOptions = [
  "placed",
  "confirmed",
  "paid",
  "processing",
  "shipping",
  "shipped",
  "cancelled",
];

interface ManageOrderTableBodyProps {
  order: IOrder;
  index: number;
  refetch: () => void;
}

const ManageOrderTableBody = ({
  order,
  index,
  refetch,
}: ManageOrderTableBodyProps) => {
  const { _id, status, createdAt, totalPrice, shippingDetails } = order;

  const { mutate, isLoading } = useMutateOrderStatus();
  const { handleSubmit, control } = useForm<TOrderStatus>({
    resolver: zodResolver(orderStatusSchema),
    defaultValues: {
      status: status || "placed",
    },
  });

  const onSubmit = (status: TOrderStatus["status"] = "placed") => {
    mutate(
      { orderId: _id!, status },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          refetch();
        },
        onError: (err) => {
          if (axios.isAxiosError(err) && err.response) {
            toast.error(err.response.data?.message || "An error occurred");
          } else {
            toast.error(err.message || "An unexpected error occurred");
          }
        },
      }
    );
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <th>{_id?.toUpperCase()}</th>
      <th>{format(new Date(createdAt!), "dd/MM/yyyy")}</th>
      <th>${totalPrice.toFixed(2)}</th>
      <th>
        {shippingDetails?.paymentMethod.replaceAll("-", " ").toUpperCase()}
      </th>
      <th>{shippingDetails?.address}</th>
      <th>{shippingDetails?.email}</th>
      <th>{shippingDetails?.phone}</th>
      <th>
        <form onSubmit={handleSubmit((data) => onSubmit(data.status))}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <select
                  {...field}
                  className="select select-bordered w-full min-w-36"
                >
                  {statusOptions.map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                      {statusOption.toUpperCase()}
                    </option>
                  ))}
                </select>
                <button disabled={isLoading} type="submit" className="btn">
                  {isLoading ? <Processing /> : "Update Status"}
                </button>
              </div>
            )}
          />
        </form>
      </th>
    </tr>
  );
};

export default ManageOrderTableBody;
