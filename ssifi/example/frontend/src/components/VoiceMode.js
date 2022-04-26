import { Box, Typography, Modal, Button } from '@mui/material'
import React, { useState } from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'

import IconButton from '@mui/material/IconButton'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import SendIcon from '@mui/icons-material/Send'
import SoundWave from './SoundWave'

const VoiceMode = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true })

  const [record, setRecord] = useState(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const fileSetting = () => {
    const sound = new File([mediaBlobUrl], 'soundBlob', {
      lastModified: new Date().getTime(),
      type: 'audio/wav',
    })
    console.log(sound)

    const formData = new FormData()
    formData.append('audioFile', sound)
    console.log(formData)
    // postRequest()
  }

  return (
    <div>
      <Box>
        <img src="assets/ssifi.png" alt="씨피" width="100%" style={{ objectFit: 'cover' }} />
      </Box>
      <Box style={soundWave}>
        <SoundWave type={!record ? 'wait' : 'listening'} />
      </Box>
      <Box sx={messageBox}>
        <Typography>{status === 'idle' ? '대기중' : '녹음중'}</Typography>
        <IconButton onClick={() => setRecord(!record)}>
          <SendIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' }}>
        <IconButton sx={{ position: 'fixed', bottom: '0', width: '100%' }} onClick={handleOpen}>
          <ExpandLessRoundedIcon />
        </IconButton>
      </Box>
      <Button onClick={startRecording}>녹음하기</Button>
      <Button onClick={stopRecording}>중지하기</Button>
      <Button onClick={fileSetting}>보내기</Button>
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
        </Box>
      </Modal>
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
  border: '2px solid purple',
  borderRadius: '30px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  margin: '40px auto',
}

const modalStyle = {
  position: 'absolute',
  top: '73vh',
  left: '50vw',
  height: '50vh',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  margin: '0 auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '50px',
  boxShadow: 24,
  p: 4,
}
