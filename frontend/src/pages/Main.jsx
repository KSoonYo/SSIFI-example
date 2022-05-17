import React, { useState, useCallback, useEffect, useRef } from 'react'
import ChatMode from './../components/ChatMode'
import VoiceMode from './../components/VoiceMode'
import { Box, IconButton } from '@mui/material'
import { faPhoneVolume, faComments } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { postRequest } from '../api/requests.js'
import { Typography } from '../../node_modules/@mui/material/index'
import { useNavigate } from '../../node_modules/react-router-dom/index'
import checkNotKey from '../functions/CheckNotKey'
import Modal from '@mui/material/Modal'
import '../style/Main.css'

const Main = () => {
  const [mode, setMode] = useState(true)
  const [chatList, setChatList] = useState([
    {
      id: 'ssifi',
      chat: '안녕하세요 여러분의 SSIFI 입니다. \n음성 모드에서 대화를 나누어보세요!\n우측 상단 버튼을 통해 채팅도 진행할 수 있습니다 !',
      info: true,
    },
  ])
  const [audioUrls, setAudioUrls] = useState([])
  const [chatContent, setChatContent] = useState('')
  const [ttsLoad, setTTSLoad] = useState(false)
  const navigate = useNavigate()
  const [toggable, setToggable] = useState(true)
  const [imageOpen, setImageOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [aiMode, setAiMode] = useState('wellness')

  const modeList = [
    { name: '소설', mode: 'novel' },
    { name: '심리상담', mode: 'wellness' },
    { name: '화가', mode: 'painter' },
    { name: '뷰티기사', mode: 'beauty' },
    { name: '경제기사', mode: 'economy' },
    { name: '연예기사', mode: 'entertainments' },
    { name: 'IT기사', mode: 'IT' },
    { name: '사회기사', mode: 'society' },
    { name: '작가', mode: 'writer' },
    { name: '코미디', mode: 'comedy' },
    { name: '드라마', mode: 'drama' },
    { name: '뉴스', mode: 'news' },
  ]

  // audioUrl 초기화
  // useCallback으로 부모 컴포넌트에서 함수 정의 후 자식으로 전달
  // https://stackoverflow.com/questions/62464488/how-to-use-a-prop-function-inside-of-useeffect
  const initAudioUrls = useCallback(() => {
    setAudioUrls([])
  }, [])

  const handleImageOpen = () => {
    setImageOpen(true)
  }
  const handleImageClose = () => {
    setImageOpen(false)
  }

  const handleAddChat = async function (data) {
    setTTSLoad(true)
    setChatList(prev => [
      ...prev,
      {
        id: 'me',
        chat: chatContent,
      },
    ])
    setChatContent('')

    setTimeout(async () => {
      setChatList(prev => [
        ...prev,
        {
          id: 'loading',
          chat: '',
        },
      ])
      try {
        const context = await postRequest('api/channel/tts/', {
          mode: aiMode,
          message: data,
          isSaved: sessionStorage.getItem('isSaved'),
          key: sessionStorage.getItem('key'),
        })
        setTTSLoad(false)

        if (aiMode === 'painter') {
          console.log(true)
          handleImageOpen()
          setImageUrl(context.data.message)
        }

        setChatList(prev => [
          ...prev.filter(elem => elem.id !== 'loading'),
          {
            id: 'ssifi',
            chat: context.data.message,
            info: false,
            url: context.data.url,
            mode: aiMode,
          },
        ])
        setAudioUrls(context.data.url)
      } catch (err) {
        if (err.response.status === 401) {
          alert('세션이 만료되었습니다.')
          sessionStorage.removeItem('key')
          navigate('/')
        }
      }
    }, 1000)
  }

  const handleToastBoxOpen = () => setToastOpen(true)
  const handleToastBoxClose = () => setToastOpen(false)

  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) {
      setTimeout(() => {
        handleToastBoxOpen()
        setTimeout(handleToastBoxClose, 3000)
      }, 850)
    }
  }, [aiMode])

  const ToastBox = () => {
    return (
      <div className={`toast-message-box ${toastOpen ? 'show' : ''}`}>
        <p className="toast-message-content">
          <span> {modeList.find(modeObj => modeObj.mode === aiMode).name}(이)가 선택되었습니다. </span>
        </p>
      </div>
    )
  }

  const ImageModal = () => {
    return (
      <Modal open={imageOpen} onClose={handleImageClose}>
        <Box sx={style}>
          <img src={imageUrl} alt="씨피가그린그림" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
      </Modal>
    )
  }

  const changeAiMode = aimode => {
    setAiMode(aimode)
  }

  return (
    <div style={{ height: '100%' }}>
      <ImageModal></ImageModal>
      <ToastBox></ToastBox>
      <Box
        sx={{
          margin: 'auto',
          display: 'flex',
          width: '80%',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '7%',
        }}
      >
        <Typography sx={{ margin: '0 10px', color: 'white', fontSize: '30px' }}>SSIFI</Typography>
        <Typography sx={{ margin: '0 10px', color: 'gray' }}>
          {aiMode.charAt(0).toUpperCase() + aiMode.slice(1)}
          {mode ? ' Voice' : ' Chat'}
        </Typography>
        <IconButton
          disabled={!toggable}
          variant="outlined"
          style={{ border: '1px solid white', borderRadius: '10px' }}
          onClick={() => setMode(!mode)}
        >
          {mode ? (
            <FontAwesomeIcon icon={faComments} style={{ fontSize: '1.3rem', color: 'white' }}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faPhoneVolume} style={{ fontSize: '1.3rem', color: 'white' }}></FontAwesomeIcon>
          )}
        </IconButton>
      </Box>
      {mode ? (
        <VoiceMode
          handleAddChat={handleAddChat}
          chatContent={chatContent}
          setChatContent={setChatContent}
          chatList={chatList}
          setChatList={setChatList}
          audioUrls={audioUrls}
          initAudioUrls={initAudioUrls}
          ttsLoad={ttsLoad}
          setToggable={setToggable}
          changeAiMode={changeAiMode}
          modeList={modeList}
        />
      ) : (
        <ChatMode
          chatList={chatList}
          chatContent={chatContent}
          setChatContent={setChatContent}
          handleAddChat={handleAddChat}
          changeAiMode={changeAiMode}
          modeList={modeList}
        />
      )}
    </div>
  )
}

export default Main

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
