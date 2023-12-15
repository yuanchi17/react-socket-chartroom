import OtherMemberCard from '@/components/Member/OtherMember'
import UserMemberCard from '@/components/Member/User'
import { useApp } from '@/context/appContext'
import styled from '@emotion/styled'
import { Grid } from '@mui/material'
import _ from 'lodash'
import React from 'react'

const GridStyled = styled(Grid)({
  overflow: 'auto',
  padding: '10px',
  '@media only screen and (max-width: 600px)': {
    overflow: 'initial',
  },
})

const CardGridContainerStyled = styled(Grid)({
  '@media only screen and (max-width: 600px)': {
    flexWrap: 'nowrap',
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
      <Grid item xs={3} sx={{ padding: '10px' }}>
        <UserMemberCard />
      </Grid>

      <GridStyled id='member-other-list' item xs={9}>
        <CardGridContainerStyled container spacing={2} direction={{ xs: 'row', sm: 'column' }}>
          {_.orderBy(otherUsers, ['connect'], ['desc']).map(member => (
            <Grid item key={member.id} sx={{ width: '100%', minWidth: '160px' }}>
              <OtherMemberCard member={member} />
            </Grid>
          ))}
        </CardGridContainerStyled>
      </GridStyled>
    </Grid>
  )
}

export default MemberList
