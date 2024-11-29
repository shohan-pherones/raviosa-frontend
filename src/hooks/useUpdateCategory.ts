import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { axiosInstance } from "../lib/axiosInstance";
import { ICategory, ICategoryResponse } from "./../interfaces/index";

export const useUpdateCategory = (categoryId?: string) => {
  const updateCategory = async (
    categoryData: ICategory
  ): Promise<ICategoryResponse> => {
    const res = await axiosInstance.put(
      `${API_BASE_URL}/categories/${categoryId}`,
      categoryData
    );
    return res.data;
  };

  return useMutation<ICategoryResponse, Error, ICategory>(updateCategory);
};
