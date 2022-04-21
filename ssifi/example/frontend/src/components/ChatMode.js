import React, { useState } from 'react'
import ChatList from './ChatList.js'

const ChatMode = () => {
  const [chatList, setChatList] = useState([])
  const [chatContent, setChatContent] = useState('')

  const handleAddChat = function () {
    setChatList(prev => [
      ...prev,
      {
        id: 'me',
        chat: chatContent,
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
