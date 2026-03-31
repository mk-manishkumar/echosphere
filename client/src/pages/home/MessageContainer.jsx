import React from 'react'

const MessageContainer = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="p-3 border-b border-b-white/10">
        <User userDetails={selectedUser} />
      </div>
    </div>
  );
}

export default MessageContainer