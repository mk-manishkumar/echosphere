import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ messageDetails }) => {
  const messageRef = useRef(null);
  const { userProfile, selectedUser } = useSelector((state) => state.userReducer);

  const isSender = userProfile?._id === messageDetails?.senderId;

  useEffect(() => {
    if (messageRef.current) messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Format timestamp
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div ref={messageRef} className={`flex gap-2.5 ${isSender ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1">
        <img
          alt="avatar"
          src={isSender ? userProfile?.avatar : selectedUser?.avatar}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bubble */}
      <div className={`max-w-[70%] flex flex-col ${isSender ? "items-end" : "items-start"}`}>
        <div
          className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isSender
              ? "bg-indigo-600 text-white rounded-br-md"
              : "bg-zinc-800 text-zinc-100 border border-white/5 rounded-bl-md"
          }`}
        >
          {messageDetails?.message}
        </div>
        <span className="text-[10px] text-zinc-600 mt-1 px-1">
          {formatTime(messageDetails?.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Message;
