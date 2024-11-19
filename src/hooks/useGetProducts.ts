import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../constants";
import { IError, IProductsResponse } from "./../interfaces/index";

export const useGetProducts = () => {
  const getAllProducts = async (): Promise<IProductsResponse> => {
    const res = await fetch(`${API_BASE_URL}/products`);

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

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
