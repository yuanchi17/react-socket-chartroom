import { Button, ButtonBase, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useApp } from '../../context/appContext'

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  maxWidth: '60px',
  maxHeight: '60px',
  minWidth: '60px',
  minHeight: '60px',
  borderRadius: '100%',
  '&:hover, &.is-selected': {
    border: `solid 3px ${theme.yellow.main}`,
  },
}))

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
  borderRadius: '100%',
})

const SelectImg = () => {
  const { dispatch, user, activeStep } = useApp()
  const imgs = ['yCC8VdH', 'Xee8Yda', 'ZelpWqC', 'ysk042a']
  const [errMsg, setErrMsg] = useState('')

  const handleNext = () => {
    if (!user.img && !user.name) {
      setErrMsg('請選擇一個頭像')
      return
    }
    dispatch({ type: 'setActiveStep', payload: activeStep + 1 })
  }

  return (
    <>
      <Grid item sx={{ mt: 3, mb: 3 }}>
        <Grid container justifyContent='center' spacing={{ xs: 1, md: 2 }} columns={4}>
          {imgs.map(img => (
            <Grid item key={img}>
              <ImageButton
                className={clsx(user.img === img && 'is-selected')}
                variant='elevated'
                onClick={() => {
                  setErrMsg('')
                  dispatch({ type: 'setUser', payload: { img } })
                }}
              >
                <ImageSrc style={{ backgroundImage: `url(https://i.imgur.com/${img}.png)` }} />
              </ImageButton>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant='subtitle2' gutterBottom color='red'>
          {errMsg}
        </Typography>
      </Grid>
      <Grid item>
        <Button variant='contained' onClick={handleNext}>
          下一步
        </Button>
      </Grid>
    </>
  )
}

export default SelectImg
