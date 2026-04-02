import express from "express";
import { register } from "../controllers/user.controller.js";

const userRouter = express.Router();

router.post("/register", register);

export default userRouter;
