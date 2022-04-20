import React from 'react'
import IconButton from '@mui/material/IconButton'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import { useNavigate } from 'react-router-dom'

const Intro = () => {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <div style={{ height: '40vh' }}>
          <img src="assets/ssifi.png" alt="씨피" width="100%" height="100%" style={{ objectFit: 'cover' }} />
        </div>
        <h1>
          <p>안녕하세요</p>
          <p>저는 SSIFI입니다.</p>
        </h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <IconButton
          onClick={() => {
            navigate('/main')
          }}
          sx={{ mx: 'auto', boxShadow: 10, fontSize: 50, borderRadius: 10 }}
        >
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Intro
