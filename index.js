const cors = require('cors')
const path = require('path')

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3001
const server = require("http").createServer(app)
const io = require('socket.io')(server)

// chatroom server
io.on('connection', socket => {
  console.log('socket.io connect')
  // io.send('Hello!')

  // io.on('message', data => {
  //   console.log('on message: ', data)
  // })
})

app.io = io
app.use(cors())
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
server.listen(PORT, () => {
  console.log(`server listening on ${PORT}`)
})

// https://socket.io/docs/v4/how-it-works/#Socket-IO
// https://github.com/socketio/socket.io
// https://creativecoding.in/2020/03/25/%E7%94%A8-socket-io-%E5%81%9A%E4%B8%80%E5%80%8B%E5%8D%B3%E6%99%82%E8%81%8A%E5%A4%A9%E5%AE%A4%E5%90%A7%EF%BC%81%EF%BC%88%E7%9B%B4%E6%92%AD%E7%AD%86%E8%A8%98%EF%BC%89/
// https://fred-zone.blogspot.com/2011/11/nodejs-express-socketio-websocket.html