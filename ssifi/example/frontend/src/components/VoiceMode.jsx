import { Box, Typography, Modal, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import MicIcon from '@mui/icons-material/Mic'
import SendIcon from '@mui/icons-material/Send'
import SoundWave from './SoundWave'
import { postRequest } from '../api/requests'

import AudioReactRecorder, { RecordState } from './AudioRecorder'
import Moon from './Moon'

import ChatList from './ChatList'

const VoiceMode = ({ chatList, audioUrls }) => {
  const [open, setOpen] = useState(false)
  const [onRec, setOnRec] = useState(false)
  const [recordState, setRecordState] = useState('')

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleRec = () => {
    if (onRec === true) {
      stop()
    } else {
      start()
    }
    setOnRec(!onRec)
  }

  useEffect(() => {
    let audioIndex = 0
    let audio = new Audio()
    audio.src = audioUrls[0]
    audio.currentTime = 0
    audio.play()

    audio.addEventListener('ended', () => {
      if (audioIndex !== audioUrls.length && audioUrls.length !== 0) {
        audioIndex += 1
        audio.src = audioUrls[audioIndex]
        audio.play()
      }
    })
  }, [audioUrls])

  const start = () => {
    setRecordState(RecordState.START)
    console.log('녹음 시작!')
  }

  const stop = () => {
    setRecordState(RecordState.STOP)
    console.log('녹음 중지!')
  }

  const onStop = async audioData => {
    console.log('audioData', audioData)
    const audioFile = new File([audioData.blob], 'voice.wav', { lastModified: new Date().getTime(), type: 'audio/wav' })
    try {
      console.log(audioFile)
      // 음성 파일 formdata로 전송
      const formData = new FormData()
      formData.append('speech', audioFile)
      const response = await postRequest(`/api/channel/stt/`, formData)
      console.log(response.data) // 응답 텍스트 결과
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="voiceWrapper">
      <AudioReactRecorder state={recordState} onStop={onStop} />

      <Moon></Moon>
      <Box style={soundWave}>
        <SoundWave type={onRec ? 'wait' : 'listening'} />
      </Box>
      <Box sx={messageBox}>
        <Typography>대기 표시</Typography>
        <IconButton>
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
      <Button variant="contained" onClick={handleRec} sx={{ backgroundColor: 'red' }}>
        <MicIcon />
      </Button>
      <Button>결과 확인</Button>
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
          <ChatList chatList={chatList}></ChatList>
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
  width: '90vw',
  margin: '0 auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '50px',
  boxShadow: 24,
  p: 4,
}
