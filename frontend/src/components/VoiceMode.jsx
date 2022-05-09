import { Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from '@mui/material/IconButton'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import MicIcon from '@mui/icons-material/Mic'
import { SyncLoader } from '../../node_modules/react-spinners/index'
import { Slide } from '../../node_modules/@mui/material/index'

import '../style/VoiceMode.css'
import ChatList from './ChatList'
import Moon from './Moon'
import { postRequest } from '../api/requests'
import AudioReactRecorder, { RecordState } from './AudioRecorder'

const VoiceMode = ({ chatContent, handleAddChat, setChatContent, chatList, audioUrls }) => {
  const [open, setOpen] = useState(false)
  const [onRec, setOnRec] = useState(false)
  const [recordState, setRecordState] = useState('')
  const [sttLoad, setSTTLoad] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
    setSTTLoad(true)
    setRecordState(RecordState.START)
    console.log('녹음 시작!')
  }

  const onStop = async audioData => {
    console.log('audioData', audioData)
    const audioFile = new File([audioData.blob], 'voice.wav', { lastModified: new Date().getTime(), type: 'audio/wav' })
    try {
      console.log(audioFile)
      const formData = new FormData()
      formData.append('speech', audioFile)
      const response = await postRequest(`/api/channel/stt/`, formData)

      setChatContent(response.data.message)

      console.log(response.data)
      setSTTLoad(false)
      setRecordState(RecordState.NONE)
    } catch (err) {
      console.log(err)
      setSTTLoad(false)
      setOnRec(false)
    }
  }

  const chatBox = (
    <Box sx={styles.chatBox}>
      <IconButton sx={{ width: '100%' }} onClick={handleClose}>
        <ExpandMoreRoundedIcon style={{ color: 'white' }} />
      </IconButton>
      <ChatList chatList={chatList} />
    </Box>
  )

  return (
    <div className="voiceWrapper">
      <Moon />
      <AudioReactRecorder state={recordState} onStop={onStop} />
      {onRec ? (
        <Box sx={styles.sttResult}>
          <Typography sx={{ color: 'white' }}>
            {sttLoad ? (
              <SyncLoader
                color={'#ffffff'}
                loading={sttLoad}
                css={{ display: 'block', margin: '0 auto' }}
                size={10}
                margin={8}
              />
            ) : (
              chatContent
            )}
          </Typography>
          <IconButton
            onClick={() => {
              handleAddChat(chatContent)
              setOnRec(false)
            }}
            disabled={sttLoad}
          >
            <FontAwesomeIcon
              icon={faSatelliteDish}
              size="xl"
              style={sttLoad ? { color: 'gray' } : { color: 'white' }}
            />
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: 'transparent',
            borderRadius: '13px',
            border: '1px solid white',
          }}
        >
          <IconButton
            onClick={() => {
              start()
              setOnRec(!onRec)
            }}
          >
            <MicIcon sx={{ fontSize: '50px', color: 'white' }} />
          </IconButton>
        </Box>
      )}
      <Box sx={styles.chatOpenBtn}>
        <IconButton sx={{ position: 'fixed', bottom: '0', width: '320px' }} onClick={handleOpen}>
          <ExpandLessRoundedIcon style={{ display: open ? 'none' : undefined, color: 'white' }} />
        </IconButton>
      </Box>
      {chatList.includes(chatList.find(elem => elem.id === 'loading')) ? (
        <Box sx={styles.ttsLoader}>
          <div className="main_box">
            <div className="dot"></div>
            <div className="parent">
              <div className="child">
                <div className="subchild"></div>
              </div>
            </div>
          </div>
          <Typography sx={{ color: 'white' }}>음성을 우주로 보내고 있어요.</Typography>
        </Box>
      ) : (
        ''
      )}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        {chatBox}
      </Slide>
    </div>
  )
}

export default VoiceMode

// style
const styles = {
  soundWave: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
  },
  sttResult: {
    width: '80%',
    height: '10vh',
    backgroundColor: 'trasparent',
    borderRadius: '25px',
    border: '1px solid white',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '40px auto',
  },
  chatBox: {
    position: 'absolute',
    height: '50vh',
    bottom: '0',
    transform: 'translate(-50%, -50%)',
    width: '87%',
    margin: '0 auto',
    bgcolor: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid white',
    boxShadow: 24,
    overflowY: 'auto',
    p: 4,
  },
  chatOpenBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ttsLoader: {
    width: '100%',
    height: '108%',
    bgcolor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'translate(0, -8%)',
    flexDirection: 'column',
  },
}
