import { createAsyncThunk } from "@reduxjs/toolkit";
import io from "socket.io-client";
import { setSocket } from "./socket.slice";

export const initializeSocketThunk = createAsyncThunk("socket/init", async (userId, { dispatch, getState }) => {
  const { socket } = getState().socketReducer;

  // Prevent multiple connections
  if (socket) return;

  const newSocket = io(import.meta.env.VITE_DB_ORIGIN, { query: { userId } });

  dispatch(setSocket(newSocket));
});
