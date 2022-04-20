import React from 'react'
import ChatList from './ChatList.js'

const ChatMode = () => {
  return (
    <div className="chatWrapper">
      <ChatList />
      <div className="chatArea"></div>
    </div>
  )
}

export default ChatMode
