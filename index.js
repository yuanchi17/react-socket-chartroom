const cors = require('cors')
const path = require('path')
// https://socket.io/docs/v4/server-initialization/#with-an-http-server
const { createServer } = require("http") 
const { Server } = require("socket.io")
// const express = require('express')
// const app = express()

const PORT = process.env.PORT || 4000
const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
})

// chatroom server
io.on('connection', socket => {
  let isAdded = false
  console.log(`socket.io connect, id: ${socket.id}`)

  socket.on('user-login', user => {
    if (isAdded) return
    socket.userName = user.name
    socket.broadcast.emit('user-join', user)
    isAdded = true
  })

  socket.on('add-old-member', user => {
    socket.broadcast.emit('add-member', user)
  })

  socket.on('send-message', ({ msg, user }) => {
    socket.broadcast.emit('send-message', { msg, user })
  })

  socket.on('disconnect', () => {
    console.log(`socket.io disconnect, id: ${socket.id}, name: ${socket.userName}`)
    socket.broadcast.emit('del-member', { id: socket.id, name: socket.userName })
  })
})

// app.io = io
// app.use(cors())
// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, 'client/build')))
httpServer.listen(PORT, () => {
  console.log(`httpServer listening on ${PORT}`)
})

// https://socket.io/docs/v4/how-it-works/#Socket-IO
// https://github.com/socketio/socket.io
// https://creativecoding.in/2020/03/25/%E7%94%A8-socket-io-%E5%81%9A%E4%B8%80%E5%80%8B%E5%8D%B3%E6%99%82%E8%81%8A%E5%A4%A9%E5%AE%A4%E5%90%A7%EF%BC%81%EF%BC%88%E7%9B%B4%E6%92%AD%E7%AD%86%E8%A8%98%EF%BC%89/
// https://fred-zone.blogspot.com/2011/11/nodejs-express-socketio-websocket.html