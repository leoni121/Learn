const localStorageMock = (function() {
  let store = {};
  function getItem(key) {
    return store[key] || null
  }
  function setItem(key, value) {
    store[key] = value.toString()
  }
  function removeItem(key) {
    delete store[key]
  }
  function clear() {
    store = {}
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  }
})()


Object.defineProperty(window, 'localStorage2', {
  value: localStorageMock
})
