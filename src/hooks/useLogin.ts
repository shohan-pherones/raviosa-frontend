import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { ILoginData, ILoginOrRegistrationResponse } from "../interfaces";

export const useLogin = () => {
  const makeLogin = async (
    loginData: ILoginData
  ): Promise<ILoginOrRegistrationResponse> => {
    const res = await fetch(`${API_BASE_URL}/users/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse.message || "Failed to login");
    }

    return res.json();
  };

  return useMutation<ILoginOrRegistrationResponse, Error, ILoginData>(
    makeLogin
  );
};
