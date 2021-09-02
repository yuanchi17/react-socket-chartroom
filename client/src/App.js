import _ from 'lodash'
import './index.scss'
import { useSelector } from 'react-redux'
import Chatroom from './pages/Chatroom'
import Login from './pages/Login'
import React from 'react'

export default function App () {
  const user = useSelector(state => {
    console.log(state)
    return state.members.user
  })

  return (
    <div className="App container pt-3">
      { _.isEmpty(user) ? <Login /> : <Chatroom />}
    </div>
  )
}
