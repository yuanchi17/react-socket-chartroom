import React from 'react'

const CardUser = ({ user }) => {
  return (
    <div className='member-user px-3'>
      <img className='user-img img-fluid my-2' src={`https://i.imgur.com/${user.img}.png`} alt='user' />
      <p className='name m-0'>{user.name}</p>
      <p className='text-wrap intro'>{user.intro}</p>
    </div>
  )
}

export default CardUser
