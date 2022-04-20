import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import '../style/SoundWave.css'

const VoiceMode = () => {
  const [record, setRecord] = useState(false)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Box
        sx={{
          border: '1px solid green',
          margin: '0 auto',
          textAlign: 'center',
          height: '300px',
          mb: '80px',
          width: '100%',
        }}
      >
        AI Image
      </Box>
      <Box style={soundWave}>
        {!record ? (
          <div className="loader">
            <span className="stroke2" />
            <span className="stroke2" />
            <span className="stroke2" />
            <span className="stroke2" />
            <span className="stroke2" />
            <span className="stroke2" />
            <span className="stroke2" />
          </div>
        ) : (
          <div className="loader">
            <span className="stroke" />
            <span className="stroke" />
            <span className="stroke" />
            <span className="stroke" />
            <span className="stroke" />
            <span className="stroke" />
            <span className="stroke" />
          </div>
        )}
      </Box>
      <Box sx={messageBox}>
        <Typography>입력중</Typography>
        <Button onClick={() => setRecord(!record)}>녹음</Button>
      </Box>
      <Button>채팅 슬라이더 버튼</Button>
    </div>
  )
}

export default VoiceMode

// style
const soundWave = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100px',
}

const messageBox = {
  width: '329px',
  height: '108px',
  border: '1px solid red',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  mt: '40px',
}
