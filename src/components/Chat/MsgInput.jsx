import { useApp } from '@/context/appContext'
import socket from '@/socket'
import styled from '@emotion/styled'
import SendIcon from '@mui/icons-material/Send'
import { Box, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'

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

const MsgInput = () => {
  const { dispatch, user } = useApp()
  const [inputMsg, setInputMsg] = useState('')

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
    <form
      className='input-area mt-auto'
      onSubmit={e => {
        e.preventDefault()
        btnSend()
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <TextFieldStyled
          fullWidth
          id='outlined-size-small'
          placeholder='輸入訊息'
          size='small'
          value={inputMsg}
          onChange={e => setInputMsg(e.target.value)}
        />
        <IconButton
          color='primary'
          aria-label='send message'
          onClick={btnSend}
          sx={{ width: 'fit-content', paddingRight: '0px' }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </form>
  )
}

export default MsgInput
