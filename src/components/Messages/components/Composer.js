import React, { useState } from 'react'
import Footer from './Footer'

const Composer = ({ sendMessage }) => {
  const [message, setMessage] = useState('')

  return (
    <Footer
      message={message}
      sendMessage={() => {
        setMessage('')
        sendMessage(message)
      }}
      onChangeMessage={(e) => {
        setMessage(e.target.value)
      }}
    />
  )
}

export default Composer
