import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const UserChat = ({ msg, user }) => {
  return (
    <Grid item sx={{ display: 'flex', flexFlow: 'column', textAlign: 'end' }}>
      <Typography variant='caption' sx={{ marginLeft: '5px' }}>
        {msg?.time}
      </Typography>
      <Box
        sx={{
          border: theme => `solid 1px ${theme.blue.light}`,
          width: 'fit-content',
          marginLeft: 'auto',
          marginBottom: '5px',
          padding: '5px 15px',
          borderRadius: '5px 0 5px 5px',
          maxWidth: '80%',
          textAlign: 'start',
        }}
      >
        <Typography variant='body1'>{msg?.text}</Typography>
      </Box>
    </Grid>
  )
}

export default UserChat
