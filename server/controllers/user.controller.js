import User from "../models/User.model.js";
import { errorHandler } from "../utils/errorHandler.utility.js";
import { asyncHandler } from "../utils/asyncHandler.utility.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Message from "../models/Message.model.js";
import Conversation from "../models/Conversation.model.js";

// REGISTER
export const register = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, gender } = req.body;

  if (!fullName || !username || !password || !gender) {
    return next(new errorHandler("All fields are required", 400));
  }

  const user = await User.findOne({ username });
  if (user) return next(new errorHandler("User already exists", 400));

  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarStyle = gender === "male" ? "adventurer" : "lorelei";
  const avatar = `https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${username}`;

  const newUser = await User.create({
    username,
    fullName,
    password: hashedPassword,
    gender,
    avatar,
    last_login_at: new Date(),
  });

  const tokenData = { _id: newUser?._id };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: {
        newUser,
        token,
      },
    });
});

// LOGIN
export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) return next(new errorHandler("Please enter a valid username or password", 400));

  const user = await User.findOne({ username });
  if (!user) return next(new errorHandler("Please enter a valid username or password", 400));

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return next(new errorHandler("Please enter a valid username or password", 400));

  // Update last login
  user.last_login_at = new Date();
  await user.save();

  const tokenData = { _id: user?._id };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: {
        user,
        token,
      },
    });
});

// GET PROFILE
export const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const profile = await User.findById(userId).select("-password");

  res.status(200).json({ success: true, responseData: profile });
});

// LOG-OUT
export const logout = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout successful!",
    });
});

// GET OTHER USERS
export const getOtherUsers = asyncHandler(async (req, res, next) => {
  const { skip = 0, limit = 10 } = req.query;
  const skipNum = Number.parseInt(skip, 10);
  const limitNum = Number.parseInt(limit, 10);

  const otherUsers = await User.find({ _id: { $ne: req.user._id } })
    .select("-password -last_login_at")
    .skip(skipNum)
    .limit(limitNum)
    .sort({ createdAt: -1 });

  const totalCount = await User.countDocuments({ _id: { $ne: req.user._id } });

  res.status(200).json({
    success: true,
    responseData: {
      users: otherUsers,
      totalCount,
      hasMore: skipNum + limitNum < totalCount,
    },
  });
});

// CHECK USERNAME AVAILABILITY
export const checkUsernameAvailability = asyncHandler(async (req, res, next) => {
  const { username } = req.query;

  if (!username || username.trim().length === 0) {
    return next(new errorHandler("Username is required", 400));
  }

  const user = await User.findOne({ username: username.trim() });

  res.status(200).json({
    success: true,
    responseData: {
      available: !user,
    },
  });
});

// UPDATE PROFILE
export const updateProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { fullName, username, gender } = req.body;

  if (!fullName || !username || !gender) {
    return next(new errorHandler("All fields are required", 400));
  }

  // Validate fullName length
  if (fullName.trim().length < 2 || fullName.trim().length > 50) {
    return next(new errorHandler("Full name must be between 2 and 50 characters", 400));
  }

  // Validate username length
  if (username.trim().length < 3 || username.trim().length > 20) {
    return next(new errorHandler("Username must be between 3 and 20 characters", 400));
  }

  // Check if new username already exists (excluding current user)
  const existingUser = await User.findOne({
    username: username.trim(),
    _id: { $ne: userId },
  });

  if (existingUser) {
    return next(new errorHandler("Username already taken", 400));
  }

  // Update user profile
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      fullName: fullName.trim(),
      username: username.trim(),
      gender,
    },
    { new: true, runValidators: true },
  ).select("-password");

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    responseData: updatedUser,
  });
});

// CHANGE PASSWORD
export const changePassword = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(new errorHandler("All password fields are required", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new errorHandler("New password and confirm password do not match", 400));
  }

  if (newPassword.length < 6) {
    return next(new errorHandler("New password must be at least 6 characters long", 400));
  }

  if (oldPassword === newPassword) {
    return next(new errorHandler("New password must be different from old password", 400));
  }

  // Get user with password field
  const user = await User.findById(userId);
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  // Verify old password
  const isValidPassword = await bcrypt.compare(oldPassword, user.password);
  if (!isValidPassword) {
    return next(new errorHandler("Old password is incorrect", 401));
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

// DELETE ACCOUNT
export const deleteAccount = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { password } = req.body;

  if (!password) {
    return next(new errorHandler("Password is required for account deletion", 400));
  }

  // Get user with password field
  const user = await User.findById(userId);
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return next(new errorHandler("Password is incorrect", 401));
  }

  // Delete all messages sent by user
  await Message.deleteMany({ senderId: userId });

  // Delete all messages received by user
  await Message.deleteMany({ receiverId: userId });

  // Delete all conversations involving user
  await Conversation.deleteMany({ participants: userId });

  // Delete user
  await User.findByIdAndDelete(userId);

  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Account deleted successfully",
    });
});
