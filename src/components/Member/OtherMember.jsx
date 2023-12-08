import styled from '@emotion/styled'
import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { useApp } from '../../context/appContext'

const CardContentStyled = styled(CardContent)({
  '&:last-child': {
    paddingBottom: '16px',
  },
})

const CardStyled = styled(Card)(({ theme }) => ({
  boxShadow:
    '2px 2px 1px 0.5px rgba(154,210,156,0.5), 0px 1px 1px 0px rgba(154,210,156, 0.5), 0px 1px 3px 0px rgba(154,210,156,1)',
  '&.member-disconnect': {
    backgroundColor: theme.gray.light,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
}))

const OtherMemberCard = ({ member }) => {
  const { otherUsers } = useApp()

  return (
    <CardStyled className={clsx('member-card', !member.connect && 'member-disconnect')}>
      <CardHeader
        sx={{ padding: '5px', paddingBottom: 0 }}
        avatar={<Avatar src={`https://i.imgur.com/${member.img}.png`} />}
        title={member.name}
      />
      <CardContentStyled>
        <Typography variant='body2' color='text.secondary'>
          {member.intro}
        </Typography>
      </CardContentStyled>
    </CardStyled>
  )
}

export default OtherMemberCard
