import { API_BASE_URL } from "@/src/constants";
import {
  IAuthStorage,
  ILoginOrRegistrationResponse,
  IUser,
  IUserResponse,
} from "@/src/interfaces";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const initialState: IAuthStorage = {
  accessToken: "",
  user: null,
};

export const retrieveUser = createAsyncThunk(
  "auth/retrieveUser",
  async (accessToken: string, { rejectWithValue }) => {
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken) as { userId: string };
        const userId = decodedToken ? decodedToken.userId : null;

        if (userId) {
          const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            headers: {
              Authorization: accessToken,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }

          const data: IUserResponse = await response.json();
          return data.user;
        } else {
          return rejectWithValue("Invalid token: No userId found");
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        return rejectWithValue(errorMessage);
      }
    } else {
      return rejectWithValue("No access token provided");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILoginOrRegistrationResponse>) => {
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.accessToken = "";
      state.user = null;
      toast.success("You have successfully logged out!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        retrieveUser.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.user = action.payload;
          toast.success("You have successfully logged in!");
        }
      )
      .addCase(retrieveUser.rejected, (state, action) => {
        state.user = null;
        toast.error(action.payload as string);
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
