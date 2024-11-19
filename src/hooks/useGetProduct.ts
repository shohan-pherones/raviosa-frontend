import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../constants";
import { IError, IProductResponse } from "./../interfaces/index";

export const useGetProduct = (productId?: string) => {
  const getAProduct = async (): Promise<IProductResponse> => {
    const res = await fetch(`${API_BASE_URL}/products/${productId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return res.json();
  };

  const { data, isLoading, error } = useQuery<IProductResponse, IError>(
    "fetchProduct",
    getAProduct,
    { enabled: !!productId }
  );

  if (error) {
    toast.error(error.message);
  }

  return { data, isLoading, error };
};
