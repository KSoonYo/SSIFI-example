import { Box, Typography, Modal } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import IconButton from '@mui/material/IconButton'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import MicIcon from '@mui/icons-material/Mic'
import SoundWave from './SoundWave'
import { postRequest } from '../api/requests'
import { SyncLoader } from '../../node_modules/react-spinners/index'

import AudioReactRecorder, { RecordState } from './AudioRecorder'
import Moon from './Moon'

import ChatList from './ChatList'

const VoiceMode = ({ chatContent, handleAddChat, setChatContent, chatList, audioUrls }) => {
  const [open, setOpen] = useState(false)
  const [onRec, setOnRec] = useState(false)
  const [recordState, setRecordState] = useState('')
  const [load, setLoad] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleRec = () => {
    onRec ? stop() : start()

    setOnRec(!onRec)
  }

  useEffect(() => {
    try {
      if (audioUrls.length !== 0) {
        let audioIndex = 0
        let audio = new Audio()
        audio.src = audioUrls[0]
        audio.currentTime = 0
        audio.play()

        audio.addEventListener('ended', () => {
          if (audioIndex < audioUrls.length - 1) {
            audioIndex += 1
            audio.src = audioUrls[audioIndex]
            audio.play()
          }
        })
        return audio.removeEventListener('ended', () => {
          console.log('이벤트 제거')
        })
      }
    } catch {
      console.log('error')
    }
  }, [audioUrls])

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

      setChatContent(response.data.message)

      console.log(response.data) // 응답 텍스트 결과

      setLoad(false)
    } catch (err) {
      console.log(err)
    }
  }

  /**
  Todo 
  STT 결과 텍스트 전송 기능  
  ChatList에 STT 결과 추가
  ChatList에 TTS 결과 추가    
  
  */

  return (
    <div className="voiceWrapper">
      <Moon />
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
              chatContent
            )}
          </Typography>
          <IconButton
            onClick={() => {
              handleAddChat(chatContent)
            }}
            disabled={load}
            color="warning"
          >
            <FontAwesomeIcon icon={faSatelliteDish} size="xl" style={load ? { color: 'gray' } : { color: 'white' }} />
          </IconButton>
        </Box>
      ) : (
        <IconButton
          onClick={handleRec}
          sx={{ backgroundColor: 'transparent', borderRadius: '13px', border: '1px solid white' }}
        >
          <MicIcon sx={{ fontSize: '50px', color: 'white' }} />
        </IconButton>
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton sx={{ position: 'fixed', bottom: '0', width: '320px' }} onClick={handleOpen}>
          <ExpandLessRoundedIcon style={{ color: 'white' }} />
        </IconButton>
      </Box>

      <Modal open={open} onClose={handleClose}>
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
  width: '80%',
  height: '10vh',
  backgroundColor: 'trasparent',
  borderRadius: '25px',
  border: '1px solid white',
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
