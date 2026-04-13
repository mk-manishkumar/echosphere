import io from "socket.io-client";
import { setOnlineUsers } from "./slice/socket/socket.slice";
import { setNewMessage } from "./slice/message/message.slice";

let socket; // Keep the instance completely outside of Redux!

export const socketMiddleware = (store) => (next) => (action) => {
  // 1. Intercept the Connect Action
  if (action.type === "socket/connect") {
    const userId = action.payload;

    // Prevent multiple connections
    if (socket) return next(action);

    socket = io(import.meta.env.VITE_DB_ORIGIN, { query: { userId } });

    // Listen for socket events and dispatch them to Redux!
    socket.on("onlineUsers", (users) => {
      store.dispatch(setOnlineUsers(users));
    });

    socket.on("newMessage", (message) => {
      store.dispatch(setNewMessage(message));
    });
  }

  // 2. Intercept the Disconnect Action
  if (action.type === "socket/disconnect") {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  }

  return next(action);
};
