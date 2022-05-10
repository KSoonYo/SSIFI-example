import React, { useRef, useEffect } from 'react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography } from '@mui/material'
import '../style/ChatList.css'

const ChatList = props => {
  const scrollRef = useRef()
  const audioRef = useRef()

  useEffect(() => {
    scrollToBottom()
  }, [props.chatList])

  const scrollToBottom = () => {
    const { scrollHeight, clientHeight } = scrollRef.current
    scrollRef.current.scrollTop = scrollHeight - clientHeight
  }

  const initAudioPlay = () => {
    if (audioRef.current && audioRef.current.currentTime > 0) {
      audioRef.current.pause()
    }
  }

  const handleAudioPlay = index => {
    props.chatList.forEach((elem, idx) => {
      if (idx === index) {
        audioRef.current = new Audio(elem.url)
        audioRef.current.play()
      }
    })
  }

  return (
    <div
      className="chatList"
      ref={scrollRef}
      style={{ ...props.style, overflow: 'auto', display: 'flex', flexDirection: 'column' }}
      onClick={() => {
        initAudioPlay()
      }}
    >
      {props.chatList.map((chatItem, index) => {
        return (
          <div
            key={index}
            style={
              chatItem.id === 'me'
                ? { display: 'flex', justifyContent: 'flex-end' }
                : { display: 'flex', justifyContent: 'flex-start' }
            }
          >
            <div className={chatItem.id === 'me' ? 'myChat' : chatItem.id === 'loading' ? 'loading' : 'ssifiChat'}>
              <audio ref={audioRef} style={{ display: 'none' }}></audio>
              {chatItem.id === 'loading' ? (
                <FontAwesomeIcon className="spin-pulse" icon={faSpinner} style={{ color: 'white' }} />
              ) : (
                <Typography
                  onClick={() => {
                    handleAudioPlay(index)
                  }}
                  className="chatContent"
                  style={{ color: 'white' }}
                >
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
