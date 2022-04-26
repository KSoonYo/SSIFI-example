import React, { useState } from 'react'
import ChatMode from './../components/ChatMode'
import VoiceMode from './../components/VoiceMode'
import { Box, IconButton } from '@mui/material'
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded'

const Main = () => {
  const [mode, setMode] = useState(true)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ margin: '0 0 0 auto' }}>
        <IconButton variant="outlined" onClick={() => setMode(!mode)}>
          <ToggleOffRoundedIcon sx={{ fontSize: '50px' }} />
        </IconButton>
      </Box>
      {mode ? <VoiceMode /> : <ChatMode />}
    </div>
  )
}

export default Main
