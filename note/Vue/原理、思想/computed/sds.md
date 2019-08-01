```js
// 1
const watchers = vm._computedWatchers = Object.create(null)


// 2
 // create internal watcher for the computed property.
  watchers[key] = new Watcher(
    vm,
    getter || noop,
    noop,
    computedWatcherOptions
  )


defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  // 省略...
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

sharedPropertyDefinition = {
	get: function computedGetter () {
  const watcher = this._computedWatchers && this._computedWatchers[key]
  if (watcher) {
    watcher.depend()
    return watcher.evaluate()
  }
},


// 3 
渲染函数的执行将触发计算属性 `compA` 的 `get` 拦截器函数，
  const watcher = this._computedWatchers && this._computedWatchers[key]
  if (watcher) {
    watcher.depend()
    return watcher.evaluate()
  }
}

// 收集依赖
执行将会触发属性 `a` 的 `get` 拦截器函数。所以这会导致属性 `a` 将会收集到一个依赖，这个依赖实际上就是计算属性的观察者对象。
```

