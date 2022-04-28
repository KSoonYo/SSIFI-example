import React, { useState } from 'react'
import { postRequest } from '../api/requests.js'
import ChatList from './ChatList.jsx'

const ChatMode = () => {
  const [chatList, setChatList] = useState([])
  const [chatContent, setChatContent] = useState('')
  const [chatAnswer, setChatAnswer] = useState('')

  const handleAddChat = async function () {
    try {
      const context = await postRequest('', { mode: 'test', message: chatContent })
      setChatAnswer(context.data.message)
    } catch {
      console.log('error')
      return null
    }

    setChatList(prev => [
      ...prev,
      {
        id: 'me',
        chat: chatContent,
      },
      {
        id: 'ssifi',
        chat: chatAnswer,
      },
    ])
    setChatContent('')
  }

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      handleAddChat()
    }
  }

  return (
    <div className="chatWrapper">
      <ChatList style={{ height: '80vh', overflow: 'auto' }} chatList={chatList} />
      <div className="chatArea">
        <input type="text" value={chatContent} onKeyPress={onKeyPress} onChange={e => setChatContent(e.target.value)} />
        <button onClick={() => handleAddChat()}> 입력 </button>
      </div>
    </div>
  )
}

export default ChatMode
