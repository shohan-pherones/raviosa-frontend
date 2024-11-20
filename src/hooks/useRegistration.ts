import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import {
  ILoginOrRegistrationResponse,
  IRegistrationData,
} from "./../interfaces/index";

export const useRegistration = () => {
  const makeRegistration = async (
    registrationData: IRegistrationData
  ): Promise<ILoginOrRegistrationResponse> => {
    const res = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse.message || "Failed to register");
    }

    return res.json();
  };

  return useMutation<ILoginOrRegistrationResponse, Error, IRegistrationData>(
    makeRegistration
  );
};
