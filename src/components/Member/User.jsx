import styled from '@emotion/styled'
import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { useApp } from '../../context/appContext'

const CardContentStyled = styled(CardContent)({
  '&:last-child': {
    paddingBottom: '16px',
  },
})

const CardStyled = styled(Card)({
  boxShadow:
    '2px 2px 1px 0.5px rgba(98,193,198,0.5), 0px 1px 1px 0px rgba(98,193,198, 0.5), 0px 1px 3px 0px rgba(98,193,198,1)',
})

const UserMemberCard = () => {
  const { user } = useApp()

  return (
    <CardStyled sx={{ width: '100%' }}>
      <CardHeader
        sx={{ padding: '5px', paddingBottom: 0 }}
        avatar={<Avatar src={`https://i.imgur.com/${user.img}.png`} />}
        title={user.name}
      />
      <CardContentStyled>
        <Typography variant='body2' color='text.secondary'>
          {user.intro}
        </Typography>
      </CardContentStyled>
    </CardStyled>
  )
}

export default UserMemberCard
