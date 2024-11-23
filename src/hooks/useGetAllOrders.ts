import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../constants";
import { axiosInstance } from "../lib/axiosInstance";
import { IOrdersResponse } from "./../interfaces/index";

export const useGetAllOrders = () => {
  const getAllOrders = async (): Promise<IOrdersResponse> => {
    const res = await axiosInstance.get(`${API_BASE_URL}/orders/all-orders`);
    return res.data;
  };

  const { data, isLoading, error, refetch } = useQuery<IOrdersResponse, Error>(
    "fetchAllOrders",
    getAllOrders
  );

  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "An error occurred");
  }

  return { data, isLoading, error, refetch };
};
