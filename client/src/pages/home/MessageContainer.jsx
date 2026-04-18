import { useEffect, useState } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import SendMessage from "./SendMessage";
import { IoChatbubblesOutline, IoArrowBack } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { resetMessages } from "../../store/slice/message/message.slice";
import { setSelectedUser } from "../../store/slice/user/user.slice";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages, messagesHasMore, messagesLoading } = useSelector((state) => state.messageReducer);

  // Fetch initial messages
  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(resetMessages());
      dispatch(getMessageThunk({ receiverId: selectedUser._id, skip: 0, limit: 20 }));
    }
  }, [selectedUser, dispatch]);

  // Load more messages
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    dispatch(getMessageThunk({ receiverId: selectedUser._id, skip: nextPage * 20, limit: 20 }));
    setCurrentPage(nextPage);
  };

  // Handle back button on mobile
  const handleBackToUsers = () => {
    dispatch(setSelectedUser(null));
  };

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
      <div className="px-4 py-3 border-b border-white/10 bg-zinc-900/50 backdrop-blur-sm flex items-center gap-3">
        {/* Back button - Only on mobile */}
        <button onClick={handleBackToUsers} className="md:hidden flex items-center justify-center p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all" title="Back to users">
          <IoArrowBack className="text-xl" />
        </button>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <User userDetails={selectedUser} />
        </div>
      </div>

      {/* Messages area with infinite scroll */}
      <div className="flex-1 overflow-hidden px-4 py-4 flex flex-col" id="messages-container">
        {messages?.length === 0 && !messagesLoading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-zinc-500 text-sm">No messages yet — say hello! 👋</p>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={messages?.length || 0}
            next={handleLoadMore}
            hasMore={messagesHasMore}
            loader={
              <div className="flex justify-center py-4">
                <span className="spinner spinner-sm border-indigo-500 border-t-white"></span>
              </div>
            }
            endMessage={messages?.length > 0 && <p className="text-center text-zinc-500 text-sm py-4">Beginning of conversation</p>}
            inverse={true}
            scrollableTarget="messages-container"
          >
            {messages?.map((messageDetails) => (
              <Message key={messageDetails?._id} messageDetails={messageDetails} />
            ))}
          </InfiniteScroll>
        )}
      </div>

      {/* Input */}
      <SendMessage />
    </div>
  );
};

export default MessageContainer;
