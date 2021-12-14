import { renderHook, act } from '@testing-library/react-hooks'
import { useReducer } from 'react'
import { messagesReducer } from './Messages'
import InitialBotMessage from '../../../common/constants/initialBottyMessage'

it('should change isTyping to TRUE when dispatch STARTED_TYPING action', () => {
  const initialState = { isTyping: false, messages: [] }
  const { result } = renderHook(() => useReducer(messagesReducer, initialState))
  const [, dispatch] = result.current
  act(() => {
    dispatch({ type: 'STARTED_TYPING' })
  })
  const [state] = result.current
  expect(state).toEqual({ isTyping: true, messages: [] })
})

it('should add new message when dispatch MESSAGE_RECEIVED action', () => {
  const initialState = { isTyping: false, messages: [] }
  const { result } = renderHook(() => useReducer(messagesReducer, initialState))
  const [, dispatch] = result.current

  act(() => {
    dispatch({
      type: 'MESSAGE_RECEIVED',
      message: { id: 1, message: 'test', user: 'bot' }
    })
  })

  const [state] = result.current

  expect(state).toEqual({
    isTyping: false,
    messages: [
      {
        id: 1,
        message: 'test',
        user: 'bot'
      }
    ]
  })
})

it('should add new message when dispatch MESSAGE_SENT action', () => {
  const initialState = { isTyping: false, messages: [] }
  const { result } = renderHook(() => useReducer(messagesReducer, initialState))
  const [, dispatch] = result.current

  act(() => {
    dispatch({
      type: 'MESSAGE_SENT',
      message: { id: 1, message: 'test', user: 'me' }
    })
  })

  const [state] = result.current

  expect(state).toEqual({
    isTyping: false,
    messages: [
      {
        id: 1,
        message: 'test',
        user: 'me'
      }
    ]
  })
})

it('should add new message when dispatch MESSAGE_SENT action', () => {
  const initialState = { isTyping: false, messages: [] }
  const { result } = renderHook(() => useReducer(messagesReducer, initialState))
  const [, dispatch] = result.current

  act(() => {
    dispatch({
      type: 'MESSAGE_SENT',
      message: { id: 1, message: 'test', user: 'me' }
    })
  })

  const [state] = result.current

  expect(state).toEqual({
    isTyping: false,
    messages: [
      {
        id: 1,
        message: 'test',
        user: 'me'
      }
    ]
  })
})

it('should add initial message when dispatch SWITCHED_USER action', () => {
  const initialState = { isTyping: false, messages: [] }
  const { result } = renderHook(() => useReducer(messagesReducer, initialState))
  const [, dispatch] = result.current

  act(() => {
    dispatch({
      type: 'SWITCHED_USER',
      message: { id: 1, message: InitialBotMessage, user: 'bot' }
    })
  })

  const [state] = result.current

  expect(state).toEqual({
    isTyping: false,
    messages: [
      {
        id: 1,
        message: InitialBotMessage,
        user: 'bot'
      }
    ]
  })
})

it('returns state when dispatched with an unknown action type', () => {
  const initialState = { isTyping: false, messages: [] }
  const { result } = renderHook(() => useReducer(messagesReducer, initialState))
  const [, dispatch] = result.current

  act(() => {
    dispatch({
      type: 'whattt'
    })
  })
  const [state] = result.current

  expect(state).toEqual({ isTyping: false, messages: [] })
})
