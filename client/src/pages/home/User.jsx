import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/user.slice";

const User = ({ userDetails }) => {
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.userReducer);
  const { onlineUsers } = useSelector((state) => state.socketReducer);
  const isUserOnline = onlineUsers?.includes(userDetails?._id);
  const isSelected = userDetails?._id === selectedUser?._id;

  const handleUserClick = () => dispatch(setSelectedUser(userDetails));

  return (
    <button
      onClick={handleUserClick}
      className={`w-full text-left flex gap-3 items-center rounded-lg py-2.5 px-3 cursor-pointer transition-all ${
        isSelected
          ? "bg-indigo-500/10 border border-indigo-500/30"
          : "border border-transparent hover:bg-zinc-800"
      }`}
    >
      {/* Avatar with online indicator */}
      <div className="relative shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={userDetails?.avatar} alt="avatar" loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </div>
        {isUserOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-zinc-900"></span>
        )}
      </div>

      {/* User info */}
      <div className="min-w-0 flex-1">
        <h2 className={`text-sm font-medium truncate ${isSelected ? "text-indigo-300" : "text-white"}`}>
          {userDetails?.fullName}
        </h2>
        <p className="text-xs text-zinc-500 truncate">@{userDetails?.username}</p>
      </div>

      {/* Gender badge */}
      {userDetails?.gender && (
        <span
          className={`w-7 h-7 shrink-0 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
            userDetails.gender === "male"
              ? "border-indigo-500/50 text-indigo-400"
              : "border-pink-500/50 text-pink-400"
          }`}
        >
          {userDetails.gender === "male" ? "M" : "F"}
        </span>
      )}
    </button>
  );
};

export default User;
