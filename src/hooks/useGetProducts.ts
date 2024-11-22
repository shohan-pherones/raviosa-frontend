import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../constants";
import { axiosInstance } from "../lib/axiosInstance";
import { IProductsResponse } from "./../interfaces/index";

export const useGetProducts = () => {
  const getAllProducts = async (): Promise<IProductsResponse> => {
    const res = await axiosInstance.get(`${API_BASE_URL}/products`);
    return res.data;
  };

  const { data, isLoading, error } = useQuery<IProductsResponse, Error>(
    "fetchProducts",
    getAllProducts
  );

  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "An error occurred");
  }

  return { data, isLoading, error };
};
