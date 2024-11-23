import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../constants";
import { axiosInstance } from "../lib/axiosInstance";
import { IOrdersResponse } from "./../interfaces/index";

export const useGetOrdersByUserId = () => {
  const getMyOrders = async (): Promise<IOrdersResponse> => {
    const res = await axiosInstance.get(`${API_BASE_URL}/orders/my-orders`);
    return res.data;
  };

  const { data, isLoading, error } = useQuery<IOrdersResponse, Error>(
    "fetchMyOrders",
    getMyOrders
  );

  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "An error occurred");
  }

  return { data, isLoading, error };
};
