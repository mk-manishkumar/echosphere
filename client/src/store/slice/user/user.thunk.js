import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../components/utilities/axiosInstance";

export const loginUserThunk = createAsyncThunk("user/login", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/user/login", { username, password });
    return response.data;
  } catch (error) {
    const errorOutput = error?.response?.data?.errMessage || "Login failed";
    return rejectWithValue(errorOutput);
  }
});

export const registerUserThunk = createAsyncThunk("user/signup", async ({ fullName, username, password, gender }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/user/register", { fullName, username, password, gender });
    return response.data;
  } catch (error) {
    const errorOutput = error?.response?.data?.errMessage || "Signup failed";
    return rejectWithValue(errorOutput);
  }
});

export const logoutUserThunk = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/user/logout");
    return response.data;
  } catch (error) {
    console.error(error);
    const errorOutput = error?.response?.data?.errMessage;
    return rejectWithValue(errorOutput);
  }
});

export const getUserProfileThunk = createAsyncThunk("user/getProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/user/get-profile");
    return response.data;
  } catch (error) {
    const errorOutput = error?.response?.data?.errMessage || "Failed to fetch profile";
    return rejectWithValue(errorOutput);
  }
});

export const getOtherUsersThunk = createAsyncThunk("user/getOtherUsers", async ({ skip = 0, limit = 10 } = {}, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/user/get-other-users", { params: { skip, limit } });
    return response.data;
  } catch (error) {
    console.error(error);
    const errorOutput = error?.response?.data?.errMessage || "Failed to fetch users";
    return rejectWithValue(errorOutput);
  }
});

export const checkUsernameAvailabilityThunk = createAsyncThunk("user/checkUsername", async (username, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/user/check-username", {
      params: { username },
    });
    return response.data;
  } catch (error) {
    const errorOutput = error?.response?.data?.errMessage || "Failed to check username";
    return rejectWithValue(errorOutput);
  }
});

export const updateProfileThunk = createAsyncThunk("user/updateProfile", async ({ fullName, username, gender }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put("/user/update-profile", {
      fullName,
      username,
      gender,
    });
    return response.data;
  } catch (error) {
    const errorOutput = error?.response?.data?.errMessage || "Failed to update profile";
    return rejectWithValue(errorOutput);
  }
});

export const changePasswordThunk = createAsyncThunk("user/changePassword", async ({ oldPassword, newPassword, confirmPassword }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put("/user/change-password", {
      oldPassword,
      newPassword,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    const errorOutput = error?.response?.data?.errMessage || "Failed to change password";
    return rejectWithValue(errorOutput);
  }
});

export const deleteAccountThunk = createAsyncThunk("user/deleteAccount", async (password, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete("/user/account", {
      data: { password },
    });
    return response.data;
  } catch (error) {
    const errorOutput = error?.response?.data?.errMessage || "Failed to delete account";
    return rejectWithValue(errorOutput);
  }
});
