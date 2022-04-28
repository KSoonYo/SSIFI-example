import { Box, Typography, Modal } from '@mui/material'
import React, { useState } from 'react'
import '../style/SoundWave.css'
import IconButton from '@mui/material/IconButton'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import SendIcon from '@mui/icons-material/Send'

const VoiceMode = () => {
  const [record, setRecord] = useState(false)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div className="voiceWrapper">
      <Box>
        <img src="assets/ssifi2.gif" alt="씨피" width="100%" style={{ objectFit: 'cover' }} />
      </Box>
      <Box style={soundWave}>{!record ? onWave('stroke2') : onWave('stroke')}</Box>
      <Box sx={messageBox}>
        <Typography>입력중</Typography>
        <IconButton onClick={() => setRecord(!record)}>
          <SendIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton sx={{ position: 'fixed', bottom: '0', width: '320px' }} onClick={handleOpen}>
          <ExpandLessRoundedIcon />
        </IconButton>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <IconButton sx={{ width: '100%' }} onClick={handleClose}>
            <ExpandMoreRoundedIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            채팅 리스트
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            채팅표시
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default VoiceMode

function onWave(type) {
  return (
    <div className="loader">
      <span className={type} />
      <span className={type} />
      <span className={type} />
      <span className={type} />
      <span className={type} />
      <span className={type} />
      <span className={type} />
    </div>
  )
}

// style
const soundWave = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100px',
}

const messageBox = {
  width: '90%',
  height: '108px',
  border: '2px solid purple',
  borderRadius: '30px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  margin: '40px auto',
}

const modalStyle = {
  position: 'absolute',
  top: '70%',
  left: '50%',
  height: '80vh',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '50px',
  boxShadow: 24,
  p: 4,
}
