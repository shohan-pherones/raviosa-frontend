import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../constants";
import { axiosInstance } from "../lib/axiosInstance";
import { IProductResponse } from "./../interfaces/index";

export const useGetProduct = (productId?: string) => {
  const getAProduct = async (): Promise<IProductResponse> => {
    const res = await axiosInstance.get(
      `${API_BASE_URL}/products/${productId}`
    );
    return res.data;
  };

  const { data, isLoading, error } = useQuery<IProductResponse, Error>(
    "fetchProduct",
    getAProduct,
    { enabled: !!productId }
  );

  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "An error occurred");
  }

  return { data, isLoading, error };
};
