import _ from 'lodash'
import { SendMsg } from '../actions/chat'
import { useDispatch, useSelector } from 'react-redux'
import CardOther from '../components/CardOther'
import CardUser from '../components/CardUser'
import ChatAlert from '../components/ChatAlert'
import ChatOther from '../components/ChatOther'
import ChatUser from '../components/ChatUser'
import React, { useState } from 'react'

const Chatroom = () => {
  const dispatch = useDispatch()
  const { members, msgs } = useSelector((state) => state)
  const [msgTmp, setMsgTmp] = useState('')

  // TODO: useEffect 同步更新
  const btnSend = () => {
    if (!msgTmp) return
    dispatch(SendMsg(msgTmp))
    setMsgTmp('')
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
          <div id="chat-view" className="chat-list">
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
            className="input-area "
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
                value={msgTmp}
                onChange={(e) => setMsgTmp(e.target.value)}
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
