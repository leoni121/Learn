/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

// 缓存 Array.prototype
const arrayProto = Array.prototype

// 实现 arrayMethods.__proto__ = Array.prototype
export const arrayMethods = Object.create(arrayProto)

// 变异方法名字集合，包含了所有需要拦截的数组变异方法的名字
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
// 遍历待变异的方法
// 经过该循环 待变异的方法会被 做相应变形后代理到 arrayMethods 的属性上面
// 通过arrayMethods 方法的 __proto__ 任然可以方法到其他的 Array.prototype 属性
methodsToPatch.forEach(function (method) {
  // cache original method
  // 缓存对应 方法名 的原始方法
  const original = arrayProto[method]

  // Object.defineProperty
  // 此时 Value 是函数
  def(arrayMethods, method, function mutator (...args) {
    // 执行原始方法获取相应的结果
    const result = original.apply(this, args)
    // this 其实就是数组实例本身
    // __ob__.dep 中收集了所有该对象(或数组)的依赖(观察者)
    const ob = this.__ob__
    // 储存新增的元素
    let inserted
    // 涉及数组元素 新增 的处理方法
    // 新增加的元素是非响应式的
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // observeArray 函数对其进行观测
    // ob 是 Observer 对象的实例，该实例的 __proto__ 上面含有一些方法，
    // 含 observerArray
    // 使嵌套的数组或对象同样是响应式数据，我们需要递归的观测那些类型为数组或对象的数组元素
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 调用数组变异方法时，必然修改了数组，所以这个时候需要
    // 将该数组的所有依赖(观察者)全部拿出来执行
    ob.dep.notify()
    return result
  })
})
