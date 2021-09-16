import { io } from 'socket.io-client'

const initState = null

export default (state = initState, action) => {
  switch (action.type) {
    case 'SOCKET_CONNECT':
      if (state) return state
      state = io()
      return state
    default:
      return state
  }
}
