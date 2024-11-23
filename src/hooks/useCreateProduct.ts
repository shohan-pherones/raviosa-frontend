import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { IProduct, IProductResponse } from "../interfaces";
import { axiosInstance } from "../lib/axiosInstance";

export const useCreateProduct = () => {
  const makeProduct = async (
    productData: IProduct
  ): Promise<IProductResponse> => {
    const res = await axiosInstance.post(
      `${API_BASE_URL}/products`,
      productData
    );
    return res.data;
  };

  return useMutation<IProductResponse, Error, IProduct>(makeProduct);
};
