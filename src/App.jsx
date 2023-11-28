import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { ConnectionState } from './components/ConnectState'
import { useApp } from './context/appContext'
import './index.scss'
import Chatroom from './pages/Chatroom'
import Login from './pages/Login'
import socket from './socket'

// https://socket.io/how-to/use-with-react
// https://github.com/socketio/socket.io-client/issues/1492
export default function App() {
  const { user } = useApp()
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    // console.log('socket:', socket)
    if (!socket) return

    const onConnect = () => {
      setIsConnected(true)
    }
    const onDisconnect = () => {
      setIsConnected(false)
    }

    socket.on('connect', () => {
      console.log(`socket.io-client, id: ${socket.id}`)
      onConnect()
    })
    socket.on('disconnect', onDisconnect())

    return () => {
      socket.off('connect', onConnect())
      socket.off('disconnect', onDisconnect())
    }
  }, [])

  return (
    <div className="App container pt-3">
      {isConnected ? _.isEmpty(user) ? <Login /> : <Chatroom /> : <ConnectionState isConnected={isConnected} />}
    </div>
  )
}
