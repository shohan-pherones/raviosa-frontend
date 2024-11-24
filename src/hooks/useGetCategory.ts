import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../constants";
import { axiosInstance } from "../lib/axiosInstance";
import { ICategoryResponse } from "./../interfaces/index";

export const useGetCategory = (categoryId?: string) => {
  const getACategory = async (): Promise<ICategoryResponse> => {
    const res = await axiosInstance.get(
      `${API_BASE_URL}/categories/${categoryId}`
    );
    return res.data;
  };

  const { data, isLoading, error } = useQuery<ICategoryResponse, Error>(
    "fetchCategory",
    getACategory,
    { enabled: !!categoryId }
  );

  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "An error occurred");
  }

  return { data, isLoading, error };
};
