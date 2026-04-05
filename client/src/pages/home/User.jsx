import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/user.slice";

const User = ({ userDetails }) => {
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.userReducer);
  const { onlineUsers } = useSelector((state) => state.socketReducer);
  const isUserOnline = onlineUsers?.includes(userDetails?._id);

  const handleUserClick = () => dispatch(setSelectedUser(userDetails));

  return (
    <button onClick={handleUserClick} className={`w-full text-left flex gap-5 items-center hover:bg-gray-700 rounded-lg py-1 px-2 cursor-pointer ${userDetails?._id === selectedUser?._id ? "bg-gray-700" : ""}`}>
      <div className={`avatar ${isUserOnline ? "online" : ""}`}>
        <div className="w-12 rounded-full overflow-hidden">
          <img src={userDetails?.avatar} alt="avatar" loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </div>
      </div>

      <div>
        <h2 className="line-clamp-1">{userDetails?.fullName}</h2>
        <p className="text-xs">{userDetails?.username}</p>
      </div>
    </button>
  );
};

export default User;
