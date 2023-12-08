import styled from '@emotion/styled'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const ImageSrc = styled('span')({
  width: '40px',
  height: '40px',
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
  borderRadius: '100%',
})

const OtherMemberChat = ({ msg, member }) => {
  return (
    <Grid item sx={{ display: 'flex' }}>
      <ImageSrc style={{ backgroundImage: `url(https://i.imgur.com/${member.img}.png)` }} />
      <Box sx={{ display: 'flex', flexFlow: 'column', maxWidth: '80%', marginLeft: '10px' }}>
        <Typography variant='body2' gutterBottom>
          {member.name}
          <Typography variant='caption' sx={{ marginLeft: '5px' }}>
            {msg.time}
          </Typography>
        </Typography>
        <Box
          sx={{
            border: theme => `solid 1.8px ${theme.green.main}`,
            width: 'fit-content',
            padding: '5px 15px',
            borderRadius: '0 5px 5px 5px',
          }}
        >
          <Typography variant='body1'>{msg.text}</Typography>
        </Box>
      </Box>
    </Grid>
  )
}

export default OtherMemberChat
