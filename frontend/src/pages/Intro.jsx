import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Moon from './../components/Moon.jsx'
import InfoDialog from './../components/InfoDialog'

import '../style/Intro.css'

const Intro = () => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [touched, setTouched] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (touched) {
      const audio = new Audio('assets/intro.wav')
      audio.play()
    }
  }, [touched])

  const WaitingPhrase = () => {
    return (
      <div>
        <p className="intro-script-wait">
          <span> 아무 곳이나 클릭 해보세요.</span>
        </p>
      </div>
    )
  }

  const IntroPhrase = () => {
    return (
      <h1 style={{ color: 'white', padding: '0 20px' }}>
        <p className="intro-script">
          <span>안녕하세요</span>
        </p>
        <p className="intro-script">
          <span>저는 SSIFI 입니다.</span>
        </p>
      </h1>
    )
  }

  const IntroButtonWrapper = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Button
          className="intro-button"
          color="secondary"
          sx={{
            border: '1px solid white',
            fontSize: '1.5rem',
            borderRadius: '10px',
            color: 'white',
            fontFamily: 'SpoqaHanSansNeo Regular',
          }}
          onClick={() => {
            setOpen(true)
          }}
        >
          대화하기
        </Button>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%',
      }}
      onClick={() => {
        setTouched(true)
      }}
    >
      <Moon />
      {touched ? <IntroPhrase /> : <WaitingPhrase />}
      {touched && <IntroButtonWrapper />}
      <InfoDialog open={open} handleClose={handleClose} navigate={navigate}></InfoDialog>
    </div>
  )
}

export default Intro
