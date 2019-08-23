import $$observable from 'symbol-observable'

import ActionTypes from './utils/actionTypes'
import isPlainObject from './utils/isPlainObject'

export default function createStore(reducer, preloadedState, enhancer) {

  // 中间件
  if (typeof enhancer !== 'undefined') {
    return enhancer(createStore)(reducer, preloadedState)
  }

  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false


  function getState() {
    
    return currentState
  }

  function subscribe(listener) {
    nextListeners.push(listener)

    // 从队列中删除
    return function unsubscribe() {
      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
      currentListeners = null
    }
  }


  function dispatch(action) {
    currentState = currentReducer(currentState, action)
    
    // 执行 listeners
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }
  
  // 初始化数据
  dispatch({ type: ActionTypes.INIT })

  // 就是我们的 store
  return {
    dispatch,
    subscribe,
    getState,
  }
}
