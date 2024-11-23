import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { ICategory, ICategoryResponse } from "../interfaces";
import { axiosInstance } from "../lib/axiosInstance";

export const useCreateCategory = () => {
  const makeCategory = async (
    categoryData: ICategory
  ): Promise<ICategoryResponse> => {
    const res = await axiosInstance.post(
      `${API_BASE_URL}/categories`,
      categoryData
    );
    return res.data;
  };

  return useMutation<ICategoryResponse, Error, ICategory>(makeCategory);
};
