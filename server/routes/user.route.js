import express from "express";
import { getOtherUsers, getProfile, login, logout, register } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middlware.js";

const userRouter = express.Router();

// Auth routes
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", isAuthenticated, logout);

// User routes
userRouter.get("/get-profile", isAuthenticated, getProfile);
userRouter.get("/get-other-users", isAuthenticated, getOtherUsers);

export default userRouter;
