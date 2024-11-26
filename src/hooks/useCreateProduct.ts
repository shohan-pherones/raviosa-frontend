import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { IProductResponse } from "../interfaces";
import { axiosInstance } from "../lib/axiosInstance";

export const useCreateProduct = () => {
  const makeProduct = async (
    productData: FormData
  ): Promise<IProductResponse> => {
    const res = await axiosInstance.post(
      `${API_BASE_URL}/products`,
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  };

  return useMutation<IProductResponse, Error, FormData>(makeProduct);
};
