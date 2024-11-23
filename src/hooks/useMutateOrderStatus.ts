import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { IMutateOrderStatusData, IOrderResponse } from "../interfaces";
import { axiosInstance } from "../lib/axiosInstance";

export const useMutateOrderStatus = () => {
  const mutateOrderStatus = async (
    data: IMutateOrderStatusData
  ): Promise<IOrderResponse> => {
    const res = await axiosInstance.put(
      `${API_BASE_URL}/orders/manage/${data.status}/${data.orderId}`
    );
    return res.data;
  };

  return useMutation<IOrderResponse, Error, IMutateOrderStatusData>(
    mutateOrderStatus
  );
};
