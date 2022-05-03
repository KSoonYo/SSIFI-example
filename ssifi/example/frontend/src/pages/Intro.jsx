import React from 'react'
import { useNavigate } from 'react-router-dom'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from '@mui/material/IconButton'
import Moon from './../components/Moon.jsx'
import '../style/Intro.css'

const Intro = () => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '100%',
      }}
    >
      <Moon></Moon>
      <h1 style={{ color: 'white', padding: '0 20px' }}>
        <p>안녕하세요</p>
        <p>저는 SSIFI입니다.</p>
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <IconButton
          className="intro-button"
          color="secondary"
          sx={{
            bgcolor: 'white',
            width: '80px',
            height: '80px',
          }}
          onClick={() => {
            navigate('/main')
          }}
        >
          <FontAwesomeIcon icon={faAngleRight} size="2x" style={{ color: 'white' }} />
        </IconButton>
      </div>
    </div>
  )
}

export default Intro
