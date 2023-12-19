import OtherMemberCard from '@/components/Member/OtherMember'
import UserMemberCard from '@/components/Member/User'
import { useApp } from '@/context/appContext'
import styled from '@emotion/styled'
import { Box, Grid } from '@mui/material'
import _ from 'lodash'
import React from 'react'

const GridStyled = styled(Grid)({
  overflow: 'auto',
  padding: '10px',
  '@media only screen and (max-width: 600px)': {
    overflow: 'initial',
  },
})

const MemberList = () => {
  const { otherUsers } = useApp()

  return (
    <Grid
      id='member-all-list'
      container
      direction='column'
      justifyContent={{ xs: 'center', sm: 'initial' }}
      sx={{ overflow: 'auto', height: '100%' }}
    >
      <Grid item xs={2} sx={{ padding: '10px' }}>
        <UserMemberCard />
      </Grid>

      <GridStyled id='member-other-list' item xs>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'column' },
            height: { xs: '100%', sm: 'initial' },
          }}
        >
          {_.orderBy(otherUsers, ['connect'], ['desc']).map(member => (
            <OtherMemberCard member={member} key={member.id} />
          ))}
        </Box>
      </GridStyled>
    </Grid>
  )
}

export default MemberList
