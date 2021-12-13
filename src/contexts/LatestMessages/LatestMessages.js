import React, { useState, createContext, useMemo } from 'react'
import initialMessages from './constants/initialMessages'

const LatestMessagesContext = createContext({})

export default LatestMessagesContext

export function LatestMessages({ children }) {
  const [messages, setMessages] = useState(initialMessages)

  return (
    <LatestMessagesContext.Provider
      value={useMemo(
        () => ({
          messages,
          setLatestMessage: (userId, value) => {
            setMessages({ ...messages, [userId]: value })
          }
        }),
        [messages]
      )}
    >
      {children}
    </LatestMessagesContext.Provider>
  )
}
