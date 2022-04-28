import React, { useState } from 'react'
import { postRequest } from '../api/requests.js'
import ChatList from './ChatList.js'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ChatMode = () => {
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
    <div className="chatWrapper">
      <ChatList style={{ height: '80vh' }} chatList={chatList} />
      <div className="chatArea" style={{ width: '100%', marginTop: '50px' }}>
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
