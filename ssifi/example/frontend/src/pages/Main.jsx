import React, { useState } from 'react'
import ChatMode from './../components/ChatMode'
import VoiceMode from './../components/VoiceMode'
import { Box, IconButton } from '@mui/material'
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import { postRequest } from '../api/requests.js'

const Main = () => {
  const [mode, setMode] = useState(true)
  const [chatList, setChatList] = useState([])
  const [chatContent, setChatContent] = useState('')

  const handleAddChat = async function (data) {
    console.log(data)
    setChatList(prev => [
      ...prev,
      {
        id: 'me',
        chat: chatContent,
      },
    ])
    try {
      const context = await postRequest('api/channel/tts/', { mode: 'test', message: data })
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
      handleAddChat(chatContent)
    }
  }
  return (
    <div style={{ height: '100%' }}>
      <Box sx={{ margin: '0 0 0 auto', display: 'flex', justifyContent: 'end' }}>
        <IconButton variant="outlined" onClick={() => setMode(!mode)}>
          {mode ? (
            <ToggleOffRoundedIcon sx={{ fontSize: '50px', color: 'white' }} />
          ) : (
            <ToggleOnIcon sx={{ fontSize: '50px', color: 'white' }} />
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
        />
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
