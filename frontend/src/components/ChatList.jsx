import React, { useRef, useEffect } from 'react'
import { faSpinner, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography } from '@mui/material'
import '../style/ChatList.css'

const ChatList = props => {
  const scrollRef = useRef()
  const audioRef = useRef()

  const modeList = [
    { name: '소설', mode: 'novel' },
    { name: '심리상담', mode: 'wellness' },
    { name: '화가', mode: 'painter' },
    { name: '뷰티기사', mode: 'beauty' },
    { name: '경제기사', mode: 'economy' },
    { name: '연예기사', mode: 'entertainments' },
    { name: 'IT기사', mode: 'IT' },
    { name: '사회기사', mode: 'society' },
    { name: '작가', mode: 'writer' },
    { name: '코미디', mode: 'comedy' },
    { name: '드라마', mode: 'drama' },
    { name: '뉴스', mode: 'news' },
  ]

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
      if (idx === index && elem.url.length > 0) {
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
      <div style={{ paddingLeft: '10px' }}>
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

  const ContentBox = ({ chatItem }) => {
    if (chatItem.id === 'loading') {
      return <FontAwesomeIcon className="spin-pulse" icon={faSpinner} style={{ color: 'white' }} />
    } else if (chatItem.mode === 'painter') {
      return (
        <div className="chat-image-content">
          <img src={chatItem.chat} alt="씨피가그린그림" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )
    }
    return (
      <Typography className="chat-content" style={{ color: 'white', fontFamily: 'SpoqaHanSansNeo Regular' }}>
        {chatItem.chat}
      </Typography>
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
            <div className="message-box">
              <div style={{ color: 'white', fontFamily: 'SpoqaHanSansNeo Regular', paddingLeft: '6px' }}>
                {modeList.find(modeObject => modeObject.mode === chatItem.mode)
                  ? modeList.find(modeObject => modeObject.mode === chatItem.mode).name
                  : ''}
              </div>
              <div className={chatItem.id === 'me' ? 'myChat' : chatItem.id === 'loading' ? 'loading' : 'ssifiChat'}>
                <ContentBox chatItem={chatItem} />
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
