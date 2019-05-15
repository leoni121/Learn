/* @flow */

import {
  warn,
  remove,
  isObject,
  parsePath,
  _Set as Set,
  handleError,
  noop
} from '../util/index'

import { traverse } from './traverse'
import { queueWatcher } from './scheduler'
import Dep, { pushTarget, popTarget } from './dep'

import type { SimpleSet } from '../util/index'

let uid = 0

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
// Watcher 的原理是通过对“被观测目标”的求值，
// 触发数据属性的 get 拦截器函数从而收集依赖
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

  constructor (
    vm: Component, // 组件实例对象 vm
    expOrFn: string | Function, // 要观察的表达式 expOrFn
    cb: Function, // 当被观察的表达式的值变化时的回调函数 cb
    options?: ?Object, // 传递给当前观察者对象的选项
    isRenderWatcher?: boolean // 标识该观察者实例是否是渲染函数的观察者。
  ) {
    // 该属性指明了这个观察者是属于哪一个组件
    this.vm = vm
    // 组件实例的 _watcher 属性的值引用着该组件的渲染函数观察者
    if (isRenderWatcher) {
      // vm._watcher
      // 在 initLifecycle 函数中被初始化的，其初始值为 null
      vm._watcher = this
    }
    // 属于该组件实例的观察者都会被添加到该组件实例对象的 vm._watchers 数组中
    // vm._watchers 属性是在 initState 函数中初始化的，其初始值是一个空数组
    vm._watchers.push(this)
    // options
    if (options) {
      // 用来告诉当前观察者实例对象是否是深度观测
      // 平时在使用 Vue 的 watch 选项或者 vm.$watch 函数去观测某个数据时，
      // 可以通过设置 deep 选项的值为 true 来深度观测该数据。
      this.deep = !!options.deep
      // 用来标识当前观察者实例对象是 开发者定义的 还是 内部定义的
      // 除了内部定义的观察者(如：渲染函数的观察者、计算属性的观察者等)之外，
      // 所有观察者都被认为是开发者定义的，这时 options.user 会自动被设置为 true。
      this.user = !!options.user
      // 计算属性是惰性求值
      this.lazy = !!options.lazy
      // 用来告诉观察者当数据变化时是否同步求值并执行回调
      this.sync = !!options.sync
      // 可以理解为 Watcher 实例的钩子，当数据变化之后，触发更新之前，
      // 调用在创建渲染函数的观察者实例对象时传递的 before 选项
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    // 观察者实例对象的唯一标识
    this.id = ++uid // uid for batching
    // 标识着该观察者实例对象是否是激活状态，默认值为 true 代表激活
    this.active = true
    // 只有计算属性的观察者实例对象的 this.dirty 属性的值才会为真，因为计算属性是惰性求值。
    this.dirty = this.lazy // for lazy watchers

    // 实现避免收集重复依赖，且移除无用依赖的功能也依赖于它们（下面4个）
    // newDepIds 和 newDeps 这两个属性的值所存储的总是当次求值所收集到的 Dep 实例对象，
    // depIds 和 deps 这两个属性的值所存储的总是上一次求值过程中所收集到的 Dep 实例对象。
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()

    // 非生产环境下使用
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        // Watcher 只接受简单的点(.)分隔路径，如果你要用全部的 js 语法特性直接观察一个函数即可。
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    // 判断是否是 计算属性
    // this.value 属性保存着被观察目标的值
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  // 触发访问器属性的 get 拦截器函数，获得被观察目标的值
  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      // 触发依赖收集
      value = this.getter.call(vm, vm)
    } catch (e) {
      // 自定义 观察者
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

  /**
   * Add a dependency to this directive.
   */
  // 向该指令添加依赖项。
  addDep (dep: Dep) {
    // 是 Dep 实例对象的唯一 id 值
    const id = dep.id
    // 该 Dep 实例对象是否已经存在于 newDepIds 中，
    // 如果存在那么说明已经收集过依赖了，什么都不会做
    // 没有收集过依赖
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)

      // 多次求值（数据变化时重新求值的过程） 中避免收集重复依赖的
      // 重新求值的时候不能用 newDepIds 属性来避免收集重复的依赖吗
      // 在于每一次求值之后 newDepIds 属性都会被清空（get函数里面 cleanupDeps），也就是说每次重新求值的时候对于观察者实例对象来讲 newDepIds 属性始终是全新的。虽然每次求值之后会清空 newDepIds 属性的值，但在清空之前会把 newDepIds 属性的值以及 newDeps 属性的值赋值给 depIds 属性和 deps 属性，这样重新求值的时候 depIds 属性和 deps 属性将会保存着上一次求值中 newDepIds 属性以及 newDeps 属性的值
      if (!this.depIds.has(id)) {
        // addSub 方法接收观察者对象作为参数，并将接收到的观察者添加到 Dep
        // 实例对象的 subs 数组中
        dep.addSub(this)
      }
    }
  }

  /**
   * Clean up for dependency collection.
   */
  cleanupDeps () {
    let i = this.deps.length
    // 在循环内部检查上一次求值所收集到的 Dep 实例对象是否存在于当前这次求值所收集到的 Dep 实例对象中，如果不存在则说明该 Dep 实例对象已经和该观察者不存在依赖关系了，这时就会调用 dep.removeSub(this) 方法并以该观察者实例对象作为参数传递，从而将该观察者对象从 Dep 实例对象中移除。
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }

    // 下列代码作用：
    // newDepIds 属性和 newDeps 属性被清空，并且在被清空之前把值分别赋给了
    // depIds 属性和 deps 属性，这两个属性将会用在下一次求值时避免依赖的重复收集。
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  run () {
    if (this.active) {
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, `callback for watcher "${this.expression}"`)
          }
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  evaluate () {
    this.value = this.get()
    this.dirty = false
  }

  /**
   * Depend on all deps collected by this watcher.
   */
  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   */
  // nzq_mark
  // 把自己从所有得订阅列表中移出
  teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this)
      }
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}
