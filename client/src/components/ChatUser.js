import React from 'react'

const ChatUser = ({ msg }) => {
  return (
    <div className="chat p-2 ml-auto">
      <p className="m-0 mt-auto mb-1 time">{msg.time}</p>
      <div className="msg-area mx-0 py-1 px-2 text-right">
        <p className="m-0 p-2 text-wrap msg msg-user">{msg.text}</p>
      </div>
    </div>
  )
}

export default ChatUser
