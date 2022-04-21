import React, { useRef, useEffect } from 'react'

const ChatList = props => {
  const scrollRef = useRef()

  useEffect(() => {
    scrollToBottom()
  }, [props.chatList])

  const scrollToBottom = () => {
    const { scrollHeight, clientHeight } = scrollRef.current
    // scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    scrollRef.current.scrollTop = scrollHeight - clientHeight
  }

  return (
    <div className="chatList" ref={scrollRef} style={props.style}>
      {props.chatList.map((chatItem, index) => {
        return (
          <div key={index} className="chatItem">
            <h2> {chatItem.id} </h2>
            <p className="chatContent">{chatItem.chat}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ChatList
