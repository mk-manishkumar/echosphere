import React from 'react'

const User = () => {
  return (
    <div onClick={handleUserClick} className={`flex gap-5 items-center hover:bg-gray-700 rounded-lg py-1 px-2 cursor-pointer ${userDetails?._id === selectedUser?._id && "bg-gray-700"}`}>
      <div className={`avatar ${isUserOnline && "online"}`}>
        <div className="w-12 rounded-full">
          <img src={userDetails?.avatar} />
        </div>
      </div>
      <div>
        <h2 className="line-clamp-1">{userDetails?.fullName}</h2>
        <p className="text-xs">{userDetails?.username}</p>
      </div>
    </div>
  );
}

export default User