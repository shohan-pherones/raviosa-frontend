import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { ILoginData, ILoginOrRegistrationResponse } from "../interfaces";
import { axiosInstance } from "../lib/axiosInstance";

export const useLogin = () => {
  const makeLogin = async (
    loginData: ILoginData
  ): Promise<ILoginOrRegistrationResponse> => {
    const res = await axiosInstance.post(
      `${API_BASE_URL}/users/auth/login`,
      loginData
    );
    return res.data;
  };

  return useMutation<ILoginOrRegistrationResponse, Error, ILoginData>(
    makeLogin
  );
};
