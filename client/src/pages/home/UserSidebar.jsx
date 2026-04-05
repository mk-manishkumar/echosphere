import { useEffect, useState, useMemo } from "react";
import { IoSearch } from "react-icons/io5";
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
    <div className="max-w-[20em] w-full h-screen flex flex-col border-r border-r-white/10">
      <h1 className="bg-black mx-3 rounded-lg mt-3 px-2 py-1 text-[#7480FF] text-xl font-semibold">GUP SHUP</h1>

      <div className="p-3">
        <label className="input input-bordered flex items-center gap-2">
          <input onChange={(e) => setSearchValue(e.target.value)} type="text" className="grow" placeholder="Search" />
          <IoSearch />
        </label>
      </div>

      <div className="h-full overflow-y-auto px-3 flex flex-col gap-2">
        {filteredUsers.map((userDetails) => (
          <User key={userDetails?._id} userDetails={userDetails} />
        ))}
      </div>

      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img src={userProfile?.avatar} alt="user_image" />
            </div>
          </div>
          <h2>{userProfile?.username}</h2>
        </div>

        <button onClick={handleLogout} className="btn btn-primary btn-sm px-4" disabled={buttonLoading}>
          {buttonLoading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
