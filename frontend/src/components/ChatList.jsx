import React, { useRef, useEffect } from 'react'
import { faSpinner, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
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
      audioRef.current.removeEventListener('ended', () => {
        console.log('audio play unmounted')
      })
    }
  }

  const handleAudioPlay = index => {
    props.chatList.forEach((elem, idx) => {
      if (idx === index) {
        let audioIndex = 0
        audioRef.current.src = elem.url[0]
        audioRef.current.currentTime = 0
        audioRef.current.play()

        audioRef.current.addEventListener('ended', () => {
          if (audioIndex < elem.url.length - 1) {
            audioIndex += 1
            audioRef.current.src = elem.url[audioIndex]
            audioRef.current.play()
          }
        })
      }
    })
  }

  const AudioBox = ({ index }) => {
    return (
      <div>
        <FontAwesomeIcon
          className="play"
          onClick={() => {
            handleAudioPlay(index)
          }}
          icon={faPlay}
          style={{ color: 'black', marginRight: '10px' }}
        />
        <FontAwesomeIcon
          className="pause"
          onClick={() => {
            initAudioPlay()
          }}
          icon={faPause}
          style={{ color: 'black' }}
        />
      </div>
    )
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
                ? { display: 'flex', justifyContent: 'flex-end' }
                : { display: 'flex', justifyContent: 'flex-start' }
            }
          >
            <div
              className="message-box"
              style={chatItem.id === 'ssifiChat' ? { display: 'flex', flexDirection: 'column' } : {}}
            >
              <div className={chatItem.id === 'me' ? 'myChat' : chatItem.id === 'loading' ? 'loading' : 'ssifiChat'}>
                {chatItem.id === 'loading' ? (
                  <FontAwesomeIcon className="spin-pulse" icon={faSpinner} style={{ color: 'white' }} />
                ) : (
                  <Typography className="chatContent" style={{ color: 'white' }}>
                    {chatItem.chat}
                  </Typography>
                )}
              </div>
              <audio ref={audioRef} style={{ display: 'none' }}></audio>
              {chatItem.id === 'ssifi' && !chatItem.info ? <AudioBox index={index}></AudioBox> : <></>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ChatList
