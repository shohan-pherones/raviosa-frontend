import { API_BASE_URL } from "@/constants";
import { IProduct } from "@/interfaces";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { IError } from "./../interfaces/index";

export const useGetProducts = () => {
  const getAllProducts = async (): Promise<IProduct[]> => {
    const res = await fetch(`${API_BASE_URL}/products`);
    return res.json();
  };

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<IProduct[], IError>("fetchProducts", getAllProducts);

  if (error) {
    toast.error(error.message);
  }

  return { products, isLoading, error };
};
