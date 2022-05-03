import { Box, Typography, Modal, Button } from '@mui/material'
import React, { useRef, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import MicIcon from '@mui/icons-material/Mic'
import SendIcon from '@mui/icons-material/Send'
import SoundWave from './SoundWave'
import { postRequest } from '../api/requests'
import { SyncLoader } from '../../node_modules/react-spinners/index'

import AudioReactRecorder, { RecordState } from './AudioRecorder'
import Moon from './Moon'

import ChatList from './ChatList'

const VoiceMode = ({ chatList }) => {
  const [open, setOpen] = useState(false)
  const [onRec, setOnRec] = useState(false)
  const [recordState, setRecordState] = useState('')
  const [text, setText] = useState('')
  const [load, setLoad] = useState(false)
  const buttonEl = useRef(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleRec = () => {
    onRec ? stop() : start()

    setOnRec(!onRec)
  }

  const start = () => {
    setLoad(true)
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
      setText(response.data.message)
      console.log(response.data) // 응답 텍스트 결과
      setLoad(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="voiceWrapper">
      <Moon></Moon>
      {/* TODO : SoundWave 파형 만들기  */}
      <AudioReactRecorder state={recordState} onStop={onStop} load={load} />
      <Box style={soundWave}>
        <SoundWave type={onRec ? 'listening' : 'wait'} />
      </Box>
      {onRec ? (
        <Box sx={messageBox}>
          <Typography sx={{ color: 'white' }}>
            {load ? (
              <SyncLoader
                color={'#ffffff'}
                loading={load}
                css={{ display: 'block', margin: '0 auto', borderColor: 'red' }}
                size={15}
                margin={8}
              />
            ) : (
              text
            )}
          </Typography>
          <IconButton onClick={() => console.log('TTS를 위한 텍스트 전송 기능 추가')} disabled={load} color="warning">
            <SendIcon sx={load ? { color: 'gray' } : { color: 'white' }} />
          </IconButton>
        </Box>
      ) : (
        <Button
          variant="contained"
          ref={buttonEl}
          onClick={handleRec}
          sx={{ backgroundColor: '#b35ce2', borderRadius: '13px' }}
        >
          <MicIcon sx={{ fontSize: '50px' }} />
        </Button>
      )}

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
          <ChatList chatList={chatList} />
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
  height: '10vh',
  backgroundColor: '#b35ce2',
  borderRadius: '25px',
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
