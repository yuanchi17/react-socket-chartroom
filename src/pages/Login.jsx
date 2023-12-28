import SelectImg from '@/components/Login/SelectImg'
import { useApp } from '@/context/appContext'
import socket from '@/socket'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, Paper, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup
  .object()
  .shape({
    name: yup.string().required('請輸入暱稱').max(10, '已超過 10 字'),
    intro: yup.string().optional().max(20, '已超過 20 字'),
  })
  .required()

const Login = () => {
  const { dispatch, activeStep } = useApp()
  const steps = ['請選擇頭像', '說說你是誰']

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      intro: '',
      name: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = data => {
    console.log(activeStep)
    console.log(data)
    // if (activeStep === 1) return
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
          <Grid container direction='column' justifyContent='center' alignItems='center'>
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
                  <Typography variant='subtitle2' color='red' sx={{ textAlign: 'end' }}>
                    {errors?.name?.message}
                  </Typography>
                </Grid>
                <Grid item>
                  <ControllerTextFiels control={control} name='intro' label='簡單介紹自己' />
                  <Typography variant='subtitle2' color='red' sx={{ textAlign: 'end' }}>
                    {errors?.intro?.message}
                  </Typography>
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
