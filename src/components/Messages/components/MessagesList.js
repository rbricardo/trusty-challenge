import React, { useRef, useEffect, memo } from 'react'
import TypingMessage from './TypingMessage'
import Message from './Message'

const MessagesList = ({ messages, isTyping }) => {
  const messagesContainerRef = useRef()
  useEffect(() => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight
  }, [messages])
  return (
    <div
      ref={messagesContainerRef}
      className="messages__list"
      id="message-list"
    >
      {messages.map((msg) => {
        return <Message key={msg.id} message={msg} botTyping={isTyping} />
      })}
      {isTyping && <TypingMessage />}
    </div>
  )
}

export default memo(MessagesList)
