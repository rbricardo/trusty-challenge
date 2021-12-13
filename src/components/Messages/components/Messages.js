import React, { useContext, useEffect, useReducer } from 'react'
import io from 'socket.io-client'
import useSound from 'use-sound'
import config from '../../../config'
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages'
import Header from './Header'
import InitialBotMessage from '../../../common/constants/initialBottyMessage'
import MessagesList from './MessagesList'
import Composer from './Composer'
import '../styles/_messages.scss'

const socket = io(config.BOT_SERVER_ENDPOINT, {
  transports: ['websocket', 'polling', 'flashsocket']
})

const messagesReducer = (state, event) => {
  switch (event.type) {
    case 'STARTED_TYPING':
      return { ...state, isTyping: true }
    case 'MESSAGE_RECEIVED':
      return {
        ...state,
        isTyping: false,
        messages: state.messages.concat(event.message)
      }
    case 'MESSAGE_SENT':
      return {
        ...state,
        messages: state.messages.concat(event.message)
      }
    case 'SWITCHED_USER':
      return {
        ...state,
        messages: [event.message]
      }
    default:
      return state
  }
}

function Messages({ user = 'bot' }) {
  const [playSend] = useSound(config.SEND_AUDIO_URL)
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL)
  const { setLatestMessage } = useContext(LatestMessagesContext)

  const [{ messages, isTyping }, dispatch] = useReducer(messagesReducer, {
    isTyping: false,
    messages: []
  })

  useEffect(() => {
    dispatch({
      type: 'SWITCHED_USER',
      message: {
        user,
        id: 0,
        message: InitialBotMessage
      }
    })
    const onTyping = () => {
      dispatch({ type: 'STARTED_TYPING' })
    }
    const onMessage = (message) => {
      dispatch({
        type: 'MESSAGE_RECEIVED',
        message: { id: `${user}-${Date.now()}`, message, user }
      })
    }

    socket.on('bot-typing', onTyping)
    socket.on('bot-message', onMessage)

    return () => {
      socket.off('bot-typing', onTyping)
      socket.off('bot-message', onMessage)
    }
  }, [user])

  const lastMessage = messages[messages.length - 1]
  useEffect(() => {
    if (!lastMessage) return
    if (lastMessage.user !== 'me') playReceive()
    setLatestMessage(user, lastMessage.message)
  }, [lastMessage, user])

  function sendMessage(nextMessage) {
    const message = {
      user: 'me',
      id: `me-${Date.now()}`,
      message: nextMessage
    }
    socket.emit('user-message', nextMessage)
    dispatch({ type: 'MESSAGE_SENT', message })
    playSend()
  }

  return (
    <div className="messages">
      <Header isTyping={isTyping} />
      <MessagesList messages={messages} isTyping={isTyping} />
      <Composer sendMessage={sendMessage} />
    </div>
  )
}

export default Messages
