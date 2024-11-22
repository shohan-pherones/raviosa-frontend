import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../constants";
import { axiosInstance } from "../lib/axiosInstance";
import { IOrderResponse } from "./../interfaces/index";

export const useGetOrderForConfirm = () => {
  const getOrderForConfirm = async (): Promise<IOrderResponse> => {
    const res = await axiosInstance.get(`${API_BASE_URL}/orders/preview-order`);
    return res.data;
  };

  const { data, isLoading, error } = useQuery<IOrderResponse, Error>(
    "fetchOrderForConfirm",
    getOrderForConfirm
  );

  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "An error occurred");
  }

  return { data, isLoading, error };
};
