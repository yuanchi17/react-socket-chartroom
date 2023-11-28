import React from 'react'

const ChatAlert = ({ msg }) => {
  return (
    <div className="msg-area msg-alert-area mx-auto py-1 px-2 text-center">
      <p className="m-0 p-2 text-wrap msg msg-alert">{msg.text}</p>
    </div>
  )
}

export default ChatAlert
