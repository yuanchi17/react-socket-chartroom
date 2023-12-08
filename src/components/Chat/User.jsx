import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const UserChat = ({ msg, user }) => {
  console.log(msg)
  return (
    <Grid item sx={{ display: 'flex', flexFlow: 'column', textAlign: 'end' }}>
      <Typography variant='body2' gutterBottom>
        {user.name}
        <Typography variant='caption' sx={{ marginLeft: '5px' }}>
          {msg.time}
        </Typography>
      </Typography>
      <Box
        sx={{
          border: theme => `solid 1px ${theme.primary.light}`,
          width: 'fit-content',
          marginLeft: 'auto',
          padding: '5px 15px',
          borderRadius: '5px 0 5px 5px',
          maxWidth: '80%',
          textAlign: 'start',
        }}
      >
        <Typography variant='body1'>{msg.text}</Typography>
      </Box>
    </Grid>
  )
}

export default UserChat
