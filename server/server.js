import { app, server } from "./socket/socket.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/connection1.db.js";
import userRouter from "./routes/user.route.js";
import { errorMiddleware } from "./middlewares/error.middlware.js";
import messageRouter from "./routes/message.route.js";

// DB connect
connectDB();

// Middlewares
app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

// test route
app.get("/", (req, res) => {
  res.send("Welcome to Echosphere Server");
});

// error middleware
app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
