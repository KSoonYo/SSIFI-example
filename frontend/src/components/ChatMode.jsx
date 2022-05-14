import React from 'react'
import ChatList from './ChatList'
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../style/ChatMode.css'
import ModeList from './ModeList'

const ChatMode = ({ chatList, handleAddChat, chatContent, setChatContent, changeAiMode }) => {
  const onKeyPress = e => {
    if (e.key === 'Enter' && chatContent !== '') {
      handleAddChat(chatContent)
    }
  }

  return (
    <div className="chatWrapper">
      <ChatList style={{ height: '80vh' }} chatList={chatList} />
      <ModeList changeAiMode={changeAiMode} />
      <div className="chatArea" style={{ width: '100%' }}>
        <input
          type="text"
          style={{ width: '90%', marginRight: '2%' }}
          className="chatArea-input"
          value={chatContent}
          onKeyPress={onKeyPress}
          onChange={e => setChatContent(e.target.value)}
        />
        <span
          className="chatArea-input-append"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (chatContent !== '') {
              handleAddChat(chatContent)
            }
          }}
        >
          <FontAwesomeIcon icon={faSatelliteDish} size="xl" style={{ color: 'white' }} />
        </span>
      </div>
    </div>
  )
}

export default ChatMode
