import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const AlertChat = ({ msg }) => {
  return (
    <Grid
      item
      sx={{
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        height: '40px',
        margin: '10px',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: theme => theme.gray.light,
          minWidth: '50%',
          height: 'fit-content',
          padding: '5px 15px',
          borderRadius: '99px',
        }}
      >
        <Typography variant='body2'>{msg.text}</Typography>
      </Box>
    </Grid>
  )
}

export default AlertChat
