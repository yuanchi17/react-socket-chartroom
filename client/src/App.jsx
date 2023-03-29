import _ from 'lodash'
import './index.scss'
import { SocketConnect } from './actions/socket'
import { useSelector, useDispatch } from 'react-redux'
import Chatroom from './pages/Chatroom'
import Login from './pages/Login'
import React, { useEffect } from 'react'

export default function App () {
  const dispatch = useDispatch()
  const { members, socket } = useSelector((state) => state)
  const user = members.user

  useEffect(() => { // 只會在元件第一次渲染時觸發
    dispatch(SocketConnect())
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.on('connect', () => {
      console.log(`socket.io-client, id: ${socket.id}`)
    })
  }, [socket])

  return (
    <div className="App container pt-3">
      { _.isEmpty(user) ? <Login /> : <Chatroom />}
    </div>
  )
}
