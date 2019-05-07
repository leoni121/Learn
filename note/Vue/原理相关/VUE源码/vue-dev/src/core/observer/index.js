/* @flow */
/**
 * 备注：
 *  （1）定义 a 的 setter/getter 的时候有一个dep,同时如果a是一个对象，
 * 则 a 所指向的对象含有一个 __ob__ 属性，这个属性指向当前 a 的 observer 实例，
 * 内部含有 dep属性。
 *
 *
 * */

import Dep from './dep'
import VNode from '../vdom/vnode'
import { arrayMethods } from './array'
import {
  def,
  warn,
  hasOwn,
  hasProto,
  isObject,
  isPlainObject,
  isPrimitive,
  isUndef,
  isValidArrayIndex,
  isServerRendering
} from '../util/index'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 *
 * 在某些情况下，我们可能希望禁用组件内部的观察者，更新计算。
 *
 *
 */
export let shouldObserve: boolean = true

export function toggleObserving (value: boolean) {
  shouldObserve = value
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    // __ob__ 这个属性的值就是当前 Observer 实例对象
    // 定义不可枚举的属性，这样后面遍历数据对象的时候就能够防止遍历到 __ob__ 属性。
    def(value, '__ob__', this)
    /**
     *
     * const data = {
        a: 1
      }
     ==》
     * const data = {
        a: 1,
        // __ob__ 是不可枚举的属性
        __ob__: {
          value: data, // value 属性指向 data 数据对象本身，这是一个循环引用
          dep: dep实例对象, // new Dep()
          vmCount: 0
        }
      }
     * */

    // 当前观察的是数组
    if (Array.isArray(value)) {
      // 有 __proto__
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    // 当前观察的是对象
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  /**
   * 浏览所有属性并将其转换为
   * getter/setters。只有在以下情况下才应调用此方法
   * 值类型为对象。
   */
  walk (obj: Object) {
    // 获取对象所有可枚举的属性
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  /**
   * Observe a list of Array items.
   */
  // 观察数组
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
// nzq_mark
// 在__proto__ 上面添加属性
function protoAugment (target, src: Object) {
  /* eslint-disable no-proto */
  target.__proto__ = src
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
// nzq_mark
// 添加属性
function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
/**
 * const data = {
    a: {
      b: 1
    }
  }
 observe(data)

 ===>

 const data = {
    // 属性 a 通过 setter/getter 通过闭包引用着 dep 和 childOb
    a: {
      // 属性 b 通过 setter/getter 通过闭包引用着 dep 和 childOb
      b: 1
      __ob__: {a, dep, vmCount}
    }
    __ob__: {data, dep, vmCount}
  }

 属性 a 闭包引用的 childOb 实际上就是 data.a.__ob__，Observer 实例对象
 */
// asRootData Boolean 判断被观测的数据是否是根级数据
// 该函数也可以用来获取对应的 __ob__
export function observe (value: any, asRootData: ?boolean): Observer | void {
  // 当待观察的不是对象的时候退出，不包含数组
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  // 保存 Observer 实例
  let ob: Observer | void
  // 用来避免重复观测一个数据对象
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    // 被观测的数据对象必须是可扩展的。一个普通的对象默认就是可扩展的
    // 以下三个方法都可以使得一个对象变得不可扩展：Object.preventExtensions()、
    // Object.freeze() 以及 Object.seal()。
    Object.isExtensible(value) &&
    // Vue 实例对象拥有 _isVue 属性，所以这个条件用来避免 Vue 实例对象被观测。
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
// 每次调用 defineReactive 定义访问器属性时，该属性的 setter/getter
// 都闭包引用了一个属于自己的 dep
// customSetter 函数的作用，用来打印辅助信息，当然除此之外你可以将
// customSetter 用在任何适合使用它的地方。
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  // 每一个数据字段都通过闭包引用着属于自己的 dep 常量
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  // val 本身有可能也是一个对象，那么此时应该继续调用 observe(val)
  // 函数观测该对象从而深度观测数据对象。
  // 前提是 defineReactive 函数的最后一个参数 shallow 应该是假
  // !shallow 为真时才会继续调用 observe 函数深度观测，由于在 walk
  // 函数中调用 defineReactive 函数时没有传递 shallow 参数，所以该
  // 参数是 undefined，那么也就是说默认就是深度观测

  // 当传入的val 不是对象时，返回 undefined
  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    // 正确地返回属性值以及收集依赖
    get: function reactiveGetter () {
      // getter 常量中保存的是属性原有的 get 函数
      const value = getter ? getter.call(obj) : val
      // Dep.target 中保存的值就是要被收集的依赖(观察者)
      // 存在的话说明有依赖需要被收集
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          // childOb.dep === data.a.__ob__.dep
          childOb.dep.depend()
          if (Array.isArray(value)) {
            // 调用 dependArray 函数逐个触发数组每个元素的依赖收集
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      // 获取原有的值
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      // 检查一般的数据 和 NaN
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      // customSetter 函数是 defineReactive 函数的第四个参数
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      // 如果属性原来拥有自身的 set 函数，那么应该继续使用该函数来设置属性的值，
      // 从而保证属性原有的设置操作不受影响。如果属性原本就没有 set 函数，
      // 那么就设置 val 的值：val = newVal。
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      // 为属性设置的新值是一个数组或者纯对象，那么该数组或纯对象是未被观测的，
      // 所以需要对新值进行观测
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
export function set (target: Array<any> | Object, key: any, val: any): any {
  // nzq_mark
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  // 检查是否是数组和合法的 key(数字)
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 可能是更新或添加
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }

  // nzq_mark
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
export function del (target: Array<any> | Object, key: any) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot delete reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    )
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key]
  if (!ob) {
    return
  }
  ob.dep.notify()
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function  dependArray (value: Array<any>) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
