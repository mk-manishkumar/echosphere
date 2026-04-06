import { useEffect } from "react";
import UserSidebar from "./UserSidebar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import { initializeSocketThunk, setOnlineUsers } from "../../store/slice/socket/socket.slice";
import { setNewMessage } from "../../store/slice/message/message.slice";

const Home = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, userProfile } = useSelector((state) => state.userReducer);
  const { socket } = useSelector((state) => state.socketReducer);

  // Initialize socket
  useEffect(() => {
    if (!isAuthenticated || !userProfile?._id) return;

    dispatch(initializeSocketThunk(userProfile._id));
  }, [isAuthenticated, userProfile?._id, dispatch]);

  // Listen to socket events
  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    };

    const handleNewMessage = (newMessage) => {
      dispatch(setNewMessage(newMessage));
    };

    socket.on("onlineUsers", handleOnlineUsers);
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch]);

  return (
    <div className="flex">
      <UserSidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
