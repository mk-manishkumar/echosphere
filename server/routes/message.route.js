import express from "express";
import { isAuthenticated } from "../middlewares/auth.middlware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/send/:receiverId", isAuthenticated, sendMessage);
messageRouter.get("/get-messages/:otherParticipantId", isAuthenticated, getMessages);

export default messageRouter;
