import React from 'react'

const ChatOther = ({ msg, user }) => {
  return (
    <div className="chat px-2 py-1">
      <div className="img-area">
        <img
          className="img-fluid mt-1"
          src={`https://i.imgur.com/${user.img}.png`}
          alt="other"
        ></img>
      </div>
      <div className="msg-area mx-0 p-1 pl-2 text-left">
        <small className="m-0 mb-1 name">{user.name}</small>
        <p className="m-0 p-2 text-wrap msg">{msg.text}</p>
      </div>
      <small className="m-0 mt-auto mb-1 time">{msg.time}</small>
    </div>
  )
}

export default ChatOther
