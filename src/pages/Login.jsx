import { Button, Grid, Paper, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import SelectImg from '../components/Login/SelectImg'
import { useApp } from '../context/appContext'
import socket from '../socket'

const Login = () => {
  const { dispatch, activeStep } = useApp()

  const steps = ['請選擇頭像', '說說你是誰']
  const { control, handleSubmit } = useForm({
    defaultValues: {
      intro: '',
      name: '',
    },
  })

  const onSubmit = data => {
    if (activeStep !== 1 || !data.name) return
    dispatch({ type: 'setUser', payload: { ...data, id: socket.id } })
  }

  const handleBack = () => {
    dispatch({ type: 'setActiveStep', payload: activeStep - 1 })
  }

  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' sx={{ height: '100vh' }}>
      <Typography variant='h4' gutterBottom>
        即時聊天室
      </Typography>

      <Paper elevation={6} sx={{ padding: '40px' }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '60vw' }}>
          <Grid container direction='column' justifyContent='center' alignItems='center' spacing={2}>
            <Grid item sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%' }}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>

            {activeStep === 0 ? (
              <SelectImg />
            ) : (
              <>
                <Grid item>
                  <ControllerTextFiels control={control} name='name' label='請輸入暱稱' />
                </Grid>
                <Grid item>
                  <ControllerTextFiels control={control} name='intro' label='簡單介紹自己' />
                </Grid>
                <Grid item>
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
      </Paper>
    </Grid>
  )
}

const ControllerTextFiels = ({ control, name, label }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => <TextField fullWidth size='small' margin='normal' label={label} {...field} />}
  />
)

export default Login
