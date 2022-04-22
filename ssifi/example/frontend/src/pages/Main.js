import React, { useState } from 'react'
import ChatMode from './../components/ChatMode'
import VoiceMode from './../components/VoiceMode'
import { Box, Button } from '@mui/material'

const Main = () => {
  const [mode, setMode] = useState(true)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ margin: '0 0 0 auto' }}>
        <Button variant="outlined" onClick={() => setMode(!mode)}>
          버튼
        </Button>
      </Box>
      {mode ? <VoiceMode /> : <ChatMode />}
    </div>
  )
}

export default Main
