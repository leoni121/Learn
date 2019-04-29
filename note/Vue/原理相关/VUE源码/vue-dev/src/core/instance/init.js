/* @flow */
import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'

// Vue 实例的设计 http://hcysun.me/vue-design/appendix/vue-ins.html
let uid = 0

export function initMixin (Vue: Class<Component>) {
  // // ... _init 方法的函数体
  Vue.prototype._init = function (options?: Object) {
    // 声明了常量 vm，其值为 this 也就是当前这个 Vue 实例
    const vm: Component = this

    // a uid
    // 添加了一个唯一标示：_uid，其值为 uid，uid 这个变量定义在 initMixin 方法的上面，
    // 初始化为 0，可以看到每次实例化一个 Vue 实例之后，uid 的值都会 ++
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    // config.performance 来自于 core/config.js 文件
    // Vue 提供了全局配置 Vue.config.performance，我们通过将其设置为 true，即可开启性能追踪，你可以追踪四个场景的性能：
    //  1、组件初始化(component init)
    //  2、编译(compile)，将模板(template)编译成渲染函数
    //  3、渲染(render)，其实就是渲染函数的性能，或者说渲染函数执行且生成虚拟DOM(vnode)的性能
    //  4、打补丁(patch)，将虚拟DOM渲染为真实DOM的性能
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      /**
       * 在初始化的代码的开头和结尾分别使用 mark 函数打上两个标记，然后通过 measure 函数对这两个标记点进行性能计算。
       * 性能追踪开始
       */
      mark(startTag)
    }

    // a flag to avoid this being observed
    // 标识 vm 对象是 Vue 实例，避免该对象被响应系统观测
    vm._isVue = true

    // merge options
    // options 就是我们调用 Vue 时传递的参数选项，
    // options._isComponent 是内部选项，在 Vue 创建组件的时候才会有
    if (options && options._isComponent) {

      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      //优化内部组件实例化
      //因为动态选项合并非常慢，而且
      //内部组件选项需要特殊处理。
      initInternalComponent(vm, options)
    } else {
      // $options 属性用于当前 Vue 的初始化，下面所有初始化相关的函数都使用了 $options
      // mergeOptions 的意义就是用来得到 $options
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor), // 构造者的 options
        options || {}, // 我们传入的 options
        vm // Vue 实例
      )
    }

    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      // 在实例对象 vm 上添加 _renderProxy 属性。
      // 生产环境和非生产环境下要保持功能一致
      // 设置渲染函数的作用域代理，其目的是为我们提供更好的提示信息。
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }

    // expose
    vm._self = vm

    // 真正的初始化 和 一些钩子函数
    // 都使用到了实例的 $options 属性，即 vm.$options
    initLifecycle(vm)
    // 参考 —— https://segmentfault.com/a/1190000014957450
    initEvents(vm)
    initRender(vm)
    // callHook 调用生命周期钩子函数
    callHook(vm, 'beforeCreate')
    // resolve injections before data/props
    initInjections(vm)
    initState(vm)
    // resolve provide after data/props
    initProvide(vm)
    // 此时还没有任何挂载的操作，所以在 created 中是不能访问DOM的，即不能访问 $el。
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      /**
       * 在初始化的代码的开头和结尾分别使用 mark 函数打上两个标记，然后通过 measure 函数对这两个标记点进行性能计算。
       * 性能追踪结束
       */
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}

// 初始内部组件
export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}

// 在上面initMixin中传入了 vm.constructor
// 用来获取当前实例构造者的 options 属性的，即使 if 判断分支内也不例外，
// 因为 if 分支只不过是处理了 options，最终返回的永远都是 options。
export function resolveConstructorOptions (Ctor: Class<Component>) {
  // Ctor === vm.constructor，就是 Vue 构造函数
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor: Class<Component>): ?Object {
  let modified
  const latest = Ctor.options
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }
  return modified
}
