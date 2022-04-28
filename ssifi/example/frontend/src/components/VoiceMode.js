import { Box, Typography, Modal, Button } from '@mui/material'
import React, { useCallback, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import MicIcon from '@mui/icons-material/Mic'
import SendIcon from '@mui/icons-material/Send'
import SoundWave from './SoundWave'
import { postRequest } from '../api/requests'

const VoiceMode = () => {
  const [open, setOpen] = useState(false)
  const [stream, setStream] = useState()
  const [media, setMedia] = useState()
  const [onRec, setOnRec] = useState(true)
  const [source, setSource] = useState()
  const [analyser, setAnalyser] = useState()
  const [blobUrl, setBlobUrl] = useState([])
  const [audioFile, setAudioFile] = useState()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1)
    setAnalyser(analyser)

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream)
      setSource(source)
      source.connect(analyser)
      analyser.connect(audioCtx.destination)
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.start()
      setStream(stream)
      setMedia(mediaRecorder)
      makeSound(stream)

      analyser.onaudioprocess = function (e) {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop()
          })
          mediaRecorder.stop()
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect()
          audioCtx.createMediaStreamSource(stream).disconnect()

          mediaRecorder.ondataavailable = function (e) {
            setOnRec(true)
          }
        } else {
          setOnRec(false)
        }
      }
    })
  }

  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      // 중지되면 wav파일로 새로운 blob 생성
      const newBlob = new Blob([e.data], { type: 'audio/wav' })
      console.log(newBlob)
      setBlobUrl(newBlob)
      setOnRec(true)
    }

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop()
    })

    // 미디어 캡처 중지
    media.stop()
    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect()
    source.disconnect()
  }

  const onSubmitAudioFile = useCallback(() => {
    if (blobUrl) {
      console.log(URL.createObjectURL(blobUrl)) // 출력된 링크에서 녹음된 오디오 확인 가능
    }
    // File 생성자를 사용해 파일로 변환
    const sound = new File([blobUrl], 'voice.wav', { lastModified: new Date().getTime(), type: 'audio/wav' })
    console.log(sound) // File 정보 출력
    setAudioFile(sound)
  }, [blobUrl])

  const onSendAudio = async () => {
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
      <Box>
        <img src="assets/ssifi2.gif" alt="씨피" width="100%" style={{ objectFit: 'cover' }} />
      </Box>
      <Box style={soundWave}>
        <SoundWave type={onRec ? 'wait' : 'listening'} />
      </Box>
      <Box sx={messageBox}>
        <Typography>대기 표시</Typography>
        <IconButton onClick={onSendAudio}>
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
      <Button variant="contained" onClick={onRec ? onRecAudio : offRecAudio} sx={{ backgroundColor: 'red' }}>
        <MicIcon />
      </Button>
      <Button onClick={onSubmitAudioFile}>결과 확인</Button>
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
