import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";

const SendMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { buttonLoading } = useSelector((state) => state.messageReducer);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim()) return;
    dispatch(sendMessageThunk({ receiverId: selectedUser?._id, message }));
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="px-4 py-3 border-t border-white/10 bg-zinc-900/50">
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center h-11 px-4 bg-zinc-800 border border-white/10 rounded-xl focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <input
            type="text"
            placeholder="Type a message..."
            className="grow bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          onClick={handleSendMessage}
          disabled={buttonLoading || !message.trim()}
          className="w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:bg-zinc-700 disabled:text-zinc-500 text-white flex items-center justify-center transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
        >
          {buttonLoading ? (
            <span className="spinner spinner-sm border-white/30 border-t-white"></span>
          ) : (
            <IoSend className="text-base" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
