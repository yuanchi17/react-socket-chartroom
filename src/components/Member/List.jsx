import styled from '@emotion/styled'
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import _ from 'lodash'
import React from 'react'
import { useApp } from '../../context/appContext'

const CardContentStyled = styled(CardContent)({
  '&:last-child': {
    paddingBottom: '16px',
  },
})

const CardStyled = styled(Card)(({ theme }) => ({
  boxShadow:
    '2px 2px 1px 0.5px rgba(98,193,198,0.5), 0px 1px 1px 0px rgba(98,193,198, 0.5), 0px 1px 3px 0px rgba(98,193,198,1)',
  '&.member-disconnect': {
    backgroundColor: theme.gray.disconnect,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
}))

const MemberList = () => {
  const { user, otherUsers } = useApp()

  return (
    <Grid container direction='column' sx={{ overflow: 'auto', height: '100%' }}>
      <Grid item xs={12} sm={3} sx={{ borderBottom: theme => `solid 1px ${theme.gray.main}`, padding: '10px' }}>
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
      </Grid>

      <Grid id='member-other-list' item xs={12} sm={9} sx={{ overflow: 'auto', padding: '10px' }}>
        <Grid container spacing={2}>
          {_.orderBy(otherUsers, ['connect'], ['desc']).map(member => (
            <Grid item key={member.id} sx={{ width: '100%' }}>
              <CardStyled className={clsx(!member.connect && 'member-disconnect')}>
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
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MemberList
