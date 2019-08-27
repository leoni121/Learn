```js
export class Observer {
  constructor (value: any) {
    if (Array.isArray(value)) {
      // 有 __proto__
      if (hasProto) {
        // 设置数组实例的 __proto__ 属性，让其指向一个代理原型，从而做到拦截
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      // ...
    }
  }
}

function protoAugment (target, src: Object) {
  /* eslint-disable no-proto */
  target.__proto__ = src
  /* eslint-enable no-proto */
}
function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}


// arrayMethods
// 实现 arrayMethods.__proto__ = Array.prototype
export const arrayMethods = Object.create(Array.prototype)

// ...
// arrayMethods 上面添加 (key === method):(value === mutator)
def(arrayMethods, method, function mutator (...args) {
    // 执行原始方法获取相应的结果
    const result = original.apply(this, args)
    const ob = this.__ob__
    // ...
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 调用数组变异方法时，必然修改了数组，所以这个时候需要
    // 将该数组的所有依赖(观察者)全部拿出来执行
    ob.dep.notify()
    return result
})

function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

```

