import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const UserSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  console.log(searchValue);

  return (
    <div className="max-w-[20em] w-full h-screen flex flex-col border-r border-r-white/10">
      <h1 className="bg-black mx-3 rounded-lg mt-3 px-2 py-1 text-[#7480FF] text-xl font-semibold">Echosphere</h1>

      <div className="p-3">
        <label className="input input-bordered flex items-center gap-2">
          <input onChange={(e) => setSearchValue(e.target.value)} type="text" className="grow" placeholder="Search" />
          <IoSearch />
        </label>
      </div>

      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img src={userProfile?.avatar} />
            </div>
          </div>
          <h2>{userProfile?.username}</h2>
        </div>

        <button onClick={handleLogout} className="btn btn-primary btn-sm px-4">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
