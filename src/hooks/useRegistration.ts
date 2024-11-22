import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { axiosInstance } from "../lib/axiosInstance";
import {
  ILoginOrRegistrationResponse,
  IRegistrationData,
} from "./../interfaces/index";

export const useRegistration = () => {
  const makeRegistration = async (
    registrationData: IRegistrationData
  ): Promise<ILoginOrRegistrationResponse> => {
    const res = await axiosInstance.post(
      `${API_BASE_URL}/users/auth/register`,
      registrationData
    );
    return res.data;
  };

  return useMutation<ILoginOrRegistrationResponse, Error, IRegistrationData>(
    makeRegistration
  );
};
