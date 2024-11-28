import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../constants";
import { axiosInstance } from "../lib/axiosInstance";
import { IUsersResponse } from "./../interfaces/index";

export const useGetUsers = () => {
  const getAllUsers = async (): Promise<IUsersResponse> => {
    const res = await axiosInstance.get(`${API_BASE_URL}/users`);
    return res.data;
  };

  const { data, isLoading, error, refetch } = useQuery<IUsersResponse, Error>(
    "fetchUsers",
    getAllUsers
  );

  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "An error occurred");
  }

  return { data, isLoading, error, refetch };
};
