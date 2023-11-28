import React from 'react'

const ChatUser = ({ msg }) => {
  return (
    <div className='chat px-2 py-1 ml-auto'>
      <small className='m-0 mt-auto mb-1 time'>{msg.time}</small>
      <div className='msg-area mx-0 p-1 pr-2 text-right'>
        <p className='m-0 p-2 text-wrap msg msg-user'>{msg.text}</p>
      </div>
    </div>
  )
}

export default ChatUser
