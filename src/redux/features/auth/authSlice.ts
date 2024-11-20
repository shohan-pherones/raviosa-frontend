import { ILoginOrRegistrationResponse } from "@/src/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ILoginOrRegistrationResponse = {
  message: "",
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILoginOrRegistrationResponse>) => {
      state.message = action.payload.message;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.message = "";
      state.accessToken = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
