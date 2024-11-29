import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { axiosInstance } from "../lib/axiosInstance";
import { IProduct, IProductResponse } from "./../interfaces/index";

export const useUpdateProduct = (productId?: string) => {
  const updateProduct = async (
    productData: IProduct
  ): Promise<IProductResponse> => {
    const res = await axiosInstance.put(
      `${API_BASE_URL}/products/${productId}`,
      productData
    );
    return res.data;
  };

  return useMutation<IProductResponse, Error, IProduct>(updateProduct);
};
