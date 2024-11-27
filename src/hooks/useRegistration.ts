import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { axiosInstance } from "../lib/axiosInstance";
import { ILoginOrRegistrationResponse } from "./../interfaces/index";

export const useRegistration = () => {
  const makeRegistration = async (
    registrationData: FormData
  ): Promise<ILoginOrRegistrationResponse> => {
    const res = await axiosInstance.post(
      `${API_BASE_URL}/users/auth/register`,
      registrationData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  };

  return useMutation<ILoginOrRegistrationResponse, Error, FormData>(
    makeRegistration
  );
};
