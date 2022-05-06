import React, { useRef, useEffect } from 'react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography } from '@mui/material'
import '../style/ChatList.css'

const ChatList = props => {
  const scrollRef = useRef()

  useEffect(() => {
    scrollToBottom()
  }, [props.chatList])

  const scrollToBottom = () => {
    const { scrollHeight, clientHeight } = scrollRef.current
    scrollRef.current.scrollTop = scrollHeight - clientHeight
  }

  return (
    <div
      className="chatList"
      ref={scrollRef}
      style={{ ...props.style, overflow: 'auto', display: 'flex', flexDirection: 'column' }}
    >
      {props.chatList.map((chatItem, index) => {
        return (
          <div
            key={index}
            style={
              chatItem.id === 'me'
                ? { display: 'flex', justifyContent: 'flex-start' }
                : { display: 'flex', justifyContent: 'flex-end' }
            }
          >
            <div
              key={index}
              className={chatItem.id === 'me' ? 'myChat' : chatItem.id === 'loading' ? 'loading' : 'ssifiChat'}
            >
              {chatItem.id === 'loading' ? (
                <FontAwesomeIcon className="spin-pulse" icon={faSpinner} style={{ color: 'white' }} />
              ) : (
                <Typography className="chatContent" style={{ color: 'white' }}>
                  {chatItem.chat}
                </Typography>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ChatList
