import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
const ChatActions = require('../actions/chat')

const Login = () => {
  const dispatch = useDispatch()
  const { socket } = useSelector((state) => state)
  const [page, setPage] = useState('name')
  const [user, setUser] = useState({
    name: '',
    intro: '',
  })

  const btnName = () => {
    if (!user.name) return
    setPage('intro')
  }

  const btnLogin = () => {
    if (!user) return
    dispatch(ChatActions.UserLogin({ user, id: socket.id }))
  }

  return (
    <div>
      <h2 className="mb-3">Chat Room</h2>
      {page === 'name'
        ? (<form
          className="input-area"
          onSubmit={(e) => {
            e.preventDefault()
            btnName()
          }}
        >
          <div className="input-group flex-nowrap">
            <input
              autoFocus
              className="form-control m-1"
              placeholder="請輸入暱稱"
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            ></input>
          </div>
        </form>)
        : (<form
          className="input-area"
          onSubmit={(e) => {
            e.preventDefault()
            btnLogin()
          }}>
          <div className="input-group flex-nowrap">
            <input
              autoFocus
              className="form-control m-1"
              placeholder={`Hi ${user.name}，介紹一下自己吧 :D`}
              type="text"
              value={user.intro}
              onChange={(e) => setUser({ ...user, intro: e.target.value })}
            ></input>
          </div>
        </form>)}
    </div>
  )
}

export default Login
