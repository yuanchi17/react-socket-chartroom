import { Box, Button, Grid, Step, StepLabel, Stepper, TextField } from '@mui/material'
import { clsx } from 'clsx'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useApp } from '../context/appContext'
import socket from '../socket'

const userData = {
  img: '',
  intro: '',
  name: '',
}

const Login = () => {
  const { dispatch } = useApp()

  const steps = ['請選擇一個頭像', '說說你是誰']
  const imgs = ['yCC8VdH', 'Xee8Yda', 'ZelpWqC', 'ysk042a']
  const [activeStep, setActiveStep] = useState(0)
  const [user, setUser] = useState(userData)

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: userData,
  })

  const onSubmit = data => {
    setUser(data)
    if (activeStep !== 1) return
    if (!data.name) return
    dispatch({ type: 'userLogin', payload: { ...data, id: socket.id } })
  }

  const handleNext = () => {
    if (!user.img && !user.name) return
    setActiveStep(activeStep => activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep => activeStep - 1)
  }

  return (
    <div>
      <h2 className='mb-3'>即時聊天室</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction='column' justifyContent='center' alignItems='center'>
          <Box sx={{ width: '60%', mb: 3 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {activeStep === 0 ? (
            <>
              <Grid>
                {imgs.map(img => (
                  <button
                    className={clsx('btn btn-img m-2 p-0', user.img === img && 'select-img')}
                    key={img}
                    onClick={() => {
                      setValue('img', img)
                    }}
                  >
                    <img className='w-100 rounded' src={`https://i.imgur.com/${img}.png`} />
                  </button>
                ))}
              </Grid>
              <Button variant='contained' onClick={handleNext} sx={{ mt: 3 }}>
                下一步
              </Button>
            </>
          ) : (
            <>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ width: '60%' }}
                    id='input-name'
                    size='small'
                    margin='normal'
                    label='請輸入暱稱'
                    {...field}
                  />
                )}
              />

              <Controller
                name='intro'
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ width: '60%' }}
                    id='input-intro'
                    size='small'
                    margin='normal'
                    label='簡單介紹自己'
                    {...field}
                  />
                )}
              />
              <Grid>
                <Button variant='contained' onClick={handleBack} sx={{ mt: 3, mr: 1 }}>
                  上一步
                </Button>
                <Button variant='contained' type='submit' sx={{ mt: 3 }}>
                  進入聊天室
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </div>
  )
}

export default Login
