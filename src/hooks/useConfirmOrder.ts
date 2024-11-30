import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { IConfirmOrderData, IOrderResponse } from "../interfaces";
import { axiosInstance } from "../lib/axiosInstance";

export const useConfirmOrder = () => {
  const confirmOrder = async (
    confirmOrderData: IConfirmOrderData
  ): Promise<IOrderResponse> => {
    const res = await axiosInstance.put(
      `${API_BASE_URL}/orders/confirm-order/${confirmOrderData.orderId}`,
      confirmOrderData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  };

  return useMutation<IOrderResponse, Error, IConfirmOrderData>(confirmOrder);
};
