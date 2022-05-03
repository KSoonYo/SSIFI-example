import React, { useState } from 'react'
import ChatMode from './../components/ChatMode'
import VoiceMode from './../components/VoiceMode'
import { Box, IconButton } from '@mui/material'
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded'
import { postRequest } from '../api/requests.js'

const Main = () => {
  const [mode, setMode] = useState(true)
  const [chatList, setChatList] = useState([])
  const [chatContent, setChatContent] = useState('')

  const handleAddChat = async function () {
    setChatList(prev => [
      ...prev,
      {
        id: 'me',
        chat: chatContent,
      },
    ])

    try {
      const context = await postRequest('api/channel/tts/', { mode: 'test', message: chatContent })
      setChatList(prev => [
        ...prev,
        {
          id: 'ssifi',
          chat: context.data.message,
        },
      ])
      setChatContent('')
    } catch {
      console.log('error')
      return null
    }
  }

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      handleAddChat()
    }
  }
  return (
    <div style={{ height: '100%' }}>
      <Box sx={{ margin: '0 0 0 auto', display: 'flex', justifyContent: 'end' }}>
        <IconButton variant="outlined" onClick={() => setMode(!mode)}>
          <ToggleOffRoundedIcon sx={{ fontSize: '50px' }} />
        </IconButton>
      </Box>
      {mode ? (
        <VoiceMode chatList={chatList} />
      ) : (
        <ChatMode
          chatList={chatList}
          chatContent={chatContent}
          onKeyPress={onKeyPress}
          setChatContent={setChatContent}
        />
      )}
    </div>
  )
}

export default Main
