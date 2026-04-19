import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch, IoLogOutOutline, IoCreateOutline } from "react-icons/io5";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUsersThunk, logoutUserThunk } from "../../store/slice/user/user.thunk";
import { resetUsers } from "../../store/slice/user/user.slice";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";

const UserSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { otherUsers, userProfile, buttonLoading, usersHasMore, usersLoading } = useSelector((state) => state.userReducer);

  // Logout function
  const handleLogout = () => {
    toast.promise(dispatch(logoutUserThunk()).unwrap(), {
      loading: "Logging out...",
      success: "Logout successful!",
      error: (err) => err || "Logout failed ❌",
    });
  };

  // Fetch initial users
  useEffect(() => {
    dispatch(resetUsers());
    dispatch(getOtherUsersThunk({ skip: 0, limit: 10 }));
  }, [dispatch]);

  // Load more users
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    dispatch(getOtherUsersThunk({ skip: nextPage * 10, limit: 10 }));
    setCurrentPage(nextPage);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    // Reset pagination when search is cleared
    if (value.trim() === "") {
      setCurrentPage(0);
    }
  };

  // filter users
  const filteredUsers = useMemo(() => {
    if (!otherUsers || otherUsers.length === 0) return [];

    if (searchValue.trim() === "") return otherUsers;

    return otherUsers.filter((user) => {
      return user.username.toLowerCase().includes(searchValue.toLowerCase()) || user.fullName.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchValue, otherUsers]);

  return (
    <div className="w-full h-screen flex flex-col bg-zinc-900 border-r border-white/10">
      {/* Header */}
      <div className="px-4 py-5 border-b border-white/10">
        <h1 className="text-indigo-500 text-xl font-bold tracking-wide text-center md:text-left">ECHOSPHERE</h1>
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-3 h-10 px-3 bg-zinc-800 border border-white/10 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <IoSearch className="text-zinc-500 text-sm shrink-0" />
          <input onChange={handleSearchChange} type="text" className="grow bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none" placeholder="Search users..." />
        </div>
      </div>

      {/* User list */}
      <div className="flex-1 overflow-hidden px-3 flex flex-col">
        {filteredUsers.length === 0 && !usersLoading && <p className="text-center text-zinc-500 text-sm py-8">No users found</p>}
        <InfiniteScroll
          dataLength={filteredUsers.length}
          next={handleLoadMore}
          hasMore={usersHasMore && searchValue.trim() === ""}
          loader={
            <div className="flex justify-center py-4">
              <span className="spinner spinner-sm border-indigo-500 border-t-white"></span>
            </div>
          }
          endMessage={filteredUsers.length > 0 && <p className="text-center text-zinc-500 text-sm py-4">No more users to load</p>}
          style={{ overflow: "hidden" }}
          height="auto"
        >
          <div className="flex flex-col gap-1 overflow-y-auto">
            {filteredUsers.map((userDetails) => (
              <User key={userDetails?._id} userDetails={userDetails} />
            ))}
          </div>
        </InfiniteScroll>
      </div>

      {/* Current user & Logout */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 bg-zinc-900 gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-indigo-500/40 shrink-0">
            <img src={userProfile?.avatar} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <span className="text-sm text-white font-medium truncate">{userProfile?.username}</span>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/edit-profile")} className="flex items-center justify-center p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10 rounded-lg transition-all cursor-pointer" title="Edit Profile">
            <IoCreateOutline className="text-base" />
          </button>

          <button onClick={handleLogout} disabled={buttonLoading} className="flex items-center gap-2 px-3 h-8 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10 transition-all cursor-pointer disabled:opacity-50">
            {buttonLoading ? <span className="spinner spinner-sm border-zinc-500 border-t-white"></span> : <IoLogOutOutline className="text-base" />}
            <span className="hidden sm:inline">{buttonLoading ? "..." : "Logout"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
