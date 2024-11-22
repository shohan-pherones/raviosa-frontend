import { IAuthStorage, ILoginOrRegistrationResponse } from "@/src/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState: IAuthStorage = {
  message: "",
  accessToken: "",
  refreshToken: "",
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveCredentials: (
      state,
      action: PayloadAction<ILoginOrRegistrationResponse>
    ) => {
      state.message = action.payload.message;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      toast.success("You have successfully logged in!");
    },
    logout: (state) => {
      state.message = "";
      state.accessToken = "";
      state.user = null;
      toast.success("You have successfully logged out!");
    },
  },
});

export const { saveCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
