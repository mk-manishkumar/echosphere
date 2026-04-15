import cron from "node-cron";
import User from "../models/User.model.js";
import Message from "../models/Message.model.js";
import Conversation from "../models/Conversation.model.js";

// Run daily at 2 AM
const scheduleInactivityCleanup = () => {
  cron.schedule("0 2 * * *", async () => {
    try {
      const hundredDaysAgo = new Date();
      hundredDaysAgo.setDate(hundredDaysAgo.getDate() - 100);

      // Find users with last_login_at greater than 100 days
      const inactiveUsers = await User.find({
        last_login_at: { $lt: hundredDaysAgo },
      });

      if (inactiveUsers.length === 0) {
        console.log("[CRON] No inactive users found for deletion");
        return;
      }

      const inactiveUserIds = inactiveUsers.map((user) => user._id);

      // Delete all messages related to inactive users
      await Message.deleteMany({
        $or: [{ senderId: { $in: inactiveUserIds } }, { receiverId: { $in: inactiveUserIds } }],
      });

      // Delete all conversations involving inactive users
      await Conversation.deleteMany({
        participants: { $in: inactiveUserIds },
      });

      // Delete inactive users
      await User.deleteMany({
        _id: { $in: inactiveUserIds },
      });

      console.log(`[CRON] Successfully deleted ${inactiveUsers.length} inactive users and their associated data`);
    } catch (error) {
      console.error("[CRON] Error in inactivity cleanup:", error);
    }
  });
};

export default scheduleInactivityCleanup;
