import React from 'react'

const CardOther = ({ member }) => {
  return (
    <>
      {member.connect ? (
        <div className='member-other m-2 p-2'>
          <div className='other-img-area d-flex'>
            <img className='img-fluid my-auto' src={`https://i.imgur.com/${member.img}.png`} alt='other' />
          </div>
          <div className='other-intro-area ml-2 text-left'>
            <p className='m-0 name'>{member.name}</p>
            <span className='text-wrap text-muted intro'>{member.intro}</span>
          </div>
        </div>
      ) : (
        <div className='member-other m-2 p-2 leave-member'>
          <div className='other-img-area d-flex'>
            <img className='img-fluid my-auto' src={`https://i.imgur.com/${member.img}.png`} alt='other' />
          </div>
          <div className='other-intro-area ml-2 text-left'>
            <p className='m-0 name'>{member.name}</p>
            <span className='text-wrap text-muted intro'>{member.intro}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default CardOther
