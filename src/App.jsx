import { Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useApp } from './context/appContext'
import './index.scss'
import Chatroom from './pages/Chatroom'
import Login from './pages/Login'
import NotConnect from './pages/NotConnect'
import socket from './socket'
import COLOR from './utils/theme-color'

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

  const theme = createTheme(COLOR)

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          background: theme => `linear-gradient(${theme.green.light},${theme.yellow.light})`,
        }}
      >
        {isConnected ? _.isEmpty(user.name) ? <Login /> : <Chatroom /> : <NotConnect />}
      </Box>
    </ThemeProvider>
  )
}
