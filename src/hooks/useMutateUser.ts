import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { axiosInstance } from "../lib/axiosInstance";
import { ILoginOrRegistrationResponse } from "./../interfaces/index";

export const useMutateUser = (userId?: string) => {
  const updateUserProfile = async (
    userData: FormData
  ): Promise<ILoginOrRegistrationResponse> => {
    const res = await axiosInstance.put(
      `${API_BASE_URL}/users/${userId}`,
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  };

  return useMutation<ILoginOrRegistrationResponse, Error, FormData>(
    updateUserProfile
  );
};
