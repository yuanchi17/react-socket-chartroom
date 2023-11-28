import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import CardOther from '../components/CardOther'
import CardUser from '../components/CardUser'
import ChatAlert from '../components/ChatAlert'
import ChatOther from '../components/ChatOther'
import ChatUser from '../components/ChatUser'
import { useApp } from '../context/appContext'
import socket from '../socket'

const Chatroom = () => {
  const { dispatch, user, msgs, otherUsers } = useApp()
  const [inputMsg, setInputMsg] = useState('')

  useEffect(() => {
    // 只會在元件第一次渲染時觸發
    socket.emit('user-login', user)

    socket.on('new-user-join', newUser => {
      dispatch({ type: 'addOtherUser', payload: newUser })
      dispatch({ type: 'sendMsgAlert', payload: `歡迎 ${newUser.name} 加入聊天室` })

      socket.emit('add-old-user', { oldUser: user, newUserId: newUser.id }) // 將目前聊天室內的成員傳給新成員
    })

    socket.on('add-old-user', oldUser => {
      dispatch({ type: 'addOtherUser', payload: oldUser })
    })

    socket.on('del-user', user => {
      if (!user.name) return
      dispatch({ type: 'otherUserLogout', payload: user.id })
      dispatch({ type: 'sendMsgAlert', payload: `${user.name} 已離開聊天室` })
    })

    socket.on('send-message', ({ msg, user }) => {
      dispatch({ type: 'sendMsg', payload: { msg, user, type: 'other' } })
    })
  }, [])

  useEffect(() => {
    // 有訊息新增時滾輪自動到最底部
    const d = document.getElementById('chat-view')
    d.scrollTop = d.scrollHeight
  }, [msgs])

  const btnSend = () => {
    if (!inputMsg) return
    const obj = {
      msg: inputMsg,
      user: user,
    }
    socket.emit('send-message', obj)
    dispatch({ type: 'sendMsg', payload: { ...obj, type: 'user' } })

    setInputMsg('')
  }

  return (
    <div>
      <h2 className="mb-3">即時聊天室</h2>
      <div className="chatroom">
        <div className="member-area">
          <CardUser user={user} />
          <div className="member-other-list">
            {_.orderBy(otherUsers, ['connect'], ['desc']).map(m => (
              <CardOther member={m} key={m.id} />
            ))}
          </div>
        </div>
        <div className="chat-area pb-2">
          <div id="chat-view" className="chat-list py-2">
            {msgs.map((msg, index) => {
              switch (msg.type) {
                case 'user':
                  return <ChatUser msg={msg} key={index} />
                case 'other': {
                  const user = _.find(otherUsers, ['id', msg.userId])
                  console.log('------- case other -------')
                  return <ChatOther msg={msg} user={user} key={index} />
                }
                default:
                  return <ChatAlert msg={msg} key={index} />
              }
            })}
          </div>
          <form
            className="input-area mt-auto mb-1"
            onSubmit={e => {
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
                onChange={e => setInputMsg(e.target.value)}
              />
            </div>
            <button type="button" className="btn px-2 input-group-prepend" onClick={btnSend}>
              <i className="fa fa-paper-plane my-auto" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chatroom
