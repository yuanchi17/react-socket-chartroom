import { useDispatch, useSelector } from 'react-redux'
import { UserLogin } from '../actions/chat'
import React, { useState } from 'react'

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
    dispatch(UserLogin({ user, id: socket.id }))
  }

  return (
    <div>
      <h2 className="mb-3">即時聊天室</h2>
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
              maxLength="20"
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
