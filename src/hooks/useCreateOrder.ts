import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { IOrder, IOrderResponse } from "../interfaces";
import { axiosInstance } from "../lib/axiosInstance";

export const useCreateOrder = () => {
  const makeOrder = async (orderData: IOrder): Promise<IOrderResponse> => {
    const res = await axiosInstance.post(`${API_BASE_URL}/orders`, orderData);
    return res.data;
  };

  return useMutation<IOrderResponse, Error, IOrder>(makeOrder);
};
