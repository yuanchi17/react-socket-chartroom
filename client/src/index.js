import './index.scss'
import { io } from 'socket.io-client'
import { Provider } from 'react-redux'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'

const socket = io()

socket.on('connect', () => {
  console.log('client socket.io')
  console.log(socket.id) // x8WIv7-mJelg7on_ALbx
})

const rootElement = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
)
