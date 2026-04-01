import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/connection1.db.js";
import userRouter from "./routes/user.route.js";

const app = express();

connectDB();

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Echosphere Server");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
