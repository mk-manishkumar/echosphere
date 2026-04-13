import { useEffect } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import SendMessage from "./SendMessage";
import { IoChatbubblesOutline } from "react-icons/io5";

const MessageContainer = () => {
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  useEffect(() => {
    if (selectedUser?._id) dispatch(getMessageThunk({ receiverId: selectedUser._id }));
  }, [selectedUser, dispatch]);

  // No user selected — empty state
  if (selectedUser == null) {
    return (
      <div className="flex-1 flex items-center justify-center flex-col gap-4 bg-zinc-950">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
          <IoChatbubblesOutline className="text-indigo-500 text-3xl" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-1">Welcome to Echosphere</h2>
          <p className="text-sm text-zinc-500">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-screen flex flex-col bg-zinc-950">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-white/10 bg-zinc-900/50 backdrop-blur-sm">
        <User userDetails={selectedUser} />
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages?.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-zinc-500 text-sm">No messages yet — say hello! 👋</p>
          </div>
        ) : (
          messages?.map((messageDetails) => (
            <Message key={messageDetails?._id} messageDetails={messageDetails} />
          ))
        )}
      </div>

      {/* Input */}
      <SendMessage />
    </div>
  );
};

export default MessageContainer;
