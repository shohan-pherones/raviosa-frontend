import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../constants";
import { axiosInstance } from "../lib/axiosInstance";
import { IOrderDetailsResponse } from "./../interfaces/index";

export const useGetOrderDetails = (orderId?: string) => {
  const getOrderDetails = async (): Promise<IOrderDetailsResponse> => {
    const res = await axiosInstance.get(
      `${API_BASE_URL}/orders/order-details/${orderId}`
    );
    return res.data;
  };

  const { data, isLoading, error } = useQuery<IOrderDetailsResponse, Error>(
    "fetchOrderDetails",
    getOrderDetails,
    {
      enabled: !!orderId,
    }
  );

  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "An error occurred");
  }

  return { data, isLoading, error };
};
