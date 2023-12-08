import styled from '@emotion/styled'
import SendIcon from '@mui/icons-material/Send'
import { Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import AlertChat from '../components/Chat/Alert'
import OtherMemberChat from '../components/Chat/OtherMember'
import UserChat from '../components/Chat/User'
import MemberList from '../components/Member/List'
import { useApp } from '../context/appContext'
import socket from '../socket'

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  boxShadow: 'none',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.blue.main,
    },
    '&:hover fieldset': {
      borderColor: theme.blue.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.blue.main,
    },
  },
}))

const Chatroom = () => {
  const { dispatch, user, msgs, otherUsers } = useApp()
  const [inputMsg, setInputMsg] = useState('')

  useEffect(() => {
    // 只會在元件第一次渲染時觸發
    socket.emit('user-login', user)

    socket.on('new-user-join', newUser => {
      dispatch({ type: 'addOtherUser', payload: newUser })
      dispatch({ type: 'sendMsgAlert', payload: `歡迎 ${newUser.name} 加入聊天室` })

      socket.emit('add-old-user', { oldUser: user, newUserId: newUser.id }) // 將目前聊天室內的成員傳給新成員
    })

    socket.on('add-old-user', oldUser => {
      dispatch({ type: 'addOtherUser', payload: oldUser })
    })

    socket.on('del-user', user => {
      if (!user.name) return
      dispatch({ type: 'otherUserLogout', payload: user.id })
      dispatch({ type: 'sendMsgAlert', payload: `${user.name} 已離開聊天室` })
    })

    socket.on('send-message', ({ msg, user }) => {
      dispatch({ type: 'sendMsg', payload: { msg, user, type: 'other' } })
    })
  }, [])

  useEffect(() => {
    // 有訊息新增時滾輪自動到最底部
    const d = document.getElementById('msg-list')
    d.scrollTop = d.scrollHeight
  }, [msgs])

  const btnSend = () => {
    if (!inputMsg) return
    const obj = {
      msg: inputMsg,
      user: user,
    }
    socket.emit('send-message', obj)
    dispatch({ type: 'sendMsg', payload: { ...obj, type: 'user' } })

    setInputMsg('')
  }

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      sx={{ minHeight: '100vh', maxHeight: '100vh' }}
    >
      <Typography variant='h4' gutterBottom>
        Test-Chat-Room
        {/* 即時聊天室 */}
      </Typography>

      <Paper elevation={6} direction={{ xs: 'column', sm: 'row' }} sx={{ height: '80vh', width: '90vw' }}>
        <Grid container sx={{ height: '100%', minWidth: '100%' }}>
          <Grid
            item
            xs={12}
            sm={3}
            sx={{ overflowWrap: 'anywhere', height: '100%', borderRight: theme => `solid 1px ${theme.gray.main}` }}
          >
            <MemberList />
          </Grid>
          <Grid item xs={12} sm={9} sx={{ height: '100%' }}>
            <Grid container direction='column' sx={{ height: '100%' }}>
              <Grid id='msg-list' item md={10} sx={{ overflow: 'auto', padding: '15px' }}>
                <Grid container direction='column' sx={{ overflowWrap: 'anywhere' }}>
                  {msgs.map((msg, index) => {
                    switch (msg.type) {
                      case 'user':
                        return <UserChat msg={msg} user={user} key={index} />
                      case 'other': {
                        const member = _.find(otherUsers, ['id', msg.userId])
                        return <OtherMemberChat msg={msg} member={member} key={index} />
                      }
                      default:
                        return <AlertChat msg={msg} key={index} />
                    }
                  })}
                </Grid>
              </Grid>
              <Grid item md={2} sx={{ padding: 2 }}>
                <form
                  className='input-area mt-auto'
                  onSubmit={e => {
                    e.preventDefault()
                    btnSend()
                  }}
                >
                  <Grid container spacing={2} justifyContent='center' alignItems='center'>
                    <Grid item md={11}>
                      <TextFieldStyled
                        fullWidth
                        id='outlined-size-small'
                        placeholder='輸入訊息'
                        size='small'
                        value={inputMsg}
                        onChange={e => setInputMsg(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={1}>
                      <IconButton color='blue' aria-label='send message'>
                        <SendIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Chatroom
