import { API_BASE_URL } from "@/constants";
import { IProductsResponse } from "@/interfaces";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { IError } from "./../interfaces/index";

export const useGetProducts = () => {
  const getAllProducts = async (): Promise<IProductsResponse> => {
    const res = await fetch(`${API_BASE_URL}/products`);
    return res.json();
  };

  const { data, isLoading, error } = useQuery<IProductsResponse, IError>(
    "fetchProducts",
    getAllProducts
  );

  if (error) {
    toast.error(error.message);
  }

  return { data, isLoading, error };
};
