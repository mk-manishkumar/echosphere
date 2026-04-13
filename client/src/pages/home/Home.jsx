import { useEffect } from "react";
import UserSidebar from "./UserSidebar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, userProfile } = useSelector((state) => state.userReducer);

  // Connect/disconnect socket via middleware
  useEffect(() => {
    if (!isAuthenticated || !userProfile?._id) return;

    // Tell the middleware to connect
    dispatch({ type: "socket/connect", payload: userProfile._id });

    return () => {
      // Tell the middleware to clean up when component unmounts
      dispatch({ type: "socket/disconnect" });
    };
  }, [isAuthenticated, userProfile?._id, dispatch]);

  return (
    <div className="h-screen bg-zinc-950 flex">
      <UserSidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
