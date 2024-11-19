import { API_BASE_URL } from "@/constants";
import { ICategoryResponse } from "@/interfaces";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { IError } from "./../interfaces/index";

export const useGetCategory = (categoryId: string | string[] | undefined) => {
  const getACategory = async (): Promise<ICategoryResponse> => {
    const res = await fetch(`${API_BASE_URL}/categories/${categoryId}`);
    return res.json();
  };

  const { data, isLoading, error } = useQuery<ICategoryResponse, IError>(
    "fetchCategory",
    getACategory
  );

  if (error) {
    toast.error(error.message);
  }

  return { data, isLoading, error };
};
