import { useEffect, useState, useMemo } from "react";
import { IoSearch } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUsersThunk, logoutUserThunk } from "../../store/slice/user/user.thunk";
import toast from "react-hot-toast";

const UserSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const { otherUsers, userProfile, buttonLoading } = useSelector((state) => state.userReducer);

  // Logout function
  const handleLogout = () => {
    toast.promise(dispatch(logoutUserThunk()).unwrap(), {
      loading: "Logging out...",
      success: "Logout successful!",
      error: (err) => err || "Logout failed ❌",
    });
  };

  // Fetch users
  useEffect(() => {
    dispatch(getOtherUsersThunk());
  }, [dispatch]);

  // filter users
  const filteredUsers = useMemo(() => {
    if (!otherUsers) return [];

    if (searchValue.trim() === "") return otherUsers;

    return otherUsers.filter((user) => {
      return user.username.toLowerCase().includes(searchValue.toLowerCase()) || user.fullName.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchValue, otherUsers]);

  return (
    <div className="w-80 shrink-0 h-screen flex flex-col bg-zinc-900 border-r border-white/10">
      {/* Header */}
      <div className="px-4 py-5 border-b border-white/10">
        <h1 className="text-indigo-500 text-xl font-bold tracking-wide">ECHOSPHERE</h1>
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-3 h-10 px-3 bg-zinc-800 border border-white/10 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <IoSearch className="text-zinc-500 text-sm shrink-0" />
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            className="grow bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
            placeholder="Search users..."
          />
        </div>
      </div>

      {/* User list */}
      <div className="flex-1 overflow-y-auto px-3 flex flex-col gap-1">
        {filteredUsers.length === 0 && (
          <p className="text-center text-zinc-500 text-sm py-8">No users found</p>
        )}
        {filteredUsers.map((userDetails) => (
          <User key={userDetails?._id} userDetails={userDetails} />
        ))}
      </div>

      {/* Current user & Logout */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 bg-zinc-900">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-indigo-500/40 shrink-0">
            <img src={userProfile?.avatar} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <span className="text-sm text-white font-medium truncate">{userProfile?.username}</span>
        </div>

        <button
          onClick={handleLogout}
          disabled={buttonLoading}
          className="flex items-center gap-2 px-3 h-8 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10 transition-all cursor-pointer disabled:opacity-50"
        >
          {buttonLoading ? (
            <span className="spinner spinner-sm border-zinc-500 border-t-white"></span>
          ) : (
            <IoLogOutOutline className="text-base" />
          )}
          <span className="hidden sm:inline">{buttonLoading ? "..." : "Logout"}</span>
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
