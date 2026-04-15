import express from "express";
import { getOtherUsers, getProfile, login, logout, register, checkUsernameAvailability, updateProfile, changePassword, deleteAccount } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middlware.js";

const userRouter = express.Router();

// Auth routes
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", isAuthenticated, logout);

// User routes
userRouter.get("/get-profile", isAuthenticated, getProfile);
userRouter.get("/get-other-users", isAuthenticated, getOtherUsers);
userRouter.get("/check-username", isAuthenticated, checkUsernameAvailability);

// Profile management routes
userRouter.put("/update-profile", isAuthenticated, updateProfile);
userRouter.put("/change-password", isAuthenticated, changePassword);
userRouter.delete("/account", isAuthenticated, deleteAccount);

export default userRouter;
