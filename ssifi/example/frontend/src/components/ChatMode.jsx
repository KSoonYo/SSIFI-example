import React from 'react'
import ChatList from './ChatList.jsx'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ChatMode = ({ chatList, chatContent, onKeyPress, setChatContent }) => {
  return (
    <div className="chatWrapper">
      <ChatList style={{ height: '80vh' }} chatList={chatList} />
      <div className="chatArea" style={{ width: '100%', marginTop: '30px' }}>
        <input
          type="text"
          style={{ width: '90%', marginRight: '2%' }}
          value={chatContent}
          onKeyPress={onKeyPress}
          onChange={e => setChatContent(e.target.value)}
        />
        <div className="chatArea-input-append">
          <span>
            <FontAwesomeIcon icon={faPaperPlane} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default ChatMode
