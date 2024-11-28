import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { axiosInstance } from "../lib/axiosInstance";
import { TRole } from "../schemas";
import { IUserResponse } from "./../interfaces/index";

export const useChangeRole = (userId?: string) => {
  const updateUserProfile = async (roleData: TRole): Promise<IUserResponse> => {
    const res = await axiosInstance.put(
      `${API_BASE_URL}/users/change-role/${userId}`,
      roleData
    );
    return res.data;
  };

  return useMutation<IUserResponse, Error, TRole>(updateUserProfile);
};
