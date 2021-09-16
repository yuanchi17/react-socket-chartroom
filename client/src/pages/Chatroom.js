import _ from 'lodash'
import { AddOther, DelOther, SendAlter, SendMsg } from '../actions/chat'
import { useDispatch, useSelector } from 'react-redux'
import CardOther from '../components/CardOther'
import CardUser from '../components/CardUser'
import ChatAlert from '../components/ChatAlert'
import ChatOther from '../components/ChatOther'
import ChatUser from '../components/ChatUser'
import React, { useState, useEffect } from 'react'

const Chatroom = () => {
  const dispatch = useDispatch()
  const { members, msgs, socket } = useSelector((state) => state)
  const [inputMsg, setInputMsg] = useState('')

  useEffect(() => { // 只會在元件第一次渲染時觸發
    socket.emit('user-login', members.user)

    socket.on('user-join', user => {
      dispatch(AddOther(user))
      dispatch(SendAlter(`歡迎 ${user.name} 加入聊天室`))

      socket.emit('add-old-member', members.user) // 新人也需要有目前聊天室內的成員
    })

    socket.on('add-member', user => {
      if (_.find(members.other, ['id', user.id])) return // 已經有顯示的成員就不用再新增
      dispatch(AddOther(user))
    })

    socket.on('del-member', user => {
      if (!user.name) return
      dispatch(DelOther(user.id))
      dispatch(SendAlter(`${user.name} 已離開聊天室`))
    })

    socket.on('send-message', ({ msg, user }) => {
      dispatch(SendMsg({ msg, user, type: 'other' }))
    })
  }, [])

  const btnSend = () => {
    if (!inputMsg) return
    const obj = {
      msg: inputMsg,
      user: members.user,
    }
    socket.emit('send-message', obj)
    dispatch(SendMsg({ ...obj, type: 'user' }))

    setInputMsg('')
    const d = document.getElementById('chat-view')
    d.scrollTop = d.scrollHeight
  }

  return (
    <div>
      <h2 className="mb-3">Chat Room</h2>
      <div className="chatroom">
        <div className="member-area">
          <CardUser user={members.user} />
          <div className="member-other-list">
            {members.other.map((m) => (
              <CardOther member={m} key={m.id} />
            ))}
          </div>
        </div>
        <div className="chat-area">
          <div id="chat-view" className="chat-list py-2">
            {msgs.map((msg, index) => {
              switch (msg.type) {
                case 'user':
                  return <ChatUser msg={msg} key={index} />
                case 'other': {
                  const user = _.find(members.other, ['id', msg.userId])
                  return <ChatOther msg={msg} user={user} key={index} />
                }
                default:
                  return <ChatAlert msg={msg} key={index} />
              }
            })}
          </div>
          <form
            className="input-area mt-auto mb-1"
            onSubmit={(e) => {
              e.preventDefault()
              btnSend()
            }}
          >
            <div className="input-group flex-nowrap">
              <input
                autoFocus
                className="form-control m-1"
                placeholder="輸入訊息"
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
              ></input>
            </div>
            <button
              type="button"
              className="btn px-2 input-group-prepend"
              onClick={btnSend}
            >
              <i className="fa fa-paper-plane my-auto"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chatroom
