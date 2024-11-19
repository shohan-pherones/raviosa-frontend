import { API_BASE_URL } from "@/constants";
import { ICategoriesResponse } from "@/interfaces";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { IError } from "./../interfaces/index";

export const useGetCategories = () => {
  const getAllCategories = async (): Promise<ICategoriesResponse> => {
    const res = await fetch(`${API_BASE_URL}/categories`);
    return res.json();
  };

  const { data, isLoading, error } = useQuery<ICategoriesResponse, IError>(
    "fetchCategories",
    getAllCategories
  );

  if (error) {
    toast.error(error.message);
  }

  return { data, isLoading, error };
};
