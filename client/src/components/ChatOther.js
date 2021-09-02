import React from 'react'

const ChatOther = ({ msg, user }) => {
  return (
    <div className="chat p-2">
      <div className="img-area">
        <img
          className="img-fluid mt-1"
          src={`https://i.imgur.com/${user.img}.png`}
          alt="other"
        ></img>
      </div>
      <div className="msg-area mx-0 py-1 px-2 text-left">
        <p className="m-0 mb-1 name">{user.name}</p>
        <p className="m-0 p-2 text-wrap msg">{msg.text}</p>
      </div>
      <p className="m-0 mt-auto mb-1 time">{msg.time}</p>
    </div>
  )
}

export default ChatOther
