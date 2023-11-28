import { clsx } from 'clsx'
import React, { useState } from 'react'
import { useApp } from '../context/appContext'
import socket from '../socket'

const Login = () => {
  const { dispatch } = useApp()

  const [page, setPage] = useState('name')
  const [user, setUser] = useState({
    img: '',
    intro: '',
    name: '',
  })
  const imgs = ['yCC8VdH', 'Xee8Yda', 'ZelpWqC', 'ysk042a']

  const btnName = () => {
    console.log(user)
    if (!user.name || !user.img) return
    setPage('intro')
  }

  const btnLogin = () => {
    if (!user) return
    dispatch({ type: 'userLogin', payload: { ...user, id: socket.id } })
  }

  return (
    <div>
      <h2 className='mb-3'>即時聊天室</h2>
      {imgs.map(img => (
        <button
          className={clsx('btn btn-img m-2 p-0', user.img === img && 'select-img')}
          key={img}
          onClick={() => setUser({ ...user, img })}
        >
          <img className='w-100 rounded' src={`https://i.imgur.com/${img}.png`} />
        </button>
      ))}
      <form
        className='input-area my-2'
        onSubmit={e => {
          e.preventDefault()
          btnName()
        }}
      >
        <div className='input-group flex-nowrap'>
          <input
            autoFocus
            className='form-control m-1'
            placeholder='請輸入暱稱'
            type='text'
            value={user.name}
            maxLength='20'
            onChange={e => setUser({ ...user, name: e.target.value })}
          />
        </div>
      </form>
      {page === 'name' ? (
        <></>
      ) : (
        <form
          className='input-area'
          onSubmit={e => {
            e.preventDefault()
            btnLogin()
          }}
        >
          <div className='input-group flex-nowrap'>
            <input
              autoFocus
              className='form-control m-1'
              placeholder={`Hi ${user.name}，介紹一下自己吧 :D`}
              type='text'
              value={user.intro}
              onChange={e => setUser({ ...user, intro: e.target.value })}
            />
          </div>
        </form>
      )}
    </div>
  )
}

export default Login
