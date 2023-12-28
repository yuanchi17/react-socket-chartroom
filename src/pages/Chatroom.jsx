import AlertChat from '@/components/Chat/Alert'
import OtherMemberChat from '@/components/Chat/OtherMember'
import UserChat from '@/components/Chat/User'
import MemberList from '@/components/Member/List'
import { useApp } from '@/context/appContext'
import socket from '@/socket'
import { Grid, Paper, Typography } from '@mui/material'
import _ from 'lodash'
import React, { useEffect } from 'react'
import MsgInput from '../components/Chat/MsgInput'

const Chatroom = () => {
  const { dispatch, user, msgs, otherUsers } = useApp()

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

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      sx={{ minHeight: '100vh', maxHeight: '100vh' }}
    >
      <Typography variant='h4' gutterBottom sx={{ display: { xs: 'none', sm: 'initial' } }}>
        即時聊天室
      </Typography>

      <Paper
        elevation={6}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ height: { xs: '90vh', sm: '80vh' }, width: '90vw' }}
      >
        <Grid container direction={{ xs: 'column', sm: 'row' }} wrap='nowrap' sx={{ height: '100%', minWidth: '100%' }}>
          <Grid
            item
            xs={3}
            sx={{
              overflowWrap: 'anywhere',
              height: '100%',
              borderRight: theme => `solid 1px ${theme.gray.main}`,
              borderBottom: theme => `solid 1px ${theme.gray.main}`,
              overflow: 'auto',
            }}
          >
            <MemberList />
          </Grid>
          <Grid item xs sx={{ height: '100%', overflow: 'auto' }}>
            <Grid container direction='column' sx={{ height: '100%', overflow: 'auto' }}>
              <Grid id='msg-list' item xs={10} sx={{ overflow: 'auto', padding: '15px' }}>
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
              <Grid item xs={2} sx={{ padding: 2 }}>
                <MsgInput />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Chatroom
