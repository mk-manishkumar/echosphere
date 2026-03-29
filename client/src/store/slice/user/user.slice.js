/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "./user.thunk.js";

const initialState = {
  isAuthenticated: false,
  screenLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login user
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
