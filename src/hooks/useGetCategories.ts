import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../constants";
import { ICategoriesResponse } from "../interfaces";
import { axiosInstance } from "../lib/axiosInstance";

export const useGetCategories = () => {
  const getAllCategories = async (): Promise<ICategoriesResponse> => {
    const res = await axiosInstance.get(`${API_BASE_URL}/categories`);
    return res.data;
  };

  const { data, isLoading, error, refetch } = useQuery<
    ICategoriesResponse,
    Error
  >("fetchAllCategories", getAllCategories);

  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "An error occurred");
  }

  return { data, isLoading, error, refetch };
};
