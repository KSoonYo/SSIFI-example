import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Moon from './../components/Moon.jsx'
import InfoDialog from './../components/InfoDialog'

import '../style/Intro.css'

const Intro = () => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
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
    >
      <Moon></Moon>
      <h1 style={{ color: 'white', padding: '0 20px' }}>
        <p className="intro-script">
          <span>안녕하세요</span>
        </p>
        <p className="intro-script">
          <span>저는 SSIFI 입니다.</span>
        </p>
      </h1>
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
      <InfoDialog open={open} handleClose={handleClose} navigate={navigate}></InfoDialog>
    </div>
  )
}

export default Intro
