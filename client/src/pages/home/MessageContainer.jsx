import { useEffect } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import SendMessage from "./SendMessage";

const MessageContainer = () => {
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  useEffect(() => {
    if (selectedUser?._id) dispatch(getMessageThunk({ receiverId: selectedUser._id }));
  }, [selectedUser, dispatch]);

  // No user selected
  if (selectedUser == null) {
    return (
      <div className="w-full flex items-center justify-center flex-col gap-5">
        <h2>Welcome to Echosphere</h2>
        <p className="text-xl">Please select a person to continue your chat!!</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-b-white/10">
        <User userDetails={selectedUser} />
      </div>

      {/* Messages */}
      <div className="h-full overflow-y-auto p-3 flex flex-col gap-2">{messages?.length === 0 ? <div className="flex justify-center items-center h-full text-gray-400">No messages yet</div> : messages?.map((messageDetails) => <Message key={messageDetails?._id} messageDetails={messageDetails} />)}</div>

      {/* Input */}
      <SendMessage />
    </div>
  );
};

export default MessageContainer;
