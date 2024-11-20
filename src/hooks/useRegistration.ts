import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import {
  IError,
  ILoginOrRegistrationResponse,
  IRegistrationData,
} from "./../interfaces/index";

export const useRegistration = (registrationData?: IRegistrationData) => {
  const makeRegistration = async (): Promise<ILoginOrRegistrationResponse> => {
    const res = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      body: JSON.stringify(registrationData),
    });

    if (!res.ok) {
      throw new Error("Failed to register");
    }

    return res.json();
  };

  const { data, isLoading, isSuccess, error } = useMutation<
    ILoginOrRegistrationResponse,
    IError
  >(makeRegistration);

  console.log(data);

  return { data, isLoading, isSuccess, error };
};
