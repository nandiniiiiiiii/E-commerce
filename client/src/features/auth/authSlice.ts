import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, checkUser, signOut, resetPasswordRequest } from "./authAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

export const createUserAsync: any = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response: any = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync: any = createAsyncThunk(
  "user/checkUser",
  async (userInfo) => {
    const response: any = await checkUser(userInfo);
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk("user/signOut", async () => {
  const response = await signOut();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const resetPasswordRequestAsync = createAsyncThunk(
  "user/resetPasswordRequest",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      });
  },
});

export const selectLoggedInUser = (state: any) => state.auth.loggedInUser;
export const selectError = (state: any) => state.auth.error;
export const selectUserChecked = (state: any) => state.auth.userChecked;
export const selectMailSent = (state: any) => state.auth.mailSent;
export const selectPasswordReset = (state: any) => state.auth.passwordReset;

export default authSlice.reducer;
