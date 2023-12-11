import OtherMemberCard from '@/components/Member/OtherMember'
import UserMemberCard from '@/components/Member/User'
import { useApp } from '@/context/appContext'
import { Grid } from '@mui/material'
import _ from 'lodash'
import React from 'react'

const MemberList = () => {
  const { otherUsers } = useApp()

  // TODO: RWD
  return (
    <Grid container direction='column' sx={{ overflow: 'auto', height: '100%' }}>
      <Grid item xs={12} sm={3} sx={{ borderBottom: theme => `solid 1px ${theme.gray.main}`, padding: '10px' }}>
        <UserMemberCard />
      </Grid>

      <Grid id='member-other-list' item xs={12} sm={9} sx={{ overflow: 'auto', padding: '10px' }}>
        <Grid container spacing={2}>
          {_.orderBy(otherUsers, ['connect'], ['desc']).map(member => (
            <Grid item key={member.id} sx={{ width: '100%' }}>
              <OtherMemberCard member={member} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MemberList
