import { Grid, Link, Paper, Typography } from '@mui/material'
import 'animate.css'
import React from 'react'

const NotConnect = () => {
  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' sx={{ height: '100vh' }}>
      <Typography variant='h4' gutterBottom>
        即時聊天室
      </Typography>

      <Paper
        elevation={6}
        sx={{ padding: '40px' }}
        className='animate__animated animate__pulse animate__infinite animate__slow'
      >
        <Typography variant='body1'>
          目前 server 未連線， 請詳閱專案{' '}
          <Link href='https://github.com/yuanchi17/react-socket-chatroom?tab=readme-ov-file#demo'>README.md</Link>
          ，待服務啟動後再重整頁面
        </Typography>
      </Paper>
    </Grid>
  )
}

export default NotConnect
