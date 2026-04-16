import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./../../../components/utilities/axiosInstance";

// Send Message
export const sendMessageThunk = createAsyncThunk("message/send", async ({ receiverId, message }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/message/send/${receiverId}`, { message });
    return response.data;
  } catch (error) {
    console.error(error);
    const errorOutput = error?.response?.data?.errMessage || "Failed to send message";
    return rejectWithValue(errorOutput);
  }
});

// Get Messages
export const getMessageThunk = createAsyncThunk("message/get", async ({ receiverId, skip = 0, limit = 20 } = {}, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/message/get-messages/${receiverId}`, { params: { skip, limit } });
    return response.data;
  } catch (error) {
    console.error(error);
    const errorOutput = error?.response?.data?.errMessage || "Failed to fetch messages";
    return rejectWithValue(errorOutput);
  }
});
