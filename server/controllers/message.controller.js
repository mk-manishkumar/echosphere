import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { asyncHandler } from "../utils/asyncHandler.utility.js";
import { errorHandler } from "../utils/errorHandler.utility.js";
import { getSocketId, io } from "../socket/socket.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const receiverId = req.params.receiverId;
  const message = req.body.message;

  if (!senderId || !receiverId || !message) {
    return next(new errorHandler("All fields are required", 400));
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = await Message.create({ senderId, receiverId, message });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }

  // socket.io
  const socketId = getSocketId(receiverId);
  io.to(socketId).emit("newMessage", newMessage);

  res.status(200).json({
    success: true,
    responseData: newMessage,
  });
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const myId = req.user._id;
  const otherParticipantId = req.params.otherParticipantId;
  const { skip = 0, limit = 20 } = req.query;
  const skipNum = Number.parseInt(skip, 10);
  const limitNum = Number.parseInt(limit, 10);

  if (!myId || !otherParticipantId) {
    return next(new errorHandler("All fields are required", 400));
  }

  // Get total count first
  const fullConversation = await Conversation.findOne({
    participants: { $all: [myId, otherParticipantId] },
  });
  const totalMessagesCount = fullConversation?.messages?.length || 0;

  // Get paginated messages (return in reverse chronological order for easier pagination)
  let conversation = await Conversation.findOne({
    participants: { $all: [myId, otherParticipantId] },
  }).populate({
    path: "messages",
    options: {
      sort: { createdAt: -1 },
      skip: skipNum,
      limit: limitNum,
    },
  });

  res.status(200).json({
    success: true,
    responseData: {
      conversation,
      messages: conversation?.messages || [],
      totalCount: totalMessagesCount,
      hasMore: skipNum + limitNum < totalMessagesCount,
    },
  });
});
